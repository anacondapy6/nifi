/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AfterViewInit, Component, DestroyRef, HostListener, inject, Inject, OnDestroy, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusHistoryService } from '../../../../service/status-history.service';
import {
    FieldDescriptor,
    NodeSnapshot,
    StatusHomeHistoryEntity,
    StatusHomeHistoryRequest,
    StatusHomeHistoryState
} from '../../../../state/home-history';

import { Store } from '@ngrx/store';
import { reloadStatusHomeHistory } from '../../../../state/home-history/home-history.actions';
import {
    selectStatusHomeHistory,
    selectStatusHomeHistoryComponentDetails,
    selectStatusHomeHistoryFieldDescriptors,
    selectStatusHomeHistoryState
} from '../../../../state/home-history/home-history.selectors';

import { initialState } from '../../../../state/home-history/home-history.reducer';

import { filter, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as d3 from 'd3';
import { NiFiCommon, TextTip } from '@nifi/shared';
import { isDefinedAndNotNull } from 'libs/shared/src';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Instance, NIFI_NODE_CONFIG, Stats } from './index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clearBannerErrors } from '../../../../state/error/error.actions';

@Component({
    selector: 'home-history',
    templateUrl: './home-history.component.html',
    styleUrls: ['./home-history.component.scss']
})
export class HomeHistory implements OnInit, OnDestroy, AfterViewInit {
    request: StatusHomeHistoryRequest;
    statusHistoryState$ = this.store.select(selectStatusHomeHistoryState);
    componentDetails$ = this.store.select(selectStatusHomeHistoryComponentDetails);
    statusHistory$ = this.store.select(selectStatusHomeHistory);
    fieldDescriptors$ = this.store.select(selectStatusHomeHistoryFieldDescriptors);
    fieldDescriptors: FieldDescriptor[] = [];

    dialogMaximized = false;

    details: { key: string; value: string }[] = [];

    minDate = '';
    maxDate = '';
    statusHistoryForm: FormGroup;

    nodeStats: Stats = {
        max: 'NA',
        min: 'NA',
        mean: 'NA',
        nodes: []
    };
    clusterStats: Stats = {
        max: 'NA',
        min: 'NA',
        mean: 'NA',
        nodes: []
    };

    nodes: any[] = [];

    instances: Instance[] = [];
    instanceVisibility: any = {};
    selectedDescriptor: FieldDescriptor | null = null;
    private destroyRef: DestroyRef = inject(DestroyRef);

    constructor(
        private statusHistoryService: StatusHistoryService,
        private store: Store<StatusHomeHistoryState>,
        private formBuilder: FormBuilder,
        private nifiCommon: NiFiCommon
        // @Inject(MAT_DIALOG_DATA) private dialogRequest: StatusHomeHistoryRequest
    ) {
        // super();
        // this.request = dialogRequest;
        this.request = {
            source: 'menu'
        } as any;
        this.statusHistoryForm = this.formBuilder.group({
            fieldDescriptor: ''
        });
    }

