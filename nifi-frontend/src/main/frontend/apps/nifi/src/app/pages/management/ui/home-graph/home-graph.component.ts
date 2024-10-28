import { Component, AfterViewInit, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import * as echarts from 'echarts';
import { IHomeTableData, IPieData } from './index';
import { EchartsService } from '../../service/echarts-cus.service';
import { DataService } from '../../service/home-graph.service';
import {Instance} from "../history";
import {FieldDescriptor, StatusHomeHistoryRequest, StatusHomeHistoryState} from "../../../../state/home-history";
import {selectStatusHomeHistoryState} from "../../../../state/home-history/home-history.selectors";
import {Store} from "@ngrx/store";
import {reloadStatusHomeHistory} from "../../../../state/home-history/home-history.actions";

@Component({
    selector: 'app-home-graph',
    templateUrl: './home-graph.component.html',
    styleUrl: './home-graph.component.scss'
})
export class HomeGraphComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    private chartInstance: echarts.ECharts | null = null;
    dateRangeValue = null; // 初始为空数组，用户选择后将填充日期
    showChart: boolean = false;

    listOfData: IHomeTableData[] = [];
    pieData: IPieData = {};
    index = 0;

    @ViewChild('homeGraphContainer', { static: false })
    homeGraphContainer: ElementRef;

    constructor(
        private echartsService: EchartsService,
        private dataService: DataService
    ) {}

    getInitPieData() {
        this.dataService.loading$.subscribe((loading) => {
            this.showChart = !loading;
        });
        this.dataService.fetchData('/nifi-api/flow/status').subscribe((response) => {
            // console.log('>>>>>>>>>>>>', response);
            this.pieData = response?.controllerStatus || {};
            this.initTable();
        });
    }

    ngOnInit() {
        this.getInitPieData();
    }

    initTable() {
        this.listOfData = [
            { value: this.pieData.activeThreadCount || 0, name: '活跃线程数' },
            { value: this.pieData.terminatedThreadCount || 0, name: '中断线程数' },
            { value: this.pieData.flowFilesQueued || 0, name: '排队数据' },
            { value: this.pieData.runningCount || 0, name: '正在运行' },
            { value: this.pieData.stoppedCount || 0, name: '已停止' },
            { value: this.pieData.invalidCount || 0, name: '无效' },
            { value: this.pieData.disabledCount || 0, name: '禁用' },
            { value: this.pieData.activeRemotePortCount || 0, name: '可执行远程端口' },
            { value: this.pieData.inactiveRemotePortCount || 0, name: '不可执行远程端口' }
        ];
    }

    initPie() {
        // 基于准备好的dom，初始化echarts实例
        this.chartInstance = this.echartsService.initChart(this.homeGraphContainer.nativeElement);

        // 指定图表的配置项和数据
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            legend: {
                orient: 'horizontal',
                left: 'left',
                bottom: '4px'
            },
            series: [
                {
                    name: '数量',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: this.pieData.activeThreadCount || 0, name: '活跃线程数' },
                        { value: this.pieData.terminatedThreadCount || 0, name: '中断线程数' },
                        { value: this.pieData.flowFilesQueued || 0, name: '排队数据' },
                        { value: this.pieData.runningCount || 0, name: '正在运行' },
                        { value: this.pieData.stoppedCount || 0, name: '已停止' },
                        { value: this.pieData.invalidCount || 0, name: '无效' },
                        { value: this.pieData.disabledCount || 0, name: '禁用' },
                        { value: this.pieData.activeRemotePortCount || 0, name: '可执行远程端口' },
                        { value: this.pieData.inactiveRemotePortCount || 0, name: '不可执行远程端口' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: true,
                        formatter: '{b}: {c} ({d}%)' // 显示名称、数值和百分比
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(option);
    }

    ngAfterViewInit() {
        if (this.showChart && this.homeGraphContainer) {
            // this.initPie();
        }
    }

    ngAfterViewChecked(): void {
        if (this.showChart && this.homeGraphContainer && !this.chartInstance) {
            this.initPie();
        }
    }

    ngOnDestroy() {
        // 销毁echarts实例，避免内存泄漏
        if (this.chartInstance) {
            this.echartsService.destroyChart(this.chartInstance);
            this.chartInstance = null;
        }
    }
}
