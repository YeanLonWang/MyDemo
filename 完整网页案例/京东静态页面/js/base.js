/**
 * Created by Administrator on 2017/3/21.
 */
    window.onload = function () {
        //得到id函数
        function $(id){
            return document.getElementById(id);
        }
        //隐藏，显示函数
        function show(obj){
            obj.style.display = "block";
        }
        function hide(obj){
            obj.style.display = "none";
        }
        //关闭头部广告
        $("close_ad").onclick = function () {
            $("ad").style.display = "none";
        }
        //label标签与input对应
        $("txt").oninput = $("txt").onpropertychange = function () {
            if(this.value == ""){ $("lab").style.display = "block"; }
            else
            { $("lab").style.display = "none";}
        }
        //遍历news下的图标
        var iis = document.getElementById("asdf").getElementsByTagName("i");
        for (var a = 0 ; a < iis.length; a++){
            iis[a].style.backgroundPosition = "0 "+(-a*25)+"px";
        }
        //轮播图部分
          //1.遍历ol，克隆无缝滚动需要的最后一张图片
        var screensroll = $("screensroll");
        var screenul = screensroll.children[0].children[0];
        var screenullis = screenul.children;
        var pot = screensroll.children[1];
        var arrl = screensroll.children[2].children[0];
        var arrf = screensroll.children[2].children[1];
        pot.appendChild(document.createElement("ol"));
        screenul.appendChild(screenullis[0].cloneNode(true));
        var screenol = pot.children[0];
        screenol.className = "circle";
        for (var i =0 ;i < screenullis.length-1; i++){
            screenol.appendChild(document.createElement("li"));
            screenol.children[i].innerHTML = i+1;
        }
        var screenollis = screenol.children;
        screenollis[0].className = "current"
          //2.鼠标经过选择当前
        for (var i =0 ; i< screenollis.length;i++){
            screenollis[i].index = i;
            screenollis[i].onmouseover = function (){
                for( var j =0;j < screenollis.length ;j++){
                    screenollis[j].className = "";
                }
                this.className = "current";
                square = key = this.index;
                animate(screenul,-key*screenullis[0].offsetWidth,100)
            }
        }
          //3.匀速动画
        function animate(obj,target,speed){
            clearInterval(obj.timer);
            var lowspeed = obj.offsetLeft < target ? speed : (-speed);
            obj.timer = setInterval(function(){
                var juli = target - obj.offsetLeft;
                if (Math.abs(juli) <= Math.abs(lowspeed)){
                    obj.style.left = target + "px";
                    clearInterval(obj.timer);
                }else {
                    obj.style.left = obj.offsetLeft + lowspeed + "px";
                }
            },30)
        }
          //4.准备开始动画
        var timer = null;
        var key = 0 ;  // 控制图片播放张数
        var square =0;  //控制小点播放
        timer = setInterval(autoplay,5000);
        function autoplay(){
            key++;
            if(key > screenollis.length){
                screenul.style.left = 0 + "px";
                key = 1;
            }
            animate(screenul,-key*screenullis[0].offsetWidth,20)
            square++;
            if (square >= screenollis.length){
                square = 0;
            }
            for (var i = 0;i <screenollis.length; i++){
                screenollis[i].className = "";
            }
            screenollis[square].className = "current";
        }
        screensroll.onmouseover = function(){
            clearInterval(timer);
            show(arrl);
            show(arrf);
        }
        screensroll.onmouseout = function (){
            timer = setInterval(autoplay,5000);
            hide(arrl);
            hide(arrf);
        }
    }
