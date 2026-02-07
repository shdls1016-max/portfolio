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
        $('#webmain').css('background-image','url(images/web1.jpg)');
    }
    if($(this).hasClass('book')){
        $('#webmain').css('background-image','url(images/web2.jpg)');
    }
    if($(this).hasClass('dl')){
        $('#webmain').css('background-image','url(images/web3.jpg)');
    }
    if($(this).hasClass('dive')){
        $('#webmain').css('background-image','url(images/web4.jpg)');
    }
},
function(){   //마우스 아웃시 원래이미지로
    $('#webmain').css('background-image','url(images/web1.jpg)');
}
);
});



