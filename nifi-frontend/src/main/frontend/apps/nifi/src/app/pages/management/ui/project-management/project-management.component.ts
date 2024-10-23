import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { IProjectListData } from './index';
import { DataService } from '../../service/home-graph.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
    tableData: any[] = [];
    pageSize: number = 10;
    pageIndex: number = 1;
    loading: boolean = true;
    total: number = 30;
    id: string = '';

    constructor(
        private dataService: DataService,
        private http: HttpClient,
        private router: Router
    ) {}

    getParamsId() {
        const url = '/nifi-api/flow/process-groups/root/status';
        this.http
            .get(url, {
                params: {
                    recursive: false
                }
            })
            .subscribe((response: any) => {
                const data = response?.processGroupStatus || {};
                this.id = data?.id;
                this.getTableData(data?.id);
            });
    }

    getTableData(id: string) {
        this.dataService.loading$.subscribe((loading) => {
            this.loading = loading;
        });
        this.dataService
            .fetchData(`/nifi-api/flow/process-groups/${id}`, {
                params: {
                    uiOnly: true
                }
            })
            .subscribe((response: any) => {
                this.tableData = response?.processGroupFlow?.flow?.processGroups || [];
                // console.log('>>>>>>>>>>>>tableData', this.tableData);
            });
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex } = params;
        // this.getTableData(pageIndex, pageSize);
    }

    ngOnInit() {
        this.getParamsId();
    }

    handleCreateProject() {
        console.log('创建项目');
    }

    handleNotification(item: any) {
        this.getTableData(this.id);
    }

    handleDoubleClick(tableItem: any) {
        // console.log('>>>>>>>>>>>tableItem', tableItem);
        // this.router.navigate([]);
        const baseUrl = window.location.origin + window.location.pathname;
        const fullUrl = baseUrl + `#/process-groups/${tableItem.id}`;
        window.open(fullUrl, '_blank');
    }
}
