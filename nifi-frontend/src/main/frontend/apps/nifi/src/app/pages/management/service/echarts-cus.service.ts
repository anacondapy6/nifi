import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable({
    providedIn: 'root'
})
export class EchartsService {
    // 初始化ECharts实例
    initChart(element: HTMLElement, options?: any) {
        const chart = echarts.init(element);
        if (options) {
            chart.setOption(options);
        }

        return chart; // 返回创建的ECharts实例，方便后续操作
    }

    // setOptions() {}

    // 销毁ECharts实例
    destroyChart(chart: echarts.ECharts): void {
        chart.dispose();
    }
}
