import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IProjectListData } from './index';
import { DataService } from '../../service/home-graph.service';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
    tableData: IProjectListData[] = [];
    pageSize: number = 10;
    pageIndex: number = 1;
    loading: boolean = true;
    total: number = 30;

    constructor(private dataService: DataService) {}

    getTableData(pageIndex = 1, pageSize = 10) {
        this.dataService.loading$.subscribe((loading) => {
            this.loading = loading;
        });
        this.dataService.fetchData('/nifi-api/flow/status').subscribe((response) => {
            // console.log('>>>>>>>>>>>>', response);
            this.tableData = [
                {
                    name: 'test',
                    user: 'admin',
                    workFlow: 3,
                    runWorkFlow: 0,
                    desc: '随便写的',
                    createTime: '2024-04-24 16:26:10',
                    updateTime: '2024-04-24 16:36:10'
                },
                {
                    name: 'test2',
                    user: 'admin',
                    workFlow: 5,
                    runWorkFlow: 1,
                    desc: '随便写的',
                    createTime: '2024-05-16 16:26:10',
                    updateTime: '2024-06-06 16:36:10'
                }
            ];
        });
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex } = params;
        this.getTableData(pageIndex, pageSize);
    }

    ngOnInit() {
        // this.getTableData();
        console.log();
    }

    handleCreateProject() {
        console.log('创建项目');
    }
}
