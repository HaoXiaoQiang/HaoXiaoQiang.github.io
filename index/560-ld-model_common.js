function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

var dragBar = function (btn, bar, callback) {
  this.btn = document.getElementById(btn);
  this.bar = document.getElementById(bar);
  //this.title = document.getElementById(title);
  this.step = this.bar.getElementsByTagName("DIV")[0];
  this.callback = callback;
  this.init();
};

dragBar.prototype = {
  init: function () {
    var f = this, g = document, b = window, m = Math, isDown = false;

    if(IsPC()){
      f.btn.onmousedown = function (e) {
        var x = (e || b.event).clientX;
        var l = this.offsetLeft;
        var max = f.bar.offsetWidth - this.offsetWidth;
        g.onmousemove = function (e) {
          var thisX = (e || b.event).clientX;
          var to = m.min(max, m.max(-2, l + (thisX - x)));
          f.btn.style.left = to + 'px';
          f.ondrag(m.round(m.max(0, to / max) * 100), to);
          b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
        };
        g.onmouseup = new Function('this.onmousemove=null');
      };
    }else{
      f.btn.addEventListener("touchstart", function(e){
        var x = (e.touches[0] || b.event.touches[0]).clientX;
        isDown = true;

        var l = this.offsetLeft;
        var max = f.bar.offsetWidth - this.offsetWidth;
        g.addEventListener("touchmove", function(e){
          if(!isDown) return false;
          var thisX = (e.touches[0] || b.event.touches[0]).clientX;
          var to = m.min(max, m.max(-2, l + (thisX - x)));


          f.btn.style.left = to + 'px';
          f.ondrag(m.round(m.max(0, to / max) * 100), to);
          b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
        });
        g.addEventListener("touchend", function(){
          isDown = false;
          //g.removeEventListener("touchmove", this)
          //$(document).off("touchmove")
        })
        //g.ontouchend = new Function('this.onmousemove=null');
      })


      f.btn.ontouchstart = function (e) {

      };
    }
  },
  ondrag: function (pos, x) {
    this.step.style.width = Math.max(0, x) + 'px';
    //this.title.innerHTML = pos / 10 + '';
    if(this.callback){
      this.callback(pos, x);
    }
  }
}

function jingyin(){
  var zhen = $(".jingyin .zhen");
  var si;
  var i = 0;
  var _time = 0;
  $(".jingyin .btn").on("click", function(){
    // $(".jingyin .btn").off("click");
    if($(".jingyin").hasClass("on")){
      clearInterval(si);
      $(".jingyin").removeClass("on");
      $(".jingyin .pan").hide();
      $(".jingyin .sound").hide();
      $(".jingyin .val").text("0");
      zhen.removeClass("on");
      si = null;
      i = 0;
      return;
    }
    $(".jingyin").addClass("on");
    $(".jingyin .pan").show();
    $(".jingyin .sound").show();
    if(_time == 0){
      $(".jingyin .sound .sd1").css("left", "100%");
      loopSlide("#jingyinSound", 12);
      _time += 1;
    }
    setTimeout(function(){
      zhen.addClass("on");
    }, 200);
    si = setInterval(function(){
      i++;
      $(".jingyin .val").text(i + "0");
      if(i>=4){
        clearInterval(si);

      }
    }, 600)
  });
}

function jingyinOut(){
  var _val = Math.floor(Math.random()*10) + 80;
  $(".jingyin .out span").text(_val);
  setTimeout(jingyinOut, 500);
}

function carStart() {
  var mc = $(".daohang .car");
  TweenMax.to(mc, 1, {"left":-30, yoyo:true, repeat:-1})
}

carStart();

function carStop(){
  var mc = $(".daohang .car");
  TweenMax.to(mc, 1, {"left":0})
}

function daohang730(){
  var zhen = $(".daohang .zhen");

  $(".daohang .btn1").on("click", function(){
    $(".zhen").removeClass("zhen1").addClass("zhen2");
    $(this).addClass("on").siblings(".btn2").removeClass("on");
    carStop()
  })
  $(".daohang .btn2").on("click", function(){
    $(".zhen").removeClass("zhen2").addClass("zhen1")
    $(this).addClass("on").siblings(".btn1").removeClass("on");
    carStart();
  })
}

