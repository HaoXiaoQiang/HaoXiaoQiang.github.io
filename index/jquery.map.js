/*
自定义封装显示百度地图插件
地图默认经纬度：116.404, 39.915，天安门

settings 参数说明：
url：      地图数据源，可以是json文件，或者是提供json的接口
container：百度地图作用域，ID选择器。默认作用域是container
point:     在中间显示的经纬度点

*/
(function ($) {
    $.fn.loadMap = function (settings) {
        if (this.length < 1) {
            return;
        }
        //设置默认值
        settings = $.extend({
            url: null,
            container: "container",
            point: null
        }, settings);

        var box_obj = this;
        var map_json;


        //初始化插件
        var init = function () {
            var map = new BMap.Map(settings.container);
            //var point = new BMap.Point(116.404, 39.915);
            //map.centerAndZoom(point, 14);

            //var myIcon = new BMap.Icon("../images/ico.png", new BMap.Size(18, 25), {
            //    offset: new BMap.Size(0, 0),
            //    imageOffset: new BMap.Size(0, 0)
            //});

            var points = new Array();
            var marker = new Array();
            var infoWindow = new Array();
            for (var i = 0; i < map_json.data.length; i++) {
                //创建坐标
                var temp_point = map_json.data[i].point;
                points[i] = new BMap.Point(parseFloat(temp_point.split(',')[0]), parseFloat(temp_point.split(',')[1]));
                //创建标注
                marker[i] = new BMap.Marker(points[i], { icon: myIcon })
                map.addOverlay(marker[i]);
                //创建详情展示                
                var temp_tell = "";
                if (map_json.data[i].tel != undefined) {
                    temp_tell = map_json.data[i].tel;
                }
                else if (map_json.data[i].hot_tel != undefined) {
                    temp_tell = map_json.data[i].hot_tel;
                }
                infoWindow[i] = new BMap.InfoWindow("<div style='line-height:1.8em;font-size:12px;'><b>地址:</b>" + map_json.data[i].address + "</br><b>电话:</b>" + temp_tell + "</br></div>", { title: "<span style='font-size:14px;color:#0A8021'>" + map_json.data[i].company + "</span>" });
                                
                //添加标注侦听事件 需要闭包，因为addEventListener添加事件用到i值，而i是在触发时候的值，不是创造时候的值                
                marker[i].addEventListener('mouseover', (function (num) {
                    return function (e) {
                        //添加地图的打开标注事件
                        this.openInfoWindow(infoWindow[num]);
                    }
                })(i), 'false');

            }

            map.setViewport(points);

            if (settings.point != null) {
                var point = new BMap.Point(parseFloat(settings.point.split(',')[0]), parseFloat(settings.point.split(',')[1]));
                map.centerAndZoom(point, 16);
            }
            var myIcon = new BMap.Icon("images/ico.png", new BMap.Size(18, 25), {
                offset: new BMap.Size(0, 0),
                imageOffset: new BMap.Size(0, 0)
            });

            map.addControl(new BMap.NavigationControl());
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
            //向地图中添加比例尺控件  
            var ctrlSca = new window.BMap.ScaleControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT
            });
            map.addControl(ctrlSca);
        };

        // 设置数据
        if (typeof (settings.url) == "string") {
            $.getJSON(settings.url, function (json) {
                map_json = json;
                init();
            });
        } else {
            map_json = settings.url;
            init();
        };

    };
})(jQuery);