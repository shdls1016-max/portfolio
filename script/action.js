/* html에서 script를 html최하단이 아닌 곳에 연결했을때 사용(ready()) */
$(document).ready(function(){
    
$('.mini').mouseover(function(){
    $(this).addClass('on')
})
$('.mini').mouseout(function(){
    $(this).removeClass('on')
})

$('.mini').hover(function(){
    if($(this).hasClass('dong')){
        $('#webmain').css('background-image','url(/images/web1.jpg)');
    }
    if($(this).hasClass('book')){
        $('#webmain').css('background-image','url(/images/web2.jpg)');
    }
    if($(this).hasClass('dl')){
        $('#webmain').css('background-image','url(/images/web3.jpg)');
    }
    if($(this).hasClass('dive')){
        $('#webmain').css('background-image','url(/images/web4.jpg)');
    }
},
function(){   //마우스 아웃시 원래이미지로
    $('#webmain').css('background-image','url(/images/web1.jpg)');
}
);
});



