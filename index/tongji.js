
    //获取url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //返回当前页面的页面名称
    function pageTitle() {
        var link = window.location.href;
        var temp_page = link.substring(link.lastIndexOf('/'));
        temp_page = temp_page.replace('/', '').replace(temp_page.substring(temp_page.lastIndexOf('?')), '');

        return temp_page;
    }

    /* 自己的统计 begin */
    var pid = getQueryString("ProjectID");
    var mid = getQueryString("MediaID");
    LID = getQueryString("LID");
    if (pid == "undefined") { pid = 0; }
    if (mid == "undefined") { mid = 0; }
    if (LID == "undefined") { LID = 0; }
    if (pid != undefined && mid != undefined) {
    $.post("http://www.sgmw.com.cn/ashx/AddPV.aspx", { "ProjectID": pid, "MediaID": mid, "LID": LID }, function () { });
     }
    //var tjp = getQueryString("tjp");
    //var tjm = getQueryString("tjm");
    //var tjl = getQueryString("tjl");
    //if (pid == undefined && mid == undefined) {
    //    pid = getQueryString("aid");
    //    mid = getQueryString("fid");
    //}
    //if (tjp == "undefined") { tjp = 0; }
    //if (tjm == "undefined") { tjm = 0; }
    //if (tjl == "undefined") { tjl = 0; }

    //if (pid != undefined && mid != undefined) {
    //    $.post("http://www.sgmw.com.cn/ashx/pmcookie.aspx", { "pid": pid, "mid": mid, "tjp": tjp, "tjm": tjm, "tjl": tjl }, function () { });
    //}
    /* 自己的统计 end */


    /* CTR监测代码 begin */
    function ctr(url, aid, wid) {
        
        var s = document.createElement("script");
        s.src = "http://ad5.ctrmi.com/iadexCV/CVHandler.ashx?aid=" + aid + "&wid=" + wid + "&ns=" + encodeURIComponent(url) + "&r=" + Math.random() * 1000;
        document.body.appendChild(s);

        var t = document.createElement("script");
        t.src = "http://tj.autobaojun.com/handler/CtrPV.ashx?aid=" + aid + "&wid=" + wid + "&ns=" + encodeURIComponent(url) + "&r=" + Math.random() * 1000;
        document.body.appendChild(t);

        return true;
    }
    /* CTR监测代码 end */
  /* baidu begin */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?81bda7137c5ee1d480d8f9332e6769b9";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


