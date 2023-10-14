
import Mock from 'mockjs'

let useMock = true;

if (useMock) {
    Mock.mock("/api/getStyData", {"test": "test result"})

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
}

export default Mock