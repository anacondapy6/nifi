import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { IProjectListData } from './index';
import { DataService } from '../../service/home-graph.service';

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

    constructor(
        private dataService: DataService,
        private http: HttpClient
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
                // console.log('>>>>>>>>>>>>', this.tableData[0].status);
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
}
