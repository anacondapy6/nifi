import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatGridListModule } from '@angular/material/grid-list';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ProjectManagementComponent } from '../ui/project-management/project-management.component';
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
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SideMenuComponent } from './component/side-menu.component';

import { registerLocaleData } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// 依赖模块
import { SummaryModule } from '../../summary/feature/summary.module';
import { FlowConfigurationHistoryModule } from '../../flow-configuration-history/feature/flow-configuration-history.module';
import { FlowDesignerModule } from '../../flow-designer/feature/flow-designer.module';

@NgModule({
    declarations: [
        ManagementComponent,
        HomeComponent,
        HomeGraphComponent,
        SideMenuComponent,
        ProjectManagementComponent
    ],
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
        NzDividerModule,
        NzSkeletonModule,
        NzMenuModule,
        SummaryModule,
        FlowConfigurationHistoryModule,
        FlowDesignerModule
    ]
})
export class ManagementModule {}
