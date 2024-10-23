import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CanvasState } from '../../../../state';
import { createComponentRequest } from '../../../../state/flow/flow.actions';
import { Client } from '../../../../../../service/client.service';
import { FlowService } from '../../../../service/flow.service';
import { Store } from '@ngrx/store';
import { ComponentType } from 'libs/shared/src';
import { FlowEffects } from '../../../../state//flow/flow.effects';

@Component({
    selector: 'app-common-create-project',
    templateUrl: './common-create-project.component.html',
    styleUrl: './common-create-project.component.scss'
})
export class CommonCreateProjectComponent implements OnInit {
    @Output() notify = new EventEmitter();

    type: ComponentType = ComponentType.ProcessGroup;

    constructor(
        private client: Client,
        private store: Store<CanvasState>,
        private flowService: FlowService,
        private effetct: FlowEffects
    ) {}

    ngOnInit(): void {
        this.handleCallback();
    }

    handleCreateProject() {
        this.store.dispatch(
            createComponentRequest({
                request: {
                    revision: {
                        clientId: this.client.getClientId(),
                        version: 0
                    },
                    type: this.type,
                    position: { x: 200, y: 100 }
                }
            })
        );
    }

    handleCallback() {
        this.effetct.navigateWithoutTransform$.subscribe((item) => {
            // console.log('>>>>>>>>>>>item', item);
            this.notify.emit(item);
        });
    }
}
