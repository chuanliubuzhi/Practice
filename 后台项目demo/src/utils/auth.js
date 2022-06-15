import Cookies from 'js-cookie'

const TokenKey = 'accessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//记录店铺
const siteId = 'site_id'

export function getSite() {
  return Cookies.get(siteId)
}

export function setSite(id) {
  return Cookies.set(siteId, id)
}

export function removeSite() {
  return Cookies.remove(siteId)
}

//记录店铺过期时间
const expires = 'expires'

export function getExpires() {
  return Cookies.get(expires)
}

export function setExpires(time) {
  return Cookies.set(expires, time)
}

export function removeExpires() {
  return Cookies.remove(expires)
}



// 下载图片 传参：图片地址，触发点击事件的位置，图片的显示位置
//创建画布
export function convertImageToCanvas(URL, place, append) {
  //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  var Img = new Image(),
    dataURL = '';
  Img.crossOrigin = '*';
  Img.src = URL;
  Img.onload = function() { //要先确保图片完整获取到，这是个异步事件
    //        创建一个画布
    var canvas = document.createElement("canvas");
    //        设置画布的宽高
    canvas.width = Img.width;
    canvas.height = Img.height;
    //        绘出图片
    canvas.getContext("2d").drawImage(Img, 0, 0);
    //        给图片添加属性
    canvas.setAttribute('title', 'canvas');
    //        把图片渲染出来
    if (append) {
      append.appendChild(canvas);
    }
    // Failed to execute 'toDataURL' on 'HTMLCanvasElement' : Tainted canvases may not be exported  报这错是因为跨域
    dataURL = canvas.toDataURL('image/png'); //转换图片为dataURL

    // 生成一个a元素
    var a = place;
    // place.appendChild(a);

    // 创建一个单击事件
    var e = new MouseEvent('click')
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || '点餐码'
    // 将生成的URL设置为a.href属性
    a.href = dataURL;
    
    // 触发a的单击事件
    // a.dispatchEvent(e);
    return canvas;
  }
}


