
jQuery(document).ready(function() {
        var topmenu = $(".header");
        var topmenu_top = topmenu.offset().top;
        reset_topmenu_top(topmenu, topmenu_top);
        jQuery(window).scroll(function() {
            reset_topmenu_top(topmenu, topmenu_top);
        });
    });
function reset_topmenu_top(topmenu, topmenu_top) {
    var document_scroll_top = jQuery(document).scrollTop();
    if (document_scroll_top > topmenu_top) {
        $(".header").addClass("small-header");
        $(".header").addClass("bg-tm");
        topmenu.css({'position':'fixed','top':'0px'});
            //topmenu.css({'border-style':'solid','border-width':'2px','border-color':'#000'})//控制边框
            //topmenu.css({'background':'rgba(0,0,0,.75)'})//控制背景
            //topmenu.css({'background':'filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#c8393939,endColorStr=i#c8393939)'})//控制背景
    }
    if (document_scroll_top <= topmenu_top) {
        topmenu.attr('style',{'top':topmenu_top+'px'});
        $(".header").removeClass("small-header");
        $(".header").removeClass("bg-tm");
//            topmenu.css({'background':'green'});//控制背景
    }
}


$(".friendly_swiper .swiper-button-prev").click(function(){
    var t=parseInt(-ah*link_index+ah*2)+'px';
    if(link_index>1){
        jQuery("#links_box").stop(true).animate({top:t},300);
        link_index--;
    }else{
        return
    }
});

/* 热门游戏 热门视频 切换*/
$(window).scroll( function() {
  var scrollValue=$(window).scrollTop();
  scrollValue > 150 ? $('.js-scroll').css({
    position: 'fixed',
    top: '50px'
  }):$('.js-scroll').css({
    position: 'relative',
    top: '0'
  })
} );
;(function(window, undefined){

    /*video页*/
    /*播放列表*/
    $(".v-list li").hover(function () {
        var $this=$(this);
        $this.find(".mask").stop().animate({"top":0},300);
        $this.find(".txt").stop().animate({"bottom":"30px"},300);
        $this.find(".play").show().addClass("rotateInFinite").next(".i-play").show()
    },function () {
        var $this=$(this);
        $this.find(".mask").stop().animate({"top":"198px"},300);
        $this.find(".txt").stop().animate({"bottom":0},300);
        $this.find(".play").hide().removeClass("rotateInFinite").next(".i-play").hide();
    });

    /*tab*/
   /* $("#tab-container").find(".tab:first-child").show().siblings().hide();
    $("#tab-nav li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#tab-container").find(".tab").eq(parseInt($(this).index())).fadeIn(500).siblings().hide();
        return false;
    })*/


    $("#dtab-container").find(".tab:first-child").show().siblings().hide();
    $("#dtab-nav li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#dtab-container").find(".tab").eq(parseInt($(this).index())).fadeIn(500).siblings().hide();
        return false;
    });


})(window);

