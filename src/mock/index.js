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

    Mock.mock(/\/enso\/predictionExamination\/errorCorr\?year=[0-9]*&month=[0-9]*/,'get',{
        nino34_mean : '@float(0,1)',
    })

    Mock.mock(/\/enso\/predictionExamination\/errorBox\?year=[0-9]*&month=[0-9]*/, 'get',{
        nino34_mean: {
            q1: 0.3,
            q3: 0.5,
            min: '@float(0,0.2)',
            median: 0.45,
            max: 0.9,
        }
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

    Mock.mock(/\/seaice\/predictionResult\/SIE\?year=\d{4}&month=\d{2}/, 'get', function (options) {
        const url = options.url;
        const params = new URLSearchParams(url.substring(url.indexOf('?')));
        const year = params.get('year');
        const month = params.get('month');

        return {
            description: 'SIE Mock描述',
            prediction: generateData(),
            mean: generateData(),
            upper: generateData(),
            lower: generateData(),
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
            eccc: generateData(),
            ecmwf: generateData(),
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
}

export default Mock
