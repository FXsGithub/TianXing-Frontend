import Mock from 'mockjs'

// 是否使用mock.js模拟数据
let useMock = true
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

    Mock.mock('/enso/predictionExamination/errorCorr?year=2022&month=2','get',{
        nino34_mean : '@float(0,1)',
    })
    Mock.mock('/enso/predictionExamination/errorBox?year=2022&month=2', 'get',{
        nino34_mean: {
            q1: 0.3,
            q3: 0.5,
            min: '@float(0,0.2)',
            median: 0.45,
            max: 0.9,
        }
    })

}

export default Mock
