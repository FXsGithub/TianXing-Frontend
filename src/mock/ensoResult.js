import Mock from 'mockjs'

let useMock = true;

if (useMock) {

    //预测结果 chart1
    Mock.mock(/enso\/predictionExamination\/linechart\?year=[0-9]*&month=[0-9]*/, 'get', {

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
                name: "EnsembleForecast",
                type: "line",
                lineStyle: {
                    color: "black", // 将颜色改为红色（你可以使用任何CSS颜色值）
                    width: 3, // 将线条宽度改为3
                    // 根据需求添加更多样式属性
                },

                data: ['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)'],
            },
            {
                name:'ENSO-Cross',
                type:"line",
                lineStyle:{
                    type:"dashed",
                },
                data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
            },
            {
                name:'ENSO-ASC',
                type:"line",
                lineStyle:{
                    type:"dashed",
                },
                data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
            },
            {
                name:'ENSO-GTC',
                type:"line",
                lineStyle:{
                    type:"dashed",
                },
                data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
            },{
                name:'ENSO',
                type:"line",
                lineStyle:{
                    type:"dashed",
                },
                data:['@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)', '@float(0,1)']
            },


        ]
    })

// /2月热力图/
    Mock.mock(/GB\/ForecastResult\/heat2\?year=[0-9]*&month=[0-9]*/, 'get', {


        title:["2023年2月Niño3.4区SST集合平均预测结果"+'@natural(100,500)',
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
            "2023年2月Niño3.4区SST集合平均预测结果",
        ],
        imgSrc:["/imgs/ENSO/202302/1.png",
            "/imgs/ENSO/202302/2.png",
            "/imgs/ENSO/202303/3.png",
            "/imgs/ENSO/202304/4.png",
            "/imgs/ENSO/202302/5.png",
            "/imgs/ENSO/202303/6.png",
            "/imgs/ENSO/202304/7.png",
            "/imgs/ENSO/202302/8.png",
            "/imgs/ENSO/202302/9.png",
            "/imgs/ENSO/202302/10.png",
            "/imgs/ENSO/202302/11.png",
            "/imgs/ENSO/202302/12.png",
            "/imgs/ENSO/202302/13.png",
            "/imgs/ENSO/202302/14.png",
            "/imgs/ENSO/202302/15.png",
            "/imgs/ENSO/202302/16.png",
            "/imgs/ENSO/202302/17.png",
            "/imgs/ENSO/202302/18.png",

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

        ]
    })

// /3月热力图/
    Mock.mock(/GB\/ForecastResult\/heat3\?year=[0-9]*&month=[0-9]*/, 'get', {


        title:["2023年3月Niño3.4区SST集合平均预测结果"+'@natural(100,500)',
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
            "2023年3月Niño3.4区SST集合平均预测结果",
        ],
        imgSrc:["/imgs/ENSO/202302/1.png",
            "/imgs/ENSO/202302/2.png",
            "/imgs/ENSO/202303/3.png",
            "/imgs/ENSO/202304/4.png",
            "/imgs/ENSO/202302/5.png",
            "/imgs/ENSO/202303/6.png",
            "/imgs/ENSO/202304/7.png",
            "/imgs/ENSO/202302/8.png",
            "/imgs/ENSO/202302/9.png",
            "/imgs/ENSO/202302/10.png",
            "/imgs/ENSO/202302/11.png",
            "/imgs/ENSO/202302/12.png",
            "/imgs/ENSO/202302/13.png",
            "/imgs/ENSO/202302/14.png",
            "/imgs/ENSO/202302/15.png",
            "/imgs/ENSO/202302/16.png",
            "/imgs/ENSO/202302/17.png",
            "/imgs/ENSO/202302/18.png",

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

        ]
    })
    // /4月热力图/
    Mock.mock(/GB\/ForecastResult\/heat4\?year=[0-9]*&month=[0-9]*/, 'get', {


        title:["2023年4月Niño3.4区SST集合平均预测结果"+'@natural(100,500)',
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
            "2023年4月Niño3.4区SST集合平均预测结果",
        ],
        imgSrc:["/imgs/ENSO/202302/1.png",
            "/imgs/ENSO/202302/2.png",
            "/imgs/ENSO/202303/3.png",
            "/imgs/ENSO/202304/4.png",
            "/imgs/ENSO/202302/5.png",
            "/imgs/ENSO/202303/6.png",
            "/imgs/ENSO/202304/7.png",
            "/imgs/ENSO/202302/8.png",
            "/imgs/ENSO/202302/9.png",
            "/imgs/ENSO/202302/10.png",
            "/imgs/ENSO/202302/11.png",
            "/imgs/ENSO/202302/12.png",
            "/imgs/ENSO/202302/13.png",
            "/imgs/ENSO/202302/14.png",
            "/imgs/ENSO/202302/15.png",
            "/imgs/ENSO/202302/16.png",
            "/imgs/ENSO/202302/17.png",
            "/imgs/ENSO/202302/18.png",

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

        ]
    })



}