    ngOnInit(): void {
        this.statusHistory$
            .pipe(
                filter((entity) => !!entity),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((entity: StatusHomeHistoryEntity) => {
                if (entity) {
                    this.instances = [];
                    if (entity.statusHomeHistory?.aggregateSnapshots?.length > 1) {
                        this.instances.push({
                            id: NIFI_NODE_CONFIG.nifiInstanceId,
                            label: NIFI_NODE_CONFIG.nifiInstanceLabel,
                            snapshots: entity.statusHomeHistory.aggregateSnapshots
                        });
                        // if this is the first time this instance is being rendered, make it visible
                        if (this.instanceVisibility[NIFI_NODE_CONFIG.nifiInstanceId] === undefined) {
                            this.instanceVisibility[NIFI_NODE_CONFIG.nifiInstanceId] = true;
                        }
                    }

                    // get the status for each node in the cluster if applicable
                    if (entity.statusHomeHistory?.nodeSnapshots && entity.statusHomeHistory?.nodeSnapshots.length > 1) {
                        entity.statusHomeHistory.nodeSnapshots.forEach((nodeSnapshot: NodeSnapshot) => {
                            this.instances.push({
                                id: nodeSnapshot.nodeId,
                                label: `${nodeSnapshot.address}:${nodeSnapshot.apiPort}`,
                                snapshots: nodeSnapshot.statusHomeSnapshots
                            });
                            // if this is the first time this instance is being rendered, make it visible
                            if (this.instanceVisibility[nodeSnapshot.nodeId] === undefined) {
                                this.instanceVisibility[nodeSnapshot.nodeId] = true;
                            }
                        });
                    }

                    // identify all nodes and sort
                    this.nodes = this.instances
                        .filter((status) => {
                            return status.id !== NIFI_NODE_CONFIG.nifiInstanceId;
                        })
                        .sort((a: any, b: any) => {
                            return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
                        });
                    // determine the min/max date
                    const minDate: any = d3.min(this.instances, (d) => {
                        return d3.min(d.snapshots, (s) => {
                            return s.timestamp;
                        });
                    });
                    const maxDate: any = d3.max(this.instances, (d) => {
                        return d3.max(d.snapshots, (s) => {
                            return s.timestamp;
                        });
                    });
                    this.minDate = this.nifiCommon.formatDateTime(new Date(minDate));
                    this.maxDate = this.nifiCommon.formatDateTime(new Date(maxDate));
                }
            });
        this.fieldDescriptors$
            .pipe(
                filter((descriptors) => !!descriptors),
                take(1) // only need to get the descriptors once
            )
            .subscribe((descriptors) => {
                this.fieldDescriptors = descriptors;

                // select the first field description by default
                this.statusHistoryForm.get('fieldDescriptor')?.setValue(descriptors[0]);
                this.selectedDescriptor = descriptors[0];
            });

        this.componentDetails$.pipe(isDefinedAndNotNull(), take(1)).subscribe((details) => {
            this.details = Object.entries(details).map((entry) => ({ key: entry[0], value: entry[1] }));
        });
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearBannerErrors());
    }

    ngAfterViewInit(): void {
        // when the selected descriptor changes, update the chart
        this.statusHistoryForm
            .get('fieldDescriptor')
            ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((descriptor: FieldDescriptor) => {
                if (this.instances.length > 0) {
                    this.selectedDescriptor = descriptor;
                }
            });
    }

    maximize() {
        this.dialogMaximized = true;
        this.resized();
    }

    minimize() {
        this.dialogMaximized = false;
        this.resized();
    }

    isInitialLoading(state: StatusHomeHistoryState) {
        return state.loadedTimestamp === initialState.loadedTimestamp;
    }

    refresh() {
        this.store.dispatch(reloadStatusHomeHistory({ request: this.request }));
    }

    clusterStatsChanged(stats: Stats) {
        console.log('>>>>>>>>初始化');
        this.clusterStats = stats;
    }

    nodeStatsChanged(stats: Stats) {
        this.nodeStats = stats;
    }

    protected readonly Object = Object;

    protected readonly TextTip = TextTip;

    selectNode(event: MatCheckboxChange) {
        const instanceId: string = event.source.value;
        const checked: boolean = event.checked;

        // get the line and the control points for this instance (select all for the line to update control and main charts)
        const chartLine = d3.selectAll('path.chart-line-' + instanceId);
        const markGroup = d3.select('g.mark-group-' + instanceId);

        // determine if it was hidden
        const isHidden = markGroup.classed('hidden');

        // toggle the visibility
        chartLine.classed('hidden', () => !isHidden);
        markGroup.classed('hidden', () => !isHidden);

        // record the current status so it persists across refreshes
        this.instanceVisibility = {
            ...this.instanceVisibility,
            [instanceId]: checked
        };
    }

    resized() {
        if (this.selectedDescriptor) {
            // trigger the chart to re-render by changing the selection
            this.selectedDescriptor = { ...this.selectedDescriptor };
        }
    }

    @HostListener('window:resize', ['$event.target'])
    windowResized() {
        if (this.dialogMaximized) {
            this.resized();
        }
    }

    getColor(stats: Stats, nodeId: string): string {
        if (stats.nodes && stats.nodes.length > 0) {
            const nodeColor = stats.nodes?.find((c) => c.id === nodeId);
            if (nodeColor) {
                return nodeColor.color;
            }
        }
        return 'unset surface-color';
    }

    protected readonly NIFI_NODE_CONFIG = NIFI_NODE_CONFIG;
}
