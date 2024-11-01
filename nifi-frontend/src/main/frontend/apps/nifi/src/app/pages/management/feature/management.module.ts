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
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SideMenuComponent } from './component/side-menu.component';
import { ConfirmDialogComponent } from '../ui/project-management/component/confirm-dialog.component';
import { registerLocaleData } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// 依赖模块
import { SummaryModule } from '../../summary/feature/summary.module';
import { FlowConfigurationHistoryModule } from '../../flow-configuration-history/feature/flow-configuration-history.module';
import { FlowDesignerModule } from '../../flow-designer/feature/flow-designer.module';
import { MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        ManagementComponent,
        HomeComponent,
        HomeGraphComponent,
        SideMenuComponent,
        ProjectManagementComponent,
        ConfirmDialogComponent
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
        FlowDesignerModule,
        NzMessageModule,
        MatIconButton,
        MatTableModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class ManagementModule {}
