import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { IProjectListData } from './index';
import { DataService } from '../../service/home-graph.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './component/confirm-dialog.component';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
    selectedHistoryActionId: number | null = null;
    tableData: any[] = [];
    allTableData: any[] = [];
    pageSize: number = 50;
    pageIndex: number = 0;
    loading: boolean = true;
    total: number = 0;
    id: string = '';

    displayedColumns: string[] = [
        'name',
        'canRead',
        'canWrite',
        'executionEngine',
        'runningCount',
        'stoppedCount',
        'invalidCount',
        'comments',
        'actions'
    ];

    constructor(
        private dataService: DataService,
        private http: HttpClient,
        private router: Router,
        private message: NzMessageService,
        private dialog: MatDialog
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
                this.allTableData = response?.processGroupFlow?.flow?.processGroups || [];
                this.tableData = this.allTableData.slice(this.getStartAndEnd().start, this.getStartAndEnd().end);
                // console.log('>>>>>>>>>>>>tableData', this.tableData);
            });
    }

    getStartAndEnd() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize + 1;
        return { start, end };
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
        // this.router.navigate([]);
        const baseUrl = window.location.origin + window.location.pathname;
        const fullUrl = baseUrl + `#/process-groups/${tableItem.id}`;
        window.open(fullUrl, '_blank');
    }

    createMessage(type: string, message: string): void {
        this.message.create(type, `${message}`);
    }

    handleError(error: HttpErrorResponse) {
        this.createMessage('error', '删除失败');
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    handleDelete(tableItem: any) {
        const groupId = tableItem.id;
        // console.log('>>>>>>>table', tableItem);

        this.http
            .delete(`/nifi-api/process-groups/${groupId}`, {
                params: {
                    clientId: tableItem.revision?.clientId,
                    version: 2,
                    disconnectedNodeAcknowledged: false
                }
            })
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
            .subscribe(() => {
                this.createMessage('success', '删除成功');
                this.getTableData(this.id);
            });
    }

    select(item: any) {
        console.log('>>item', item);
    }

    canRead(item: any): boolean {
        return item.canRead;
    }

    isSelected(item: any): boolean {
        if (this.selectedHistoryActionId) {
            return item.id === this.selectedHistoryActionId;
        }
        return false;
    }

    paginationChanged(item: any) {
        this.pageIndex = item.pageIndex;
        this.tableData = this.allTableData.slice(this.getStartAndEnd().start, this.getStartAndEnd().end);
    }

    openConfirmDialog(row: any): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                ...row
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.handleDelete(row);
            }
        });
    }
}
