export interface IHomeTableData {
    value: number;
    name: string;
}

export interface IPieData {
    activeThreadCount?: number; // 活跃线程数
    terminatedThreadCount?: number; // 中断线程数
    flowFilesQueued?: number; // 排队数据
    runningCount?: number; // 正在运行
    stoppedCount?: number; // 已停止
    invalidCount?: number; // 无效
    disabledCount?: number; // 禁用
    activeRemotePortCount?: number; // 可执行远程端口
    inactiveRemotePortCount?: number; // 不可执行远程端口
}