function setSacle(obj, wrap, w){
  var _obj = $(obj),
    _wrap = $(wrap);

  var _scale = _wrap.width()/w;
  _obj.css({
    "-webkit-transform": "scale("+ _scale +")",
    "-moz-transform": "scale("+ _scale +")",
    "-ms-transform": "scale("+ _scale +")",
    "-o-transform": "scale("+ _scale +")",
    "transform": "scale("+ _scale +")"
  })
}

function inView(obj, callback){
  var _obj = $(obj);
  var oTop;
  var inFirst = true;
  win.scroll(function(){
    oTop = _obj.offset().top;
    if(win.scrollTop()> oTop-win.height()){
      if(inFirst){
        inFirst = false;

        callback();
      }
    }
  })
}

function goLeft(obj){
  var _obj = $(obj),
    fla = _obj.find(".fla");
  TweenMax.fromTo(fla, 1.2, {left:"100%"}, {left:"50%"});
}

function goLeft2(obj){
  var _obj = $(obj),
    fla = _obj.find(".fla");
  TweenMax.fromTo(fla, 1.2, {left:"50%"}, {left:"0%"});
}

function carLength(){
  TweenMax.fromTo($(".car_length .car"), .8, {left:"-100%"}, {left:"0%"});

  TweenMax.fromTo($(".car_length .line .t"), .8, {opacity:"0"}, {opacity:"1",delay: .8});
  TweenMax.fromTo($(".car_length .line span"), .8, {width:"0"}, {width:"100%",delay: 1});
}

function eps(){
  var si;
  var item = $(".eps .ani li");
  var cur = 0;
  si = setInterval(function(){
    if(cur>=item.length) clearInterval(si);
    item.eq(cur).stop(false, true).fadeIn()
    cur++;
  }, 800);
}

function loopSlide(obj, duration, x){
  var _duration = duration || 2;
  if(x){
    _x = "100%"
  }else{
    _x = "-100%"
  }

  var _obj = $(obj),
    lp0 = _obj.find(".lp0");
  lp1 = _obj.find(".lp1");
  lp2 = _obj.find(".lp2");


  tween = TweenMax.to(lp1, _duration, {"left":_x, ease:Linear.easeNone, repeat: -1});
  TweenMax.to(lp2, _duration, {left:_x, ease:Linear.easeNone, delay:0, repeat: -1});
  tween.seek(_duration/2);
}

