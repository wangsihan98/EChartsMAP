var myChart = echarts.init(document.getElementById('echarts'));

myChart.showLoading({
    animation: 'QuarticIn',
    text: 'Loading'
});
var option = {
    baseOption: {
        title: {
            padding: 20,
            text: '',
            subtext: '',
            sublink: '',
            x: 'left',
            textStyle: {
                color: '#fff'
            },
            subtextStyle: {
                fontStyle: 'italic'
            }
        },

        tooltip: {
            formatter: function (params) {
                if (params.data) {
                    return params.name + '<br>' + '数量:' + params.data.value;
                } else {
                    return params.name + '<br>' + '数量:' + 0;
                }
            }
        },
        visualMap: {
            min: 1,
            max: 20,
            pieces: [
                {
                    min: 15,
                    max: 20
                },
                {
                    min: 10,
                    max: 15
                },
                {
                    min: 5,
                    max: 10
                },
                {
                    min: 1,
                    max: 5
                }
            ],
            inRange: {
                color: ["#b3c6ff", "#4169E1"]
            },
            textStyle: {
                fontFamily: "mFont",
                color: '#222'
            }
        },

        series: [
            {
                type: 'map',
                mapType: "china",
                itemStyle: {
                    normal: {
                        label: {
                            show: true,//默认是否显示省份名称
                            fontFamily: "mFont"
                        },
                        areaStyle: {
                            color: '#ccc' //默认的地图板块颜色
                        }
                    },
                    emphasis: {
                        label: {
                            show: true //选中状态是否显示省份名称
                        },
                        areaStyle: {
                            color: '#90c31d'//选中状态的地图板块颜色
                        }
                    }
                },
                roam: true, //缩放平移
                zoom: 1,
                scaleLimit: {
                    min: 1,
                    max: 10
                },
                data: []
            }
        ]
    },
    options: []
};

d3.csv("data/冷链物流公司百强分布.csv").then(function (res) {
    var list = [];
    res.forEach(function (d) {
        if (d["数量"] * 1 > 0) {
            list.push({
                name: d["省份"], value: d["数量"] * 1, area: d["省份"]
            });
        }
    });
    myChart.hideLoading();
    option.baseOption.series[0].data = list;
    myChart.setOption(option);
});
