function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11  
  } else {
    return -1; //不是ie浏览器
  }
}
var isIE = IEVersion()
console.log('isIE: ', isIE)

// 对IE10做特殊处理
if (isIE === 10) {
  var script = document.createElement('script');
  script.src = '/static/IE/IE10/ie10.js'
  document.getElementsByTagName('head')[0].appendChild(script)
}

function getBrowserInfo() {
  var Sys = {}
  var ua = navigator.userAgent.toLowerCase()
  var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
  var m = ua.match(re)
  if (m) {
    Sys.browser = m[1].replace(/version/, "'safari")
    Sys.ver = m[2]
  }
  return Sys
}
var sys = getBrowserInfo()
console.log('browser: ', sys.browser)
console.log('version: ', sys.ver)
try {
  window.addEventListener('DOMContentLoaded', function () {
    try {
      if (isIE && isIE !== -1) {
        document.documentElement.classList.add('ie' + isIE)
      }
      document.documentElement.classList.add(sys.browser)
    } catch (err) {
      console.log('err: ', err)
    }
  })
} catch (err) {
  console.log('err: ', err);
}