import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatGridListModule } from '@angular/material/grid-list';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { HomeComponent } from '../ui/home/home.component';
import { HomeGraphComponent } from '../ui/home-graph/home-graph.component';
import { BannerText } from '../../../ui/common/banner-text/banner-text.component';
import { Navigation } from '../../../ui/common/navigation/navigation.component';
import { HomeHistorytModule } from '../ui/history/history.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
    declarations: [ManagementComponent, HomeComponent, HomeGraphComponent],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        BannerText,
        Navigation,
        HomeHistorytModule,
        NzButtonModule,
        NzDatePickerModule,
        FormsModule,
        NzTableModule,
        NzDividerModule
    ]
})
export class ManagementModule {}
