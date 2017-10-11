/**
 * Created by Administrator on 2017/4/25.
 */
    window.onload = function () {
        //获取对象
        var js_slider = $("js_slider");   //最大的盒子
        var slider_main_block = $("slider_main_block");
        var imgs = slider_main_block.children;
        var slider_ctrl = $("slider_ctrl");
        var arrow_r = $("arrow-r");
        var arrow_l = $("arrow-l");
        //操作对象
        //遍历slider-ctrl-con
        for (var i= 0;i <imgs.length ;i++){
            var span = document.createElement("span");
            span.className = "slider-ctrl-con";
            span.innerHTML = imgs.length - i;
            slider_ctrl.insertBefore(span,slider_ctrl.children[1])
        }
        var spans = slider_ctrl.children;
        spans[1].setAttribute("class","slider-ctrl-con current")
        //  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
        var scrollwidth = js_slider.offsetWidth;
        for (var i= 1;i <imgs.length;i++){
            imgs[i].style.left = scrollwidth + "px";
        }
        //遍历三个按钮
        var iNow =0;  //控制图片播放
        for (var k in spans){
            spans[k].onclick = function () {
                if (this.className == "slider-ctrl-prev") {
                    animate(imgs[iNow],{left:scrollwidth});
                    --iNow < 0 ? iNow =imgs.length-1 : iNow;
                    imgs[iNow].style.left = -scrollwidth + "px";
                    animate(imgs[iNow],{left:0});
                    setSqure()
                } else if (this.className == "slider-ctrl-next") {
                    autoplay();
                } else {
                    var that = this.innerHTML - 1;
                    if (that > iNow){
                        animate(imgs[iNow],{left: -scrollwidth});
                        imgs[that].style.left = scrollwidth + "px";
                    }else if (that < iNow){
                        animate(imgs[iNow],{left:scrollwidth});
                        imgs[that].style.left = -scrollwidth + "px";
                    }
                    iNow = that;
                    animate(imgs[iNow],{left:0});
                    setSqure()

                }
            }
        }
        function setSqure(){
            for (var i =1;i < spans.length-1;i++){
                spans[i].className = "slider-ctrl-con";
            }
            spans[iNow+1].className = "slider-ctrl-con current";
        }
        var timer =null;
        timer = setInterval(autoplay,2000);
        function autoplay(){
            animate(imgs[iNow],{left:-scrollwidth});
            ++iNow > imgs.length -1 ? iNow = 0: iNow;
            imgs[iNow].style.left = scrollwidth + "px";
            animate(imgs[iNow],{left:0});
            setSqure()
        }
        js_slider.onmouseover = function(){
            clearInterval(timer);
            show(arrow_l);
            show(arrow_r);
        }
        js_slider.onmouseout = function(){
            clearInterval(timer);
            timer = setInterval(autoplay,2000);
            hide(arrow_l);
            hide(arrow_r);
        }
    }