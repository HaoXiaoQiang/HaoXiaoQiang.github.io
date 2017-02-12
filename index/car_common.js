$(function () {
    //JQuery扩展，获取url参数值
    (function ($) {
        $.getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    })(jQuery);



    //全局head设置    
    $("head").append("<link rel=\"shortcut icon\" href=\"/images/favicon.ico\" type=\"image/x-icon\" />");
    var tempPageTitle = $("head title").html();
    if (tempPageTitle == "" || tempPageTitle == undefined) {
        $("head title").html("上汽通用五菱官方网站");
    }

    //验证手机号
    function checkPhone(phone) {
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (!(reg.test(phone))) {
            return false;
        }
        else {
            return true;
        }
    }
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    //返回当前页面的页面名称
    function pageTitle() {
        var link = window.location.href;
        var temp_page = link.substring(link.lastIndexOf('/'));
        temp_page = temp_page.replace('/', '').replace(temp_page.substring(temp_page.lastIndexOf('?')), '');
        if (temp_page == "5602016.html") {
            temp_page = "560.html";
        } else if (temp_page == "7302016.html") {
            temp_page = "730.html";
        }
        return temp_page;
    }

    //通过车型页匹配车型
    function CarNameFromPage() {

        var pagename = pageTitle();
        var cartype = "";
        switch (pagename) {
            case "510.html":
                cartype = "宝骏510";
                break;
            case "310.html":
                cartype = "宝骏310";
                break;
            case "330.html":
                cartype = "宝骏330";
                break;
            case "5602016.html":
                cartype = "宝骏560";
                //  pagename = "560.html";
                break;
            case "560.html":
                cartype = "宝骏560";
                //  pagename = "560.html";
                break;
            case "610.html":
                cartype = "宝骏610";
                break;
            case "630.html":
                cartype = "宝骏630";
                break;
            case "730.html":
                cartype = "宝骏730";
                break;
            case "7302016.html":
                cartype = "宝骏730";
                break;
            case "hongguang_s.html":
                cartype = "五菱宏光S";
                break;
            case "hongguang_s1.html":
                cartype = "五菱宏光S1";
                break;
            case "lechi.html":
                cartype = "乐驰";
                break;
            case "rongguang.html":
                cartype = "五菱荣光";
                break;
            case "weihuo.html":
                cartype = "五菱系类箱式运输车";
                break;
            case "zhengcheng.html":
                cartype = "五菱征程";
                break;
            case "zhiguang.html":
                cartype = "五菱之光";
                break;
            case "recruit_idea.html":
                cartype = "人才培养";
                break;
            case "campus-recruitment.html":
                cartype = "校园招聘";
                break;
            case "social-recruitment.html":
                cartype = "社会招聘";
                break;
            default:
                cartype = "";
                break;
        }

        return cartype;
    }

    //获取投放参数值
    var FAID = function () {
        var fid = "0";
        var aid = "0";
        var lid = "0";

        fid = $.getQueryString("fid");
        aid = $.getQueryString("aid");
        lid = $.getQueryString("lid");
        if (fid == null || typeof (fid) == "undefined" || fid == "0") {
            fid = $.getQueryString("MediaID");
            if (fid == null || typeof (fid) == "undefined" || fid == "0") {
                fid = "0";
            }
        }
        if (aid == null || typeof (aid) == "undefined" || aid == "0") {
            aid = $.getQueryString("ProjectID");
            if (aid == null || typeof (aid) == "undefined" || aid == "0") {
                aid = "0";
            }
        }
        if (lid == null || typeof (lid) == "undefined" || lid == "0") {
            lid = "0";
        }


        return fid + "," + aid + "," + lid;
    };


    //车型鉴赏输出
    function CarArtImgs() {
        var url = "ashx/car_img.ashx?r=" + Math.random();
        var PageName = pageTitle().split('.')[0];
        url += "&page=" + PageName;

        var temp_act = "neishi";
        if (document.getElementById("neishi") != null) { temp_act = "neishi"; }
        if (document.getElementById("waiguan") != null) { temp_act = "waiguan"; }

        if (temp_act == "neishi") {
            url += "&type=1";
        }
        else if (temp_act == "waiguan") {
            url += "&type=2";
        }


        $.getJSON(url, function (json) {
            var temp_art_img = "<ul>";

            for (var i = 0; i < json.appreciate.length; i++) {
                //console.log(i);
                if (i % 12 == 0) {
                    // temp_art_img += "<ul>";
                }

                temp_art_img += "<li><a rel=\"group1\" href=\"" + json.appreciate[i].big + "\" class=\"apic\"><img class=\"noload\" src=\"" + json.appreciate[i].small + "\" _src=\"" + json.appreciate[i].small + "\" alt=\"" + json.appreciate[i].alt + "\"></a></li>";

                // if (i % 12 == 0 || (i + 1) == json.appreciate.length){
                if (i % 12 == 0 && i != 0 && (i + 1) == json.appreciate.length) {
                    temp_art_img += "</ul><ul>";
                }
            }
            temp_art_img += "</ul>";
            //console.log(temp_art_img);
            $("#art_img_list").html(temp_art_img);


            var temp_visible_img = "";
            for (var i = 0; i < json.visible.length; i++) {
                if (i % 2 == 0) {
                    temp_visible_img += "<li>";
                }

                temp_visible_img += "<a rel=\"group2\" class=\"apic\" href=\"" + json.visible[i].big + "\"><img class=\"lazy\" src=\"" + json.visible[i].small + "\" alt=\"" + json.visible[i].alt + "\"></a>";

                if (i % 2 == 1) {
                    temp_visible_img += "</li>";
                }
            }

            if (document.getElementById("neishi") != null) {
                $("#neishi ul").html(temp_visible_img);
                getShowImg("neishi");
            }
            if (document.getElementById("waiguan") != null) {
                $("#waiguan ul").html(temp_visible_img);
                getShowImg("waiguan");
            }

            // if (isMobile == false) {
            //     jQuery(".slideBox2").slide({
            //         mainCell: ".bd",
            //         titCell: ".hd ul",
            //         effect: "left",
            //         autoPlay: true,
            //         autoPage: "<li></li>",
            //         switchLoad: "_src",
            //         delayTime: 500,
            //         interTime: 5000,
            //         startFun: function (i, c) {
            //             $(".slideBox2 .bd ul").eq(i).find("img").removeClass("noload");
            //         },
            //         scroll: 1,
            //         vis: "auto"
            //     });
            // }
            // if (isMobile == true) {
            //     TouchSlide({
            //         slideCell: "#slideBox2",
            //         titCell: ".hd ul",
            //         mainCell: ".bd",
            //         effect: "left",
            //         switchLoad: "_src",
            //         // prevCell:".ico_left",
            //         // nextCell:".ico_right",
            //         autoPlay: true,
            //         autoPage: "<li></li>",
            //         delayTime: 500,
            //         interTime: 5000,
            //         startFun: function (i, c) {
            //             $(".slideBox2 .bd ul").eq(i).find("img").removeClass("noload");
            //         }
            //     });
            // }
        });
    };
    //加载车型鉴赏图片
    CarArtImgs();

    //首页焦点图
    function IndexFocusImg() {
        var url = "ashx/index.ashx?r=" + Math.random();
        $.getJSON(url, function (json) {
            var temp_index = "";
            var temp_index_act = "";

            for (var i = 0; i < json.data.length; i++) {
                temp_index += "<li>";
                temp_index += "<a data-pc=\"" + json.data[i].url + "\" data-mobile=\"" + json.data[i].mobileURL + "\" target=\"_blank\" class=\"item_img\" style=\"cursor:pointer\">";
                temp_index += "<span class=\"img\" style=\"background-image: url(" + json.data[i].big + ");\"></span>";
                temp_index += "<img src=\"" + json.data[i].big + "\">";
                temp_index += "</a>";
                temp_index += "<a data-pc=\"" + json.data[i].url + "\" data-mobile=\"" + json.data[i].mobileURL + "\" target=\"_blank\" class=\"item_text\" style=\"cursor:pointer\"><span><strong><!--" + json.data[i].alt + "--></strong><br>";
                temp_index += " <em>";//2016宝骏560
                temp_index += "<!--<img src=\"images/bg_hmkv_arrow.png\">--></em></span></a>";
                temp_index += "</li>";
            }
            for (var i = 0; i < json.dataAct.length; i++) {
                //
                temp_index_act += "<li><a data-pc=\"" + json.dataAct[i].url + "\" data-mobile=\"" + json.dataAct[i].mobileURL + "\" target=\"_blank\" style=\"cursor:pointer\"><img src=\"" + json.dataAct[i].big + "\"></a></li>";
            }



            $("#focus_img").html(temp_index);
            $("#act_imglist ul").html(temp_index_act);
            $("#act_imglist2 ul").html(temp_index_act);
            if (isMobile == false) {
                jQuery("#homeKv").slide({
                    mainCell: ".bd ul",
                    titCell: ".hd ul",
                    effect: "left",
                    autoPlay: true,
                    autoPage: "<li></li>",
                    interTime: 3000,
                    vis: "auto"
                });
            }
            if (isMobile == true) {
                TouchSlide({
                    slideCell: "#homeKv",
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    effect: "left",
                    autoPlay: true,
                    autoPage: true,
                    delayTime: 500,
                    interTime: 3000
                });
            }

            TouchSlide({
                slideCell: "#act_imglist2",
                titCell: ".hd ul",
                mainCell: ".bd ul",
                effect: "left",
                autoPlay: true,
                autoPage: true,
                delayTime: 500,
                interTime: 3000
            });
            nagivator("#focus_img a");
            nagivator("#act_imglist a");
            nagivator("#act_imglist2 a");
        });
    }
    if (document.getElementById("focus_img") != null) {
        //加载首页轮播图
        IndexFocusImg();
    }

    //车型页活动
    function CarPageAct() {
        var myCarName = CarNameFromPage();

        if (myCarName != "") {
            var myPageName = pageTitle().split('.')[0];

            $.getJSON("ashx/carPageAct.ashx", function (data) {
                for (var i = 0; i < data.cars.length; i++) {
                    if (data.cars[i].page == myPageName) {
                        $(".popup_box .views img").attr("src", data.cars[i].bigImg);
                        $(".popup_box .views a").attr("href", data.cars[i].url).attr("target", "_blank");
                        $(".right_pop .views img").attr("src", data.cars[i].smallImg);
                        $(".right_pop .views a").attr("href", data.cars[i].url).attr("target", "_blank");
                        $(".mobile_pop .view img").attr("src", data.cars[i].mobileImg);
                        $(".mobile_pop .view a").attr("href", data.cars[i].mobileUrl).attr("target", "_blank");
                        // $(".popup_box").css("display", "block");
                        $(".popup_box").css({ "zIndex": "9999", "opacity": "1" });
                        $(".right_pop").css({ "zIndex": "9999", "opacity": "1" });
                        $(".mobile_pop").css({ "zIndex": "9999", "opacity": "1" });
                        if ($(window).width() < 768) {
                            $("html,body").css({ "height": "100%", "overflow": "hidden" });
                            $(".mobile_pop .mobile_close").on("click", function () {
                                $("html,body").css({ "height": "", "overflow": "" });
                            });
                        }
                    }
                    // if (data.cars[i].page != myPageName) {
                    //     $(".popup_box").css("display", "none");
                    //     $(".right_pop").css("display", "none");
                    //     $(".mobile_pop").css("display", "none");
                    // }
                }
            });
        }
    }
    CarPageAct();
});

function nagivator(btn) {
    $(btn).on("click", function () {
        var _url;
        if (isMobile == true) {
            _url = $(this).attr("data-mobile");
        }
        if (isMobile == false) {
            _url = $(this).attr("data-pc");
        }
        var _type = $(this).attr("target");
        if (_type == "_blank") {
            window.open(_url);
            return;
        }
        window.location.href = _url;
    });
}

var player;

//优酷视频播放
function loadVideoPlayer(myplayer, vid) {
    //alert(myplayer + ", " + vid);
    player = new YKU.Player(myplayer, {
        client_id: '4dbfb57810c50123',       //此次API合作分配给客户的client_id，不可修改
        vid: vid,
        autoplay: false,                     //是否自动播放视频，是为true,否为false
        show_related: false,                 //播放完成是否显示相关视频
        events: {
            onPlayerReady: function () { /*your code*/ },
            onPlayStart: function () { /*your code*/ },
            onPlayEnd: function () { /*your code*/ }
        }
    });
}

function playVideo() {
    player.playVideo();
}
function pauseVideo() {
    player.pauseVideo();
}
function seekTo(s) {
    player.seekTo(s);
}
function currentTime() {
    return player.currentTime();
}