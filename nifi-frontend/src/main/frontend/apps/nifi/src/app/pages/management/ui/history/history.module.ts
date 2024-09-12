import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NifiTooltipDirective } from '@nifi/shared';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeStatusHistoryChart } from './status-history-chart/status-history-chart.component';
import { ErrorBanner } from '../../../../ui/common/error-banner/error-banner.component';
import { HomeHistory } from './home-history.component';

@NgModule({
    declarations: [HomeStatusHistoryChart, HomeHistory],
    exports: [HomeHistory],
    imports: [
        CommonModule,
        MatDialogModule,
        AsyncPipe,
        MatButtonModule,
        NgxSkeletonLoaderModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NifiTooltipDirective,
        MatCheckboxModule,
        NgStyle,
        ErrorBanner
    ]
})
export class HomeHistorytModule {}
