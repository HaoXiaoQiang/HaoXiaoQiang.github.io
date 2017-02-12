/*
 Ajax 三级省市联动
 
 settings 参数说明
 -----
 url:省市数据josn文件路径
 prov:默认省份
 city:默认城市
 dist:默认地区（县）
 nodata:无数据状态
 needforth:是否需要第四个下拉表
 required:标头必选项
 ------------------------------ */
(function ($) {
    $.fn.citySelect = function(settings) {
        if (this.length < 1) {
            return;
        }
        ;

        // 默认值
        settings = $.extend({
            url: "js/data.js",
            prov: null,
            city: null,
            dist: null,
            nodata: null,
            needforth: false,
            required: true
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find("#prov");
        var city_obj = box_obj.find("#city");
        var dist_obj = box_obj.find("#dist");
        var forth_obj = box_obj.find("#car");
        var prov_val = settings.prov;
        var city_val = settings.city;
        var dist_val = settings.dist;
        var select_prehtml = (settings.required) ? "<option value='0'>请选择</option>" : "";
        var city_json;

        // 赋值市级函数
        var cityStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (settings.required)
                prov_id--;

            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);

            var temp_html = select_prehtml;

            if (prov_id < 0 || typeof (city_json.citylist[prov_id].c) == "undefined") {
                if (settings.nodata == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                } else if (settings.nodata == "disabled") {
                    city_obj.css("disabled", "disabled");
                    dist_obj.css("disabled", "disabled");
                }
                ;
                city_obj.html(temp_html).attr("disabled", false).css({ "display": "", "visibility": "" });
                return;
            }
            ;

            // 遍历赋值市级下拉列表            
            $.each(city_json.citylist[prov_id].c, function(i, city) {
                temp_html += "<option value='" + city.nid + "' text='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});            
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (settings.required) {
                prov_id--;
                city_id--;
            }

            dist_obj.empty().attr("disabled", true);

            var temp_html = select_prehtml;

            if (prov_id < 0 || city_id < 0 || typeof (city_json.citylist[prov_id].c[city_id].a) == "undefined") {
                if (settings.nodata == "none") {
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                } else if (settings.nodata == "disabled") {
                    dist_obj.css("disabled", "disabled");
                }
                ;
                dist_obj.html(temp_html).attr("disabled", false).css({ "display": "", "visibility": "" });
                return;
            }
            ;

            // 遍历赋值市级下拉列表            
            $.each(city_json.citylist[prov_id].c[city_id].a, function(i, dist) {
                temp_html += "<option value='" + dist.sid + "' text='" + dist.s + "' data-code=\"" + dist.scode + "\">" + dist.s + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
        };

        var init = function () {            
            // 遍历赋值省份下拉列表
            var temp_html = select_prehtml;
            $.each(city_json.citylist, function(i, prov) {
                temp_html += "<option value='" + prov.pid + "' text='" + prov.p + "'>" + prov.p + "</option>";
            });
            prov_obj.html(temp_html);
            
            //遍历赋值第四个下拉列表
            if (settings.needforth) {
                var temp_forth_html = select_prehtml;

                if (typeof (city_json.forthlist) == "undefined") {
                    if (settings.nodata == "none") {
                        forth_obj.css("display", "none");
                    } else if (settings.nodata == "hidden") {
                        forth_obj.css("visibility", "hidden");
                    } else if (settings.nodata == "disabled") {
                        forth_obj.css("disabled", "disabled");
                    }
                    forth_obj.html(temp_forth_html);
                    return;
                }
                else {                    
                    $.each(city_json.forthlist, function (i, forth) {
                        temp_forth_html += "<option value='" + forth.forthid + "' text='" + forth.forth + "'>" + forth.forth + "</option>";
                    });

                    forth_obj.html(temp_forth_html);
                }
                
            }


            // 若有传入省份与市级的值，则选中。
            if (settings.prov != null) {
                if (typeof (settings.prov) == "string")
                    $("#prov").find("option[text='" + settings.prov + "']").attr("selected", true);
                else
                    prov_obj.val(settings.prov);

                cityStart();
                if (settings.city != null) {
                    if (typeof (settings.city) == "string")
                        $("#city").find("option[text='" + settings.city + "']").attr("selected", true);
                    else
                        city_obj.val(settings.city);

                    distStart();
                    if (settings.dist != null) {
                        if (typeof (settings.dist) == "string")
                            $("#dist").find("option[text='" + settings.dist + "']").attr("selected", true);
                        else
                            dist_obj.val(settings.dist);
                    }
                }
            }
            else {
                cityStart();
                distStart();
            }

                
            // 选择省份时发生事件
            prov_obj.bind("change", function() {
                cityStart();
            });

            // 选择市级时发生事件
            city_obj.bind("change", function() {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof (settings.url) == "string") {
            $.getJSON(settings.url, function (json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        };

        
    };
})(jQuery);