import { Component } from '@angular/core';
import { CanvasState } from '../../../../state';
import { createComponentRequest } from '../../../../state/flow/flow.actions';
import { Client } from '../../../../../../service/client.service';
import { FlowService } from '../../../../service/flow.service';
import { Store } from '@ngrx/store';
import { ComponentType } from 'libs/shared/src';

@Component({
    selector: 'app-common-create-project',
    templateUrl: './common-create-project.component.html',
    styleUrl: './common-create-project.component.scss'
})
export class CommonCreateProjectComponent {
    type: ComponentType = ComponentType.ProcessGroup;

    constructor(
        private client: Client,
        private store: Store<CanvasState>,
        private flowService: FlowService
    ) {}

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
}
