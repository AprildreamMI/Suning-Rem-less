$(function () {


    var $bannerBox=$(".banner");
    var $ulImg=$bannerBox.find("ul:first");
    var $points=$bannerBox.find("ul:last");

    var $pointsArr=$points.find("li");

    var width=$bannerBox.width();
    var index=1;

    var animateTransform=function () {
        $ulImg.animate({transform:"translateX("+(-index*width)+"px)"},200,function () {
            if (index >= 9) {
                index=1;
                $ulImg.css({transform:"translateX("+(-index*width)+"px)"});
            } else if (index <= 0) {
                index=8;
                $ulImg.css({transform:"translateX("+(-index*width)+"px)"});
            }
            console.log(index);
            $pointsArr.removeClass("now").eq(index-1).addClass("now");
        });
    }

    var timer=setInterval(function () {
        index++;
        animateTransform();
    },2000);


    var bindSwipeEvent=function (dom,leftFn,rightFn) {
        var start = 0;
        var move = 0;
        var distancex = 0;
        var bolMove = false;
        dom.addEventListener('touchstart', function (e) {
            /*开始触摸*/
            start = e.touches[0].clientX;
        });
        dom.addEventListener('touchmove', function (e) {
            /*触摸移动*/
            move = e.touches[0].clientX;
            distancex = move - start;
            bolMove = true;
        });
        dom.addEventListener('touchend', function (e) {

            /*触摸结束*/
            if (bolMove && Math.abs(distancex) > 50) {
                console.log(distancex);
                if (distancex > 0) {
                    /*右移*/
                    rightFn && rightFn.call(this, e)
                } else {
                    /*左移*/
                    leftFn && leftFn.call(this, e);
                }
            }

            start = 0;
            move = 0;
            distancex = 0;
            bolMove = false;
        });
    }

    var bannerBox=document.querySelector(".banner");
    bindSwipeEvent(bannerBox,function () {
        index++;
        animateTransform();
        console.log("下一张");
    },function () {
        index--;
        animateTransform();
        console.log("上一张");
    });


})