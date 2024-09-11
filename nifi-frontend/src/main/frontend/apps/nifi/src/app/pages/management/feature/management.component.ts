import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NiFiState } from '../../../state';
import { getNodeStatusHomeHistoryAndOpenDialog } from '../../../state/home-history/home-history.actions';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrl: './management.component.scss'
})
export class ManagementComponent implements OnInit {
    constructor(private store: Store<NiFiState>) {}

    ngOnInit(): void {
        this.store.dispatch(
            getNodeStatusHomeHistoryAndOpenDialog({
                request: {
                    source: 'menu'
                }
            })
        );
    }
}
