/* html에서 script를 html최하단이 아닌 곳에 연결했을때 사용(ready()) */
$(document).ready(function(){
    
    //나침반(.mini) hover시 길이 늘어나고 사이트명(.name)도 보이게
    $('.mini').mouseover(function(){
        $(this).addClass('on')
    })
    $('.mini').mouseout(function(){
        $(this).removeClass('on')
    })


    //나침반 hover 하면 배경목업 변경되게
    $('.mini').hover(function(){
        if($(this).hasClass('dong')){
            $('.webcapture').attr('src','images/dongkook.jpg' )
        }
        if($(this).hasClass('book')){
            $('.webcapture').attr('src','images/library.jpg' )
        }
        if($(this).hasClass('dl')){
            $('.webcapture').attr('src','images/dl.jpg')
        }
        if($(this).hasClass('dive')){
            $('.webcapture').attr('src','images/underwaterdive.jpg')
        }
    }


);

//webmain 목업 효과
    $('.notebook .monitor').on('mouseenter', function() {
        var $img = $(this).find('.webcapture');
        var monitorH = $(this).height();
        var imgH = $img.height();
        $img.css('top', -(imgH - monitorH) + 'px');
    }).on('mouseleave', function() {
        $(this).find('.webcapture').css('top', '0');
    });
    


//#home 애니메이션 
   var currentAngle = 0;
    var isReady = false;

    // 초기 5바퀴 회전 (1800도)
    $('.compass2').css({
        transition: 'transform 1.5s ease-in-out',
        transform: 'translateX(-50%) rotate(900deg)'
    });

    // 2초 후 마우스 반응 시작
    setTimeout(function() {
        currentAngle = 1800;
        isReady = true;
        $('.compass2').css('transition', 'none');
    }, 2000);

    $(document).on('mousemove', function(e) {
        if (!isReady) return;

        var $imgs = $('.homeImgs');
        var offset = $imgs.offset();
        var centerX = offset.left + $imgs.outerWidth() / 2;
        var centerY = offset.top + $imgs.outerHeight() / 2;

        var targetAngle = Math.atan2(e.pageY - centerY, e.pageX - centerX) * (180 / Math.PI) + 90;

        var diff = targetAngle - (currentAngle % 360);
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        currentAngle += diff;

        $('.compass2').css('transform', 'translateX(-50%) rotate(' + currentAngle + 'deg)');
    });



    // $(window).on('scroll', function() {
    //     var $repeatTop = $('#profile .repeatTop');
    //     var $profile = $('#profile');
    //     var profileTop = $profile.offset().top;
    //     var scrollTop = $(window).scrollTop();

    //     if (scrollTop >= profileTop) {
    //         if (!$repeatTop.hasClass('fixed')) {
    //             $repeatTop.addClass('fixed');
    //             $('#home .copy').hide();
    //         }
    //     } else {
    //         $repeatTop.removeClass('fixed');
    //     }
    // });












    

    
});



