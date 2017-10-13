/**
 * Created by Administrator on 2017/7/6.
 */
$(function(){
    //根据屏幕的大小变化决定轮播图的大小
    function resize (){
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        $('#main_carousel > .carousel-inner > .item').each(function(i,item){
            var $item = $(item);//将得到的DOM对象转换成jQuery对象
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            $item.css('backgroundImage','url("'+imgSrc+'")');//url("img/...")
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="" />')
            }else {
                $item.empty();
            }
        });
    }

    $(window).on('resize',resize).trigger('resize');
    //tooltips工具
    $('[data-toggle="tooltip"]').tooltip()
    // 计算横向滚动条宽度
    var $ulWapper = $('.nav-tabs');
    // console.log($ulWapper.children())
    var width = 0;
    $ulWapper.children().each(function(i, el) {
        width += el.clientWidth;
    })
    if (width > $(window).width()) {
        $ulWapper
        .css("width",width)
        .parent().css("overflow-x","scroll");
        
    };
    //新闻模块点击切换标题
    var $newsName = $(".newsname");
    $(".nav-stacked li a").on("click",function(){
        var $this = $(this);
        // console.log(".nav-stacked li a");
        $newsName.text($this.data("title"));
    })
    //修复移动端轮播图触摸滚动的问题
    //1.获取touchstar的clientX坐标
    //2.利用元素更新获取touchmove的clientX坐标
    //3.比大小，判断方向通过.carousel('prev').carousel('next')控制轮播图方向
    var $carousels = $(".carousel");
    var startX,endX;
    var offsetX = 50;
    $carousels.on("touchstart",function(e){
        startX = e.originalEvent.targetTouches[0].clientX;
        // console.log(e.originalEvent.targetTouches[0].clientX);
    })
    $carousels.on("touchmove",function(e){
        endX = e.originalEvent.targetTouches[0].clientX;
    })
    $carousels.on("touchend",function(e){
        var distance = Math.abs(startX-endX);
        if(distance > offsetX){
        // console.log(startX,endX,distance > offsetX)
            $(this).carousel( startX > endX ? "next":"prev" )
        }
    })

})