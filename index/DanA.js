
(function () {
    var params = {};
    //Document对象数据
    if (document) {
        params.domain = document.domain || '';
        params.url = document.URL || '';
        params.title = document.title || '';
        params.referrer = document.referrer || '';        
    }
    //Window对象数据
    if (window && window.screen) {
        params.sh = window.screen.height || 0;
        params.sw = window.screen.width || 0;
        params.cd = window.screen.colorDepth || 0;
    }
    //navigator对象数据
    if (navigator) {
        params.lang = navigator.language || '';
    }

    //params.ts = new Date().getTime();

    //解析_maq配置
    if (_maq) {
        for (var i in _maq) {
            switch (_maq[i][0]) {
                case '_setAccount':
                    params.account = _maq[i][1];
                    break;
                default:
                    break;
            }
        }
    }

    var args = '';
    for (var i in params) {
        if (args != '') {
            args += '&';
        }
        args += i + '=' + encodeURIComponent(params[i]);
    }
     
    loadIframe = function (isStyle)
    {
        var doc = document;
        var ifr = document.createElement("iframe");
        ifr.src = "http://cm.aac-dmp.cn/cm?a=180&j302=1";
        ifr.height = 0;
        ifr.width = 0;
        if(isStyle)
            ifr.style = "display: none; visibility: hidden";
        doc.body.appendChild(ifr);
    }

    var img = new Image(1, 1);
    img.src = 'http://t.dandaas.com/dan.gif?' + args;
    img.onload=function()
    {
        console.log(img.readyState);
        if (img.readyState == "complete" || img.readyState == "loaded") {
            loadIframe(true);
        }
        else if(img.complete)
        {
            loadIframe(true);
        }
        else {
            try
            {
                img.onreadystatechange = loadIframe(false);
            }
            catch(ex)
            {}
        }
    }
    
})();
