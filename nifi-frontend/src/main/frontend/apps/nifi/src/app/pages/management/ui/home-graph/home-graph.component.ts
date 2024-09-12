import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-home-graph',
    templateUrl: './home-graph.component.html',
    styleUrl: './home-graph.component.scss'
})
export class HomeGraphComponent implements OnInit, AfterViewInit, OnDestroy {
    private myChart: echarts.ECharts | null = null;
    dateRangeValue = null; // 初始为空数组，用户选择后将填充日期

    listOfData = [
        {
            key: '1',
            count: '12',
            status: '提交成功'
        },
        {
            key: '2',
            count: '18',
            status: '正在运行'
        }
    ];

    onDateChange() {}

    ngOnInit() {
        console.log('>>>>>初始化');
    }

    ngAfterViewInit() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('home-graph') as HTMLCanvasElement);

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
        this.myChart.setOption(option);
    }

    ngOnDestroy() {
        // 销毁echarts实例，避免内存泄漏
        if (this.myChart) {
            this.myChart.dispose();
        }
    }
}
