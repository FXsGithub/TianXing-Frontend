import Mock from 'mockjs'

// 是否使用mock.js模拟数据
let useMock = true
if (useMock) {

    Mock.mock('/ice/prediction?year=2023', 'get', {
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
    //预测检验 预测结果逐月对比接口
    Mock.mock('/enso/predictionExamination/monthlyComparison?year=1&month=1', 'get', {
        text:'此处为预测结果汇总折线图。除22年10月-23年1月外，其他月份的预测结果与官方记录差异不大。预测误差较大可能与近年来连续冷（拉尼娜）事件快结束时状态不稳定有关。',
        data1:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)'],
        data2:[1.5, 0.70, 0.80, 0.56, 0.250, 0.13, 0.50,0.50,0.89,0.950,0.65,0.20],
    })
    Mock.mock('/enso/predictionExamination/error?year=1&month=1', 'get', {
        text:'此处的12副图分别为从2022年2月~2023年1月起报的预测结果、官方记录结果及二者绝对差值图（柱状）。',
        data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)','@float(0,1)'],
    })
}

export default Mock
