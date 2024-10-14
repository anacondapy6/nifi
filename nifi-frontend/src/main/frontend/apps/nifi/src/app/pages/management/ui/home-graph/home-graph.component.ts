import { Component, AfterViewInit, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import * as echarts from 'echarts';
import { IHomeTableData } from './index';
import { EchartsService } from '../../service/echarts-cus.service';

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
    index = 0;

    @ViewChild('homeGraphContainer', { static: false })
    homeGraphContainer: ElementRef;

    constructor(private echartsService: EchartsService) {}

    onDateChange() {}

    ngOnInit() {
        setTimeout(() => {
            this.listOfData = [
                {
                    count: 1,
                    status: '提交成功'
                }
            ];
            this.showChart = true;
        }, 3000);
    }

    initPie() {
        // 基于准备好的dom，初始化echarts实例
        this.chartInstance = this.echartsService.initChart(this.homeGraphContainer.nativeElement);

        // 指定图表的配置项和数据
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                left: 'left',
                bottom: '4px'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
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
