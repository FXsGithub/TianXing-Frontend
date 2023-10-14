import Mock from 'mockjs'

// 是否使用mock.js模拟数据
let useMock = false;
if (useMock) {

    Mock.mock('/ice/prediction?year=2022&month=2', 'get', {
        title: {
            text: 'Traffic Sources',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
        },
        series: [
            {
                name: 'Traffic Sources',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: '@natural(100, 500)', name: 'Direct'},
                    {value: '@natural(100, 500)', name: 'Email'},
                    {value: '@natural(100, 500)', name: 'Ad Networks'},
                    {value: '@natural(100, 500)', name: 'Video Ads'},
                    {value: '@natural(100, 500)', name: 'Search Engines'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    })


    Mock.mock(/enso\/predictionExamination\/errorBox\?year=[0-9]*&month=[0-9]*/,'get',{
        option:{
            title: [
                {
                    text: '误差分析箱型图',
                    left: 'center'
                },
            ],
            legend: {
                x:'center',
                y:'bottom',
                tooltip: {
                    show: true
                }
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '25%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                show:false,
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                name: 'Niño 3.4 Index',
                splitArea: {
                    show: true
                },
                data:[0, 0.1, 0.2, 0.3, 0.4, 0.5]
            },
            series: [
                {
                    name: '2021年3月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, '@float(0.6,1)']],
                },
                {
                    name: '2021年4月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, '@float(0.2,0.4)', 0.4, 0.5]],
                },
                {
                    name: '2021年5月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, '@float(0.3,0.5)', 0.5]],
                },
                {
                    name: '2021年6月起报预报误差',
                    type: 'boxplot',
                    data: [['@float(0,0.2)', 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2021年7月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, '@float(0.2,0.4)', 0.4, 0.5]],
                },
                {
                    name: '2021年8月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2021年9月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2021年10月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2021年11月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2021年12月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2022年1月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },
                {
                    name: '2022年2月起报预报误差',
                    type: 'boxplot',
                    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],
                },

            ],
        },
        text: '此处为不同起报月份的绝对差值分布箱型图。'
    })

    Mock.mock(/enso\/predictionExamination\/errorCorr\?year=[0-9]*&month=[0-9]*/, 'get',{
        option:{
            title:[
                {
                    text: '预测结果逐月相关性分析',
                    left: 'center'
                }
            ],
            xAxis: {
                type: 'category',
                data: ['2021年3月起报结果', '2021年4月起报结果', '2021年5月起报结果', '2021年6月起报结果','2021年7月起报结果', '2021年8月起报结果', '2021年9月起报结果', '2021年10月起报结果','2022年11月起报结果', '2022年12月起报结果','2023年1月起报结果', '2023年2月起报结果'],
                axisLabel: {
                    show:true,
                    rotate:30,
                }
            },
            yAxis: {
                type: 'value',
                name: 'Niño 3.4 Index',
                data:[0, 0.2, 0.4, 0.6, 0.8, 1]
            },
            series: [
                {
                    data: ['@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)'],
                    type: 'line'
                }
            ]
        },
        text:'此处为不同起报月份的相关性折线图。'
    })


    //预测检验 预测结果逐月对比接口
    Mock.mock(/enso\/predictionExamination\/monthlyComparison\?year=[0-9]*&month=[0-9]*/, 'get', {
        option:{
            title: {
                text: "预测结果逐月对比",
                left:"center",
            },
            tooltip: {
                trigger: "item",
            },
            legend: {
                x:'center',
                y:'bottom',
                tooltip: {
                    show: true
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "25%",
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data:["Feb-22","Mar-22","Apr-22","May-22","Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                axisLabel: {
                    interval: 2, // 设置横坐标刻度的显示间隔为2，即每个刻度都显示
                },
            },
            yAxis: {
                type: "value",
                name: 'Niño 3.4 Index',
            },
            series: [
                {
                    name: "气候中心Nino3.4指数记录",
                    type: "line",
                    lineStyle: {
                        color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
                        width: 3, // 将线条宽度改为3
                        // 根据需求添加更多样式属性
                    },
                    itemStyle: {
                        // 添加itemStyle属性来自定义节点样式
                        color: "black", // 将节点颜色改为黑色
                    },
                    data: ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                },
                {
                    name:'2022年2月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年3月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年4月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },{
                    name:'2022年5月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null , '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年6月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年7月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },{
                    name:'2022年8月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },{
                    name:'2022年9月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null,null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年10月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null,null,null, '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年11月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null,null,null, null, '@float(0,1)', '@float(0,1)', '@float(0,1)']
                },
                {
                    name:'2022年12月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null,null,null, null,null, '@float(0,1)', '@float(0,1)']
                },{
                    name:'2023年1月起报预报误差',
                    type:"line",
                    lineStyle:{
                        type:"dashed",
                    },
                    data:[null,null,null,null, null,null,null,null, null,null,null, '@float(0,1)']
                }
            ]
        },
        text:'此处为预测结果汇总折线图。'
    })

    //预测检验 预报误差接口
    Mock.mock(/enso\/predictionExamination\/error\?year=[0-9]*&month=[0-9]*/, 'get', {
        option:[
            {
                title: {
                    text: "预报结果误差柱状图",
                    left: "center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Feb-22", "Mar-22", "Apr-22", "May-22", "Jun-22", "Jul-22", "Aug-22", "Sep-22", "Oct-22", "Nov-22", "Dec-22", "Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 2, // 设置横坐标刻度的显示间隔为1，即每个刻度都显示
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年2月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data: ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data: [0.1, 0.2, 0.3, 0.4, 0.8, 0.5, 1.3, 0.6, 0.8, 0.9, 1.3, 0.4],
                    },
                    {
                        name: "2022年2月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data: ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Mar-22","Apr-22","May-22","Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 1,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年3月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.2, 0.3,0.4, 0.8, 0.5, 1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年3月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Apr-22","May-22","Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 1,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年4月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.3,0.4, 0.8, 0.5, 1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年4月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["May-22","Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 1,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年5月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ 0.4, 0.8, 0.5, 1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年5月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Jun-22","Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 1,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年6月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.8, 0.5, 1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年6月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Jul-22","Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 1,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年7月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.5,1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年7月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [  '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Aug-22","Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年8月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ 1.3,0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年8月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Sep-22","Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年9月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [ '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.6,0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年9月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [  '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Oct-22","Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年10月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [  '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.8, 0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年10月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [  '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Nov-22","Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年11月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [  '@float(0,1)', '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.9, 1.3,0.4],
                    },
                    {
                        name: "2022年11月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [  '@float(0,1)', '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Dec-22","Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2022年12月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [ '@float(0,1)', '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [1.3,0.4],
                    },
                    {
                        name: "2022年12月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [ '@float(0,1)','@float(0,1)'],
                    },
                ]
            },
            {
                title: {
                    text: "预报结果误差柱状图",
                    left:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    tooltip: {
                        show: true
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["Jan-23"],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Niño 3.4 Index',
                    },
                ],
                series: [
                    {
                        name: "2023年1月起报误差", //这个数据应该要是气候中心和起报数据的差值，这里不方便计算所以直接用随机数
                        type: 'bar',
                        data:  [  '@float(0,1)'],
                    },
                    {
                        name: "气候中心Nino3.4指数记录",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [0.4],
                    },
                    {
                        name: "2023年1月起报",
                        type: "line",
                        lineStyle: {
                            type: "dashed",
                        },
                        data:  [  '@float(0,1)'],
                    },
                ]
            },
        ],
        text:'此处的12副图分别为从2022年2月~2023年1月起报的预测结果、官方记录结果及二者绝对差值图（柱状）。'
    })

    Mock.mock(/\/seaice\/predictionResult\/SIE\?year=\d{4}&month=\d{1,2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');

        return {
            "availableList": [
                {
                    "year": 2023,
                    "month": 1
                },
                {
                    "year": 2024,
                    "month": 2
                }
            ],
            "description": "2023年9月SIE极小值预测为4.4133，相较于2022年观测偏低，2023年海冰范围预计将比2022年整体偏少。",
            "option": {
                "yAxis": {
                    "type": "value"
                },
                "xAxis": {
                    "data": [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月"
                    ],
                    "name": "时间",
                    "type": "category"
                },
                "legend": {
                    "data": [
                        "prediction",
                        "mean",
                        "upper",
                        "lower"
                    ],
                    "orient": "horizontal",
                    "left": "center",
                    "bottom": "5"
                },
                "series": [
                    {
                        "data": [
                            13.616701126098633,
                            14.498695373535156,
                            14.706720352172852,
                            13.947604179382324,
                            12.45638656616211,
                            10.70493507385254,
                            8.137545585632324,
                            5.661144256591797,
                            4.875626087188721,
                            7.019153118133545,
                            9.681649208068848,
                            11.843036651611328
                        ],
                        "name": "prediction",
                        "type": "line"
                    },
                    {
                        "data": [
                            13.417181968688965,
                            14.331096649169922,
                            14.539737701416016,
                            13.789073944091797,
                            12.34227180480957,
                            10.566046714782717,
                            7.872669219970703,
                            5.395510196685791,
                            4.566888809204102,
                            6.4302802085876465,
                            9.293512344360352,
                            11.744112014770508
                        ],
                        "name": "mean",
                        "type": "line"
                    },
                    {
                        "data": [
                            13.616701126098633,
                            14.498695373535156,
                            14.706720352172852,
                            14.027923583984377,
                            12.67048454284668,
                            11.125555992126465,
                            8.629323959350586,
                            6.200892925262451,
                            5.310474872589111,
                            7.136165618896484,
                            9.95911979675293,
                            12.141965866088867
                        ],
                        "name": "upper",
                        "type": "line"
                    },
                    {
                        "data": [
                            13.217662811279297,
                            14.163497924804688,
                            14.37275505065918,
                            13.55022430419922,
                            12.014058113098145,
                            10.006537437438965,
                            7.11601448059082,
                            4.590127468109131,
                            3.8233025074005127,
                            5.724394798278809,
                            8.62790584564209,
                            11.346259117126465
                        ],
                        "name": "lower",
                        "type": "line"
                    }
                ],
                "tooltip": {},
                "title": {
                    "left": "center",
                    "text": "2023年1月~2024年1月SIE指数预测结果"
                }
            }
        };

        function generateData() {
            const data = [];
            for (let i = 0; i < 12; i++) {
                data.push(Mock.Random.natural(1, 12));
            }
            return data;
        }
    });

    Mock.mock(/\/seaice\/predictionResult\/SIC\?year=\d{4}&month=\d{2}&day=\d{2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');
        const day = params.get('day');

        return {
            description: 'SIC Mock描述',
            image: ''
        };
    });

    Mock.mock(/\/nao\/predictionResult\/NAOI\?year=\d{4}&month=\d{2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');

        return {
            description: '可以提前三个月预测到NAO的发生',
            observations: generateData(),
            naomcr: generateData(),
        };

        function generateData() {
            const data = [];
            for (let i = 0; i < 12; i++) {
                data.push(Mock.Random.natural(1, 12));
            }
            return data;
        }
    });

    Mock.mock(/\/nao\/predictionResult\/SLP\?year=\d{4}&month=\d{2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');

        return {
            description: 'SLP Mock描述',
            image: ''
        };
    });

    Mock.mock(/\/globalweather\/predictionResult\/wind\?year=\d{4}&month=\d{1,2}&day=\d{1,2}&hour=\d{1,2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');

        return {
            latitudeWindDescription: '纬向风场 Mock描述',
            longitudeWindDescription: '经向风场 Mock描述',
            latitudeWindImage: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            longitudeWindImage: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        };
    });

    // added by rqx 2023/7/28

    // const params = {
    //   year: selectedYear.value,
    //   month: selectedMonth.value
    // };

    //海冰 sic日预测误差 预测结果与基线的比较 折线图1
    Mock.mock('/mock/20OIzKbo31s/seaice/error', 'get',{
        // title: {
        //     text: chartTitle.value,
        //     left: 'center' //标题水平居中
        //   },
        tooltip: {},
        // xAxis: {
        //   type: 'category',
        //   name: '时间',
        //   data: chartX.value
        // },
        // yAxis: {
        //   type: 'value',
        //   name: 'BACC(%)',
        //   data: [10, 12, 14, 16, 18]
        // },
        legend: { //图例
            data: ['ours', 'persistence'],
            orient: 'horizontal',
            left: 'center',
            bottom: '5',
        },
        series: [
            {
                name: 'ours',
                type: 'line',
                data: [10, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1,10,12,14,16,18,10,
                    1, 1, 1, 1, 1, 1, 1, 1, 1]

            },
            {
                name: 'persistence',
                type: 'line',
                data: [2, 2, 12, 2, 2, 2, 2, 2, 2,
                    1, 1, 1,10,12,14,16,18,10,
                    1, 1, 1, 1, 1, 1, 1, 10, 1]
            },

        ]



    }),


        //海冰 sic日预测误差 预测结果与基线的比较 折线图2
        Mock.mock('/mock/20OIzKbo31s/seaice/error', 'get',{
            tooltip: {},
            // xAxis: {
            //   type: 'category',
            //   name: '时间',
            //   data: chartX.value
            // },
            // yAxis: {
            //   type: 'value',
            //   name: 'RMSE(%)',
            //   data: [10, 12, 14, 16, 18]
            // },
            legend: { //图例
                data: ['ours', 'persistence'],
                orient: 'horizontal',
                left: 'center',
                bottom: '5',
            },
            series: [
                {
                    name: 'ours',
                    type: 'line',
                    data: [2, 2, 12, 2, 2, 2, 2, 2, 2,
                        1, 1, 1,10,12,14,16,18,10,
                        1, 1, 1, 1, 1, 1, 1, 10, 1]
                },
                {
                    name: 'persistence',
                    type: 'line',
                    data: [10, 1, 1, 1, 1, 1, 1, 1, 1,
                        1, 1, 1,10,12,14,16,18,10,
                        1, 1, 1, 1, 1, 1, 1, 1, 1]
                },

            ]



        }),

        //海冰 sie预测误差分析 第一张折线图（a）
        Mock.mock('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis', 'get',{
            // title: {
            //     text: chartTitle4.value,
            //     left: 'center' //标题水平居中
            //   },
            tooltip: {},
            // xAxis: {
            //   type: 'category',
            //   // name: '时间',
            //   data: ['2020 spring','2020 summer','2020 fall','2020 winter',
            //          '2021 spring','2021 summer', '2021 fall','2021 winter',
            //          '2022 spring','2022 summer', '2022 fall','2022 winter']
            // },
            // yAxis: {
            //   type: 'value',
            //   name: 'RMSD(million km²)',
            //   data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0]
            // },
            legend: { //图例
                data: [''],
                orient: 'horizontal',
                left: 'center',
                bottom: '5',
            },
            series: [
                {
                    // name: 'ours',
                    type: 'line',
                    data: [0, 0.2, 0.1, 0.8, 0.3, 0.2, 0.1, 0.1, 0.6, 0.5, 0.1, 1.1,1.7]
                }
            ]

        }),

        //海冰 sie预测误差分析 第二张折线图（b）
        Mock.mock('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis', 'get',{
            title: {
                // text: chartTitle4.value,
                left: 'center' //标题水平居中
            },
            tooltip: {},
            // xAxis: {
            //   type: 'category',
            //   // name: '时间',
            //   data: ['2020 spring','2020 summer','2020 fall','2020 winter',
            //          '2021 spring','2021 summer', '2021 fall','2021 winter',
            //          '2022 spring','2022 summer', '2022 fall','2022 winter']
            // },
            // yAxis: {
            //   type: 'value',
            //   name: 'RMSD²(million km²)',
            //   data: [0.2, 0.4, 0.6, 0.8, 1.0 ,1.2 ,1.4 ,1.6 ,1.8]
            // },
            legend: { //图例
                data: ['bais', 'variance'],
                orient: 'horizontal',
                left: 'center',
                bottom: '5',
            },
            series: [
                {
                    name: 'bais',
                    type: 'bar',
                    data: [3, 1, 1, 1.5, 1, 2.1, 1, 2.0, 1, 1.5, 0.5, 1]
                },
                {
                    name: 'variance',
                    type: 'bar',
                    data: [3, 1.5, 1.0, 2.5, 2.0, 2.1, 1, 2.0, 1, 0.5, 2.5, 1]
                },

            ]

        }),

        //海冰 sie预测误差分析 第三张折线图（c）
        Mock.mock('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis', 'get',{
            title: {
                // text: chartTitle4.value,
                left: 'center' //标题水平居中
            },
            tooltip: {},
            // xAxis: {
            //   type: 'category',
            //   // name: '时间',
            //   data: ['2020 spring','2020 summer','2020 fall','2020 winter',
            //          '2021 spring','2021 summer', '2021 fall','2021 winter',
            //          '2022 spring','2022 summer', '2022 fall','2022 winter']
            // },
            // yAxis: {
            //   type: 'value',
            //   name: 'Correlation coefficient',
            //   data: [0.970, 0.975, 0.980, 0.985, 0.990 ,0.995 ,1.000]
            // },
            legend: { //图例
                data: [''],
                orient: 'horizontal',
                left: 'center',
                bottom: '5',
            },
            series: [
                {
                    // name: 'ours',
                    type: 'line',
                    data: [0.970, 0.985, 0.990, 0.978, 0.980, 0.995, 1.000, 0.975, 0.990, 1.000, 0.990, 1.000,0.976]
                }
            ]

        }),

        //海冰 sie预测误差分析 第四张折线图（d）
        Mock.mock('/mock/20OIzKbo31s/seaice/predictionExamination/errorAnalysis', 'get',{
            title: {
                // text: chartTitle4.value,
                left: 'center' //标题水平居中
            },
            tooltip: {},
            //   xAxis: {
            //     type: 'category',
            //     // name: '时间',
            //     data:['2020 spring','2020 summer','2020 fall','2020 winter',
            //            '2021 spring','2021 summer', '2021 fall','2021 winter',
            //            '2022 spring','2022 summer', '2022 fall','2022 winter']
            //   },
            //   yAxis: {
            //     type: 'value',
            //     name: 'standard deviation(million km²)',
            //     data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0,3.5]
            //   },
            legend: { //图例
                data: ['observation','IceTFT'],
                orient: 'horizontal',
                left: 'center',
                bottom: '5',
            },
            series: [
                {
                    name: 'observation',
                    type: 'line',
                    data: [0.5, 1.0, 0.99, 1.2, 1.5, 2.0, 0.5, 2.5, 3.0, 3.5, 2.0, 1.0,1.5]
                },
                {
                    name: 'IceTFT',
                    type: 'line',
                    data: [0.5, 0.95, 0.99, 1.5, 1.6, 2.2, 0.3, 2.2, 3.5, 3.5, 2.2, 1.0,1.5]
                }
            ]
        }),


        //海冰预测检验的箱型图
        Mock.mock('/mock/20OIzKbo31s/seaice/errorBox', 'get',{
            // title: {
            //     text: chartTitle3.value,
            //     left: 'center' //标题水平居中
            //   },
            tooltip: {},
            // xAxis: {
            //   type: 'category',
            //   name: 'Lead time',
            //   data: ['1day', '2day', '3day', '4day','5day','6day','7day']
            // },
            // yAxis: {
            //   type: 'value',
            //   name: 'RMSE(%)',
            //   data: [0, 5, 10, 15, 20]
            // },
            series: [
                {
                    name: 'withoutDA_withoutBC',
                    type: 'candlestick',
                    data: [
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                    ]
                },
                {
                    name: 'withoutDA_withBC_RMSE',
                    type: 'candlestick',
                    data: [
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                    ]
                },
                {
                    name: 'withDA_withoutBC_RMSE',
                    type: 'candlestick',
                    data: [
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                    ]
                },
                {
                    name: 'MITgcm(with DA)withBC_RMSE',
                    type: 'candlestick',
                    data: [
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                        [5, 15, 10, 20],
                    ]
                }
            ]
        })

    Mock.mock(/GB\/predictionResult\/temperature\?year=[0-9]*&month=[0-9]*&day=[0-9]*&hour=[0-9]*/, 'get', {
        title:["2019年1⽉1⽇0时2⽶⽓温预测结果"+'@natural(100,500)',
            "2019年1⽉1⽇6时2⽶⽓温预测结果",
            "2019年1⽉1⽇12时2⽶⽓温预测结果",
            "2019年1⽉1⽇18时2⽶⽓温预测结果",
            "2019年1⽉1⽇24时2⽶⽓温预测结果",
            "2019年1⽉1⽇30时2⽶⽓温预测结果",
            "2019年1⽉1⽇36时2⽶⽓温预测结果",
            "2019年1⽉1⽇42时2⽶⽓温预测结果",
            "2019年1⽉1⽇48时2⽶⽓温预测结果",
            "2019年1⽉1⽇54时2⽶⽓温预测结果",
            "2019年1⽉1⽇60时2⽶⽓温预测结果",
            "2019年1⽉1⽇66时2⽶⽓温预测结果",
            "2019年1⽉1⽇72时2⽶⽓温预测结果",
            "2019年1⽉1⽇78时2⽶⽓温预测结果",
            "2019年1⽉1⽇84时2⽶⽓温预测结果",
            "2019年1⽉1⽇90时2⽶⽓温预测结果",
            "2019年1⽉1⽇96时2⽶⽓温预测结果",
            "2019年1⽉1⽇102时2⽶⽓温预测结果",
            "2019年1⽉1⽇108时2⽶⽓温预测结果",
            "2019年1⽉1⽇114时2⽶⽓温预测结果"],
        imgSrc:["/imgs/WEA/t2m/20190101/1.png",
            "/imgs/WEA/t2m/20190101/2.png",
            "/imgs/WEA/t2m/20190101/3.png",
            "/imgs/WEA/t2m/20190101/4.png",
            "/imgs/WEA/t2m/20190101/5.png",
            "/imgs/WEA/t2m/20190101/6.png",
            "/imgs/WEA/t2m/20190101/7.png",
            "/imgs/WEA/t2m/20190101/8.png",
            "/imgs/WEA/t2m/20190101/9.png",
            "/imgs/WEA/t2m/20190101/10.png",
            "/imgs/WEA/t2m/20190101/11.png",
            "/imgs/WEA/t2m/20190101/12.png",
            "/imgs/WEA/t2m/20190101/13.png",
            "/imgs/WEA/t2m/20190101/14.png",
            "/imgs/WEA/t2m/20190101/15.png",
            "/imgs/WEA/t2m/20190101/16.png",
            "/imgs/WEA/t2m/20190101/17.png",
            "/imgs/WEA/t2m/20190101/18.png",
            "/imgs/WEA/t2m/20190101/19.png",
            "/imgs/WEA/t2m/20190101/20.png",
        ],
        text: [
            "1全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "2全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "3全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "4全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "5全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "6全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "7全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "8全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "9全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "10全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "11全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "12全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "13全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "14全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "15全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "16全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "17全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "18全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "19全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温",
            "20全球整体⽓温偏⾼，澳⼤利亚出现异常⾼温"
        ]
    })
    Mock.mock(/GB\/predictionResult\/rain\?year=[0-9]*&month=[0-9]*&day=[0-9]*&hour=[0-9]*/, 'get', {
        title:["2019年1⽉1⽇0时地表降水预测结果"+'@natural(100,500)',
            "2019年1⽉1⽇6时地表降水预测结果",
            "2019年1⽉1⽇12时地表降水预测结果",
            "2019年1⽉1⽇18时地表降水预测结果",
            "2019年1⽉1⽇24时地表降水预测结果",
            "2019年1⽉1⽇30时地表降水预测结果",
            "2019年1⽉1⽇36时地表降水预测结果",
            "2019年1⽉1⽇42时地表降水预测结果",
            "2019年1⽉1⽇48时地表降水预测结果",
            "2019年1⽉1⽇54时地表降水预测结果",
            "2019年1⽉1⽇60时地表降水预测结果",
            "2019年1⽉1⽇66时地表降水预测结果",
            "2019年1⽉1⽇72时地表降水预测结果",
            "2019年1⽉1⽇78时地表降水预测结果",
            "2019年1⽉1⽇84时地表降水预测结果",
            "2019年1⽉1⽇90时地表降水预测结果",
            "2019年1⽉1⽇96时地表降水预测结果",
            "2019年1⽉1⽇102时地表降水预测结果",
            "2019年1⽉1⽇108时地表降水预测结果",
            "2019年1⽉1⽇114时地表降水预测结果"],
        imgSrc:["/imgs/WEA/tp/20190101/1.png",
            "/imgs/WEA/tp/20190101/2.png",
            "/imgs/WEA/tp/20190101/3.png",
            "/imgs/WEA/tp/20190101/4.png",
            "/imgs/WEA/tp/20190101/5.png",
            "/imgs/WEA/tp/20190101/6.png",
            "/imgs/WEA/tp/20190101/7.png",
            "/imgs/WEA/tp/20190101/8.png",
            "/imgs/WEA/tp/20190101/9.png",
            "/imgs/WEA/tp/20190101/10.png",
            "/imgs/WEA/tp/20190101/11.png",
            "/imgs/WEA/tp/20190101/12.png",
            "/imgs/WEA/tp/20190101/13.png",
            "/imgs/WEA/tp/20190101/14.png",
            "/imgs/WEA/tp/20190101/15.png",
            "/imgs/WEA/tp/20190101/16.png",
            "/imgs/WEA/tp/20190101/17.png",
            "/imgs/WEA/tp/20190101/18.png",
            "/imgs/WEA/tp/20190101/19.png",
            "/imgs/WEA/tp/20190101/20.png",
        ],
        text:["1赤道地区与北半球降水较多，南半球降水较少",
            "2赤道地区与北半球降水较多，南半球降水较少",
            "3赤道地区与北半球降水较多，南半球降水较少",
            "4赤道地区与北半球降水较多，南半球降水较少",
            "5赤道地区与北半球降水较多，南半球降水较少",
            "6赤道地区与北半球降水较多，南半球降水较少",
            "7赤道地区与北半球降水较多，南半球降水较少",
            "8赤道地区与北半球降水较多，南半球降水较少",
            "9赤道地区与北半球降水较多，南半球降水较少",
            "10赤道地区与北半球降水较多，南半球降水较少",
            "11赤道地区与北半球降水较多，南半球降水较少",
            "12赤道地区与北半球降水较多，南半球降水较少",
            "13赤道地区与北半球降水较多，南半球降水较少",
            "14赤道地区与北半球降水较多，南半球降水较少",
            "15赤道地区与北半球降水较多，南半球降水较少",
            "16赤道地区与北半球降水较多，南半球降水较少",
            "17赤道地区与北半球降水较多，南半球降水较少",
            "18赤道地区与北半球降水较多，南半球降水较少",
            "19赤道地区与北半球降水较多，南半球降水较少",
            "20赤道地区与北半球降水较多，南半球降水较少",
        ]
    })


}

export default Mock
