/**
 * Created by Administrator on 2017/4/24.
 */
//id函数
function $(id){return document.getElementById(id)}
//获取样式函数
function getStyle(obj,attr){
    if (obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj,null)[attr];
    }
}
//多属性运动框架基本函数(带有px的，透明度，zIndex值,回调函数)
function animate(obj,json,fn){
    clearInterval(obj.timer)
    obj.timer= setInterval(function(){
        var flag = true;//判断是否到达目标位置
        for(var k in json){
            //得到当前位置
            var current = 0 ;
            if (k == "opacity")//判断是否有透明度值
            {
                current = Math.round(parseInt(getStyle(obj,k)*100)) ||0;
            }else
            {
                current = parseInt(getStyle(obj,k));
            }
            var step = (json[k] - current)/10;//步长
            step = step > 0 ?  Math.ceil(step):Math.floor(step);
            if (k == "opacity")
            {
                if ("opacity" in obj.style)    // 判断 我们浏览器是否支持opacity
                {
                    obj.style.opacity = (current + step)/100;
                }
                else{
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";
                }
            }else if (k == "zIndex")  //判断是否有index值
            {
                obj.style.zIndex = json[k] ;
            }else {
                obj.style[k] = current + step + "px";
            }
            if (current != json[k])
            {
                flag = false;
            }
        }
        if (flag)
        {
            clearInterval(obj.timer);
            if (fn)
            {
                fn();
            }
        }
    },10)
}