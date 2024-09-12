import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NiFiState } from '../../../../state';
import { getNodeStatusHomeHistoryAndOpenDialog } from '../../../../state/home-history/home-history.actions';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
