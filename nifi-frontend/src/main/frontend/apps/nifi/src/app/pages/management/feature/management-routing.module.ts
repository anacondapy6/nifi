/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { HomeComponent } from '../ui/home/home.component';
import { ProjectManagementComponent } from '../ui/project-management/project-management.component';
// import { TaskStatusComponent } from '../ui/task-status/task-status.component';
import { UsersManagementComponent } from '../ui/users-management/users-management.component';
// import { RunLogComponent } from '../ui/run-log/run-log.component';

const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'project',
                component: ProjectManagementComponent
            },
            {
                path: 'task',
                loadChildren: () => import('../../summary/feature/summary.module').then((m) => m.SummaryModule)
                // component: TaskStatusComponent
            },
            {
                path: 'users',
                component: UsersManagementComponent
            },
            {
                path: 'log',
                loadChildren: () =>
                    import('../../flow-configuration-history/feature/flow-configuration-history.module').then(
                        (m) => m.FlowConfigurationHistoryModule
                    )
                // component: RunLogComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule {}
