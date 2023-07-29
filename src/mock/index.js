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
    
    // added by rqx 2023/7/28 
    //海冰 sic日预测误差 预测结果与基线的比较 折线图1
    Mock.mock('/mock/20OIzKbo31s/seaice/error', 'get',{
        title: {
            text: chartTitle.value,
            left: 'center' //标题水平居中
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            name: '时间',
            data: chartX.value
          },
          yAxis: {
            type: 'value',
            name: 'BACC(%)',
            data: [10, 12, 14, 16, 18]
          },
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
        xAxis: {
          type: 'category',
          name: '时间',
          data: chartX.value
        },
        yAxis: {
          type: 'value',
          name: 'RMSE(%)',
          data: [10, 12, 14, 16, 18]
        },
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
        title: {
            text: chartTitle4.value,
            left: 'center' //标题水平居中
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            // name: '时间',
            data: ['2020 spring','2020 summer','2020 fall','2020 winter',
                   '2021 spring','2021 summer', '2021 fall','2021 winter',
                   '2022 spring','2022 summer', '2022 fall','2022 winter']
          },
          yAxis: {
            type: 'value',
            name: 'RMSD(million km²)',
            data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0]
          },
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
          xAxis: {
            type: 'category',
            // name: '时间',
            data: ['2020 spring','2020 summer','2020 fall','2020 winter',
                   '2021 spring','2021 summer', '2021 fall','2021 winter',
                   '2022 spring','2022 summer', '2022 fall','2022 winter']
          },
          yAxis: {
            type: 'value',
            name: 'RMSD²(million km²)',
            data: [0.2, 0.4, 0.6, 0.8, 1.0 ,1.2 ,1.4 ,1.6 ,1.8]
          },
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
          xAxis: {
            type: 'category',
            // name: '时间',
            data: ['2020 spring','2020 summer','2020 fall','2020 winter',
                   '2021 spring','2021 summer', '2021 fall','2021 winter',
                   '2022 spring','2022 summer', '2022 fall','2022 winter']
          },
          yAxis: {
            type: 'value',
            name: 'Correlation coefficient',
            data: [0.970, 0.975, 0.980, 0.985, 0.990 ,0.995 ,1.000]
          },
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
          xAxis: {
            type: 'category',
            // name: '时间',
            data:['2020 spring','2020 summer','2020 fall','2020 winter',
                   '2021 spring','2021 summer', '2021 fall','2021 winter',
                   '2022 spring','2022 summer', '2022 fall','2022 winter']
          },
          yAxis: {
            type: 'value',
            name: 'standard deviation(million km²)',
            data: [0.0, 0.5, 1.0, 1.5, 2.0 ,2.5 ,3.0,3.5]
          },
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
    title: {
        text: chartTitle3.value,
        left: 'center' //标题水平居中
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        name: 'Lead time',
        data: ['1day', '2day', '3day', '4day','5day','6day','7day']
      },
      yAxis: {
        type: 'value',
        name: 'RMSE(%)',
        data: [0, 5, 10, 15, 20]
      },
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
}

export default Mock