// 百度地图API功能
if($("#allmap").length > 0){
  var map = new BMap.Map("allmap");    // 创建Map实例
  map.centerAndZoom(new BMap.Point(113.312213, 23.147267), 11);  // 初始化地图,设置中心点坐标和地图级别
  map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

if($("#allmapLd").length > 0){
  var map2 = new BMap.Map("allmapLd");    // 创建Map实例
  map2.centerAndZoom(new BMap.Point(113.312213, 23.147267), 11);  // 初始化地图,设置中心点坐标和地图级别
  map2.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  map2.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
  map2.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

var win = $(window);
var _swiper3 = null;
var _swiper5 = null;
var _swiper4 = null;
var _swiperLd4 = null;
var _carL = null;

win.scroll(function(){
  var _intro = $(".detail .intro");
  var _img = $(".detail .img");
  // var _showImg = $(".show_img");
  _img.each(function(){
    var _this = $(this);
    // console.log(_this);
    if(win.scrollTop()+win.height() > _this.offset().top &&  win.scrollTop() <  _this.offset().top ){
      _this.addClass("on");
      if(_this[0].id == "jingyin"){
        setSacle(".jingyin .pan", ".jingyin", 1085);
        setSacle(".jingyin .out", ".jingyin", 1085);
      }
      if(_this[0].id == "daohang"){
        setSacle(".daohang .pan", ".daohang", 650);
        setSacle(".daohang .btn_box", ".daohang", 650);
      }
      if(_this[0].id == "carview"){
        setSacle(".carview .infla", ".carview", 647);
      }
      if(_this[0].id == "car_length" && _carL == null){
        setSacle(".car_length .line", ".car_length", 472);
        carLength();
        _carL = 1;
      }
      if(_this[0].id == "eps"){
        eps();
      }
      if(_this[0].id == "xinglixiang" && _swiper3 == null){
        if(isMobile == false){
          _swiper3 = jQuery(".slideBox3").slide({
            mainCell:".bd ul",
            titCell:".hd ul",
            effect:"left",
            autoPlay:true,
            autoPage:"<li></li>",
            interTime:3000,
            scroll:1,
            vis:"auto"
          });
        }
        if(isMobile == true){
          TouchSlide({
            slideCell:"#slideBox3",
            titCell:".hd ul",
            mainCell:".bd ul",
            effect:"left",
            // prevCell:".ico_left",
            // nextCell:".ico_right",
            autoPlay:true,
            autoPage:true,
            delayTime:500,
            interTime:3000,
            startFun:function(){
              _swiper3 = 1;
            },
            scroll:1,
            vis:"auto"
          });
        }
      }
      if(_this[0].id == "kongjian_swiper" && _swiper5 == null){
        //console.log(_this[0].id);
        if(isMobile == false){
          _swiper5 = jQuery(".slideBox5").slide({
            mainCell:".bd ul",
            titCell:".hd ul",
            effect:"left",
            autoPlay:true,
            autoPage:"<li></li>",
            interTime:3000,
            scroll:1,
            vis:"auto"
          });
        }
        if(isMobile == true){
          TouchSlide({
            slideCell:"#slideBox5",
            titCell:".hd ul",
            mainCell:".bd ul",
            effect:"left",
            // prevCell:".ico_left",
            // nextCell:".ico_right",
            autoPlay:true,
            autoPage:true,
            delayTime:500,
            interTime:3000,
            startFun:function(){
              _swiper5 = 1;
            },
            scroll:1,
            vis:"auto"
          });
        }
      }
      if(_this[0].id == "xinglixiangLd" && _swiper4 == null){
        if(isMobile == false){
          _swiper4 = jQuery(".slideBoxLd3").slide({
            mainCell:".bd ul",
            titCell:".hd ul",
            effect:"left",
            autoPlay:true,
            autoPage:"<li></li>",
            interTime:3000,
            scroll:1,
            vis:"auto"
          });
        }
        if(isMobile == true){
          TouchSlide({
            slideCell:"#slideBoxLd3",
            titCell:".hd ul",
            mainCell:".bd ul",
            effect:"left",
            // prevCell:".ico_left",
            // nextCell:".ico_right",
            autoPlay:true,
            autoPage:true,
            delayTime:500,
            interTime:3000,
            startFun:function(){
              _swiper4 = 1;
            },
            scroll:1,
            vis:"auto"
          });
        }
      }
      if(_this[0].id == "xinglixiangLd4" && _swiperLd4 == null){
        if(isMobile == false){
          _swiperLd4 = jQuery(".slideBoxLd4").slide({
            mainCell:".bd ul",
            titCell:".hd ul",
            effect:"left",
            autoPlay:true,
            autoPage:"<li></li>",
            interTime:3000,
            scroll:1,
            vis:"auto"
          });
        }
        if(isMobile == true){
          TouchSlide({
            slideCell:"#slideBoxLd4",
            titCell:".hd ul",
            mainCell:".bd ul",
            effect:"left",
            // prevCell:".ico_left",
            // nextCell:".ico_right",
            autoPlay:true,
            autoPage:true,
            delayTime:500,
            interTime:3000,
            startFun:function(){
              _swiperLd4 = 1;
            },
            scroll:1,
            vis:"auto"
          });
        }
      }
    }
    // if( _this = $(".intro.intro_left.on") ){
    //     setSacle(".jingyin .pan", ".jingyin", 1085);
    // }
  });
  _intro.each(function(){
    var _this = $(this);
    // console.log(_this);
    if(win.scrollTop()+win.height() > _this.offset().top &&  win.scrollTop() <  _this.offset().top ){
      _this.addClass("on");
    }
  });
  // _showImg.each(function(){
  // var _this = $(this);
  // if(win.scrollTop() - win.height() < _showImg.offset().top){
  //     pScroll.tinyscrollbar_update();
  // }
  // });
  // console.log($(".parameter").offset().top+" "+($(window).scrollTop()+$(window).height()));
  if($(".parameter").length > 0){
    if(($(window).scrollTop()+$(window).height()+400) > $(".parameter").offset().top){
      $(".parameter .client:visible .item.on img.noload").each(function(){
        $(this).attr("src", $(this).attr("data-original"));
        $(this).removeClass("noload");
      });
    }
  }

});

$(".detail .btn_more a").click(function(){
  var _this = $(this);
  if(_this.parents(".part").hasClass("on")){
    // console.log(1);
    _this.parents(".part").removeClass("on");
    _this.text("展开详细 >");
    return;
  }
  var lastTop = _this.parents(".part").offset().top;
  // console.log(lastTop);
  var tTop = $(window).scrollTop();
  $(".part").removeClass("on");
  $(".part .btn_more a").text("展开详细 >");
  _this.text("收起详细 >");
  // console.log(_this.parents(".part").offset().top);
  $(window).scrollTop(tTop - lastTop + _this.parents(".part").offset().top)
  $("html,body").animate({"scrollTop":_this.parents(".part").offset().top}, 500, function(){
    _this.parents(".part").addClass("on");
  });
});

$(".item").each(function(){
  // console.log($(this).hasClass("item_show"));
  if($(this).hasClass("item_show")){
    return;
  }
  // $(this).addClass("direction"+(Math.floor(Math.random()*3)+1));
  $(this).addClass("direction");
});

$(".whole_left ul li").click(function(){
  curLi = $(this);
  var _text = "";
  $(".rotation.sel_cur").removeClass("sel_cur");
  $(".rotation").eq($(".whole_left ul li").index(curLi)).addClass("sel_cur");
  _text = curLi.find(".txt").text();
  $(".whole_left .name").text(_text);
  $(".whole_left ul li.on").removeClass("on");
  curLi.addClass("on");
});

if(win.width() > 767){
  $(".whole_left .txt").each(function(){
    var _this = $(this);
    _this.css("margin-left", "-" + _this.width()/2 + "px");
  });
}

var showImgArray = [
  // "images/310/0814/img_1.jpg",
  "images/310/0814/img_2.jpg",
  "images/310/0814/img_3.jpg",
  "images/310/0814/img_4.jpg",
  "images/310/0814/img_5.jpg",
  "images/310/0814/img_6.jpg",
  "images/310/0814/img_7.jpg",
  "images/310/0814/img_8.jpg",
  "images/310/0814/img_9.jpg",
  "images/310/0814/img_10.jpg",
  "images/310/0814/img_11.jpg",
  "images/310/0814/img_12.jpg"
]

function getShowImg(box,imgArray){
  if(imgArray){
    var _html = "";
    for(var i=0;i<imgArray.length;i++){
      if(i%2 == 0){
        _html += '<li>';
      }
      _html += '<img class="lazy" src="'+imgArray[i]+'" alt="">';
      if(i%2 == 1 || i == imgArray.length){
        _html += '</li>';
      }
    }
    $("#"+box+" ul").html(_html);
  }

  var wWidth = 1085;
  if($(window).width() < 1085 && $(window).width() >= 768){
    wWidth = $("#"+box).parent().width();
  }
  if($(window).width() < 767){
    wWidth = $("#"+box).parent().width() * 0.9;
  }
  var _img = new Image();
  _img.src = $("#"+box+" ul img").eq(0).attr("src");
  _img.onload = function(){
    var _imgWidth = $("#"+box+" ul img").eq(0)[0].naturalWidth;
    var _imgHeight = $("#"+box+" ul img").eq(0)[0].naturalHeight;
    //console.log(_imgWidth,_imgHeight);
    var _proportion = _imgWidth / _imgHeight;
    var _width = Math.round(wWidth/3);
    var _item = $("#"+box+" ul li");
    var boxWidth = Math.ceil(_item.length)*_width;
    // $("#"+box+"").css({"height":Math.round((_width/_proportion)*2)+"px"});
    document.getElementById(box).style.cssText="height:"+Math.round((_width/_proportion)*2)+"px !important";
    $("#"+box+" ul").css({"width":boxWidth, "height":Math.round((_width/_proportion)*2)+"px"});

    $("#"+box+" ul li").width(_width);
    new dragBar(box+'btn', box+'bar', function(p,x){
      $("#"+box+" ul").css("left", "-" + p*(boxWidth-wWidth)/100 + "px");
    });
  }
}

function getShowImgg1(box,imgArray){
  if(imgArray){
    var _html = "";
    for(var i=0;i<imgArray.length;i++){
      if(i%2 == 0){
        _html += '<li>';
      }
      _html += '<img class="lazy" src="'+imgArray[i]+'" alt="">';
      if(i%2 == 1 || i == imgArray.length){
        _html += '</li>';
      }
    }
    $("#"+box+" ul").html(_html);
  }

  var wWidth = 1085;
  if($(window).width() < 1085 && $(window).width() >= 768){
    wWidth = $("#"+box).parent().width();
  }
  if($(window).width() < 767){
    wWidth = $("#"+box).parent().width() * 0.9;
  }
  var _proportion = 252 / 128;
  var _width = Math.round(wWidth/4);
  var _item = $("#"+box+" ul li:visible");
  var boxWidth = Math.ceil(_item.length)*_width;
  $(".model_detail .wall_list1 .item_default .drap_box .drap_scroll_bar").show();
  if(_item.length <= 4){
    $(".model_detail .wall_list1 .item_default .drap_box .drap_scroll_bar").hide();
    return
  }
  // $("#"+box+"").css({"height":Math.round((_width/_proportion)*2)+"px"});
  document.getElementById(box).style.cssText="height:"+(Math.round((_width/_proportion))+30)+"px !important";
  $("#"+box+" ul").css({"width":boxWidth, "height": (Math.round((_width/_proportion))+30)+"px"});

  $("#"+box+" ul li").width(_width);
  new dragBar(box+'btn', box+'bar', function(p,x){
    $("#"+box+" ul").css("left", "-" + p*(boxWidth-wWidth)/100 + "px");
  });
}

$(".parameter ul.tap li").on("click", function(){
  if($(this).hasClass("on")){
    return;
  }
  var _father = $(this).parents(".client");
  var _cur = $(this).index();
  _father.find("li").removeClass("on");
  $(this).addClass("on");
  _father.find(".item").removeClass("on");
  _father.find(".item").eq(_cur).addClass("on");
  _father.find(".item").eq(_cur).find("img.noload").each(function(){
    $(this).attr("src", $(this).attr("data-original"));
    $(this).removeClass("noload");
  });
});

$("body").on("click", ".show_img a.media_play", function(){
  var _url = $(this).attr("data-url");
  $(".video_box").show();
  $(".video_box").html('<video src="'+_url+'" controls autoplay></video><div class="btn_cancel"><a href="javascript:void(0);"></a></div>');
  html5media();
});

$("body").on("click", ".show_img .video_box .btn_cancel a", function(){
  $(".video_box").html("");
  $(".video_box").hide();
});
$(function () {
  // $('.menu-tab-560-ld a').click(function () {
  //   var i = $(this).attr('data-it');
  //   if(i==1){
  //     $('.car-560-model').hide();
  //     $('.car-560-ld-model').show();
  //   }else{
  //     $('.car-560-ld-model').hide();
  //     $('.car-560-model').show();
  //   }
  // });
  $('#BtnPicList').click(function () {
    $('#VideoContainer').hide();
    $('#PicList').show();
  });
  $('#BtnVideoContainer').click(function () {
    $('#PicList').hide();
    $('#VideoContainer').show();
  });
});