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

@NgModule({
    declarations: [ManagementComponent, HomeComponent, HomeGraphComponent],
    imports: [CommonModule, ManagementRoutingModule, BannerText, Navigation, HomeHistorytModule]
})
export class ManagementModule {}
