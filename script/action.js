/* html에서 script를 html최하단이 아닌 곳에 연결했을때 사용(ready()) */
$(document).ready(function(){
    
  /* ===============================
     fullpage 초기화
  =============================== */
  $('#fullpage').fullpage({
    anchors: ['tohome', 'toprofile', 'towebmain', 'toappmain'],

    afterLoad: function (anchorLink, index) {
      $('.nav li a').removeClass('present');
      $('.nav li').eq(index - 1).find('a').addClass('present');

      if (index === 1) {
        $('.nav').removeClass('bgbk');
        $('.copy').css('color', '');
      }

      if (index === 3) {
        $('.nav').addClass('bgbk');
        $('.copy').css('color', '#fff');

     // ⭐ webmain 도착 시 mini 나타남
    setTimeout(function() {
      $('.mini').addClass('show-mini');
    }, 50);
    
    // ⭐ 1초 후 현재 목업에 해당하는 mini에 active 추가
    setTimeout(function() {
      // currentMockup 변수 기준으로 active 추가
      if (currentMockup === 'dong') {
        $('.mini.dong').addClass('active');
      } else if (currentMockup === 'book') {
        $('.mini.book').addClass('active');
      } else if (currentMockup === 'dl') {
        $('.mini.dl').addClass('active');
      } else if (currentMockup === 'dive') {
        $('.mini.dive').addClass('active');
      }
    }, 1050);
  } 
},
  

    onLeave: function (index, nextIndex, direction) {
      if (index === 1 && nextIndex !== 1) {
        $('.homeImgs').addClass('active');
        $('.copy').addClass('active');
        $('.nav').addClass('active');
      }

      if (nextIndex === 1) {
        $('.copy').removeClass('active');
        $('.nav').removeClass('active');

        var delay = 250;
        if (index === 2) delay = 200;
        else if (index === 3) delay = 300;
        else if (index === 4) delay = 360;

        setTimeout(function () {
          $('.homeImgs').removeClass('active');
        }, delay);
      }

      if (index === 3 && nextIndex !== 3) {
        $('.nav').removeClass('bgbk');
        $('.copy').css('color', '');

        // 즉시 show-mini와 active 제거
      $('.mini').removeClass('show-mini active');
      }
    },
    // ⭐ 초기화 완료 후 클래스 추가
    afterRender: function() {
    $('body').addClass('fp-enabled');
    console.log('✅ fullpage 초기화 완료!');
    }
  });


  /* ===============================
     Swiper 초기화
  =============================== */
  const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      allowTouchMove: true
  });


  /* ===============================
     mini 클릭 → 슬라이드 이동
  =============================== */
  $('.mini').on('click', function (e) {
      e.preventDefault();

      const idx = $(this).index('.mini');
      $('body').addClass('websub-open');
      $('.mySwiper').fadeIn();
      $('.notebook').hide();

      swiper.slideToLoop(idx, 0);

      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setKeyboardScrolling(false);
  });


  /* ===============================
     슬라이드 버튼
  =============================== */
  $(document).on('click', '.btn a img[alt="오른쪽이동버튼"]', function (e) {
      e.preventDefault();
      swiper.slideNext();
  });

  $(document).on('click', '.btn a img[alt="왼쪽이동버튼"]', function (e) {
      e.preventDefault();
      swiper.slidePrev();
  });


  /* ===============================
     BACK 버튼 → 스와이퍼 닫기
  =============================== */
  $(document).on('click', '.swiper-slide figure a[href="#webmain"]', function (e) {
    e.preventDefault();

    $('.mySwiper').fadeOut();
    $('.notebook').fadeIn();

    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);

    $('body').removeClass('websub-open');
  });




/* ===================================
   routeyL/dentalR hover 및 클릭
=================================== */

// routeyL hover
$('.app2mockup .routeyL').on('mouseenter', function(){
  if(!$('.routeyL, .dentalR').hasClass('active')){
    $(this).addClass('hover');
  }
}).on('mouseleave', function(){
  $(this).removeClass('hover');
});

// dentalR hover
$('.app2mockup .dentalR').on('mouseenter', function(){
  if(!$('.routeyL, .dentalR').hasClass('active')){
    $(this).addClass('hover');
  }
}).on('mouseleave', function(){
  $(this).removeClass('hover');
});


/* ===================================
   목업 이미지 클릭 → appsub 이동
=================================== */

// routeyL 이미지 클릭
$('.app2mockup .routeyL > img').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  
  console.log('🔵 routey 이미지 클릭!');
  
  $('.routeyL, .dentalR').removeClass('active hover');
  
  $('#appsub').addClass('active');
  $('body').addClass('appsub-open');
  
  $('#indiApp').hide().removeClass('active');
  $('#teamApp').hide().removeClass('active');
  $('#teamApp li').removeClass('active');
  
  $('#teamApp').show().addClass('active');
  $('#partTable').addClass('active');
  
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
});

// dentalR 이미지 클릭
$('.app2mockup .dentalR > img').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  
  console.log('🟢 dental 이미지 클릭!');
  
  $('.routeyL, .dentalR').removeClass('active hover');
  
  $('#appsub').addClass('active');
  $('body').addClass('appsub-open');
  
  $('#teamApp').hide().removeClass('active');
  $('#teamApp li').removeClass('active');
  $('#indiApp').hide().removeClass('active');
  
  $('#indiApp').show().addClass('active');
  
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
});


/* ===================================
   닫기 버튼
=================================== */
$('.closeBtn').on('click', function(e){
  e.stopPropagation();
  $(this).closest('.routeyL, .dentalR').removeClass('active hover');
});


/* ===================================
   배경 클릭 시 닫기
=================================== */
$('#appmain').on('click', function(e){
  if(!$(e.target).closest('.app2mockup figure').length){
    $('.routeyL, .dentalR').removeClass('active hover');
  }
});


/* ===================================
   ESC 키로 닫기
=================================== */
$(document).on('keydown', function(e){
  if(e.key === 'Escape' && !$('body').hasClass('websub-open') && !$('body').hasClass('appsub-open')){
    $('.routeyL, .dentalR').removeClass('active hover');
  }
});






/* =========================
   TEAM PROJECT 내부 li 이동 (href 기반)
========================= */
$('#teamApp').on('click', '.teambtn a', function(e){
  e.preventDefault();
  
  const targetId = $(this).attr('href');
  
  // #appmain으로 가는 건 backToMain이 처리하니까 무시
  if(targetId === '#appmain') return;
  
  console.log('이동할 페이지:', targetId);
  
  // 모든 li 비활성화
  $('#teamApp li').removeClass('active');
  
  // 타겟 li 활성화
  $(targetId).addClass('active');
});


/* =========================
   partTable의 member 클릭 이동
========================= */
$('.part-header').on('click', '.member', function(e){
  e.preventDefault();
  
  const targetId = $(this).attr('href');
  
  console.log('멤버 클릭:', targetId);
  
  // 모든 li 비활성화
  $('#teamApp li').removeClass('active');
  
  // 타겟 li 활성화
  $(targetId).addClass('active');
});




/* =========================
   개별제작디자인의 member 클릭 이동  내가 위에꺼 복붙해서 수정한거라 문제생기면 여기보기
========================= */
$('.absoProfile').on('click', '.member', function(e){
  e.preventDefault();
  
  const targetId = $(this).attr('href');
  
  console.log('멤버 클릭:', targetId);
  
  // 모든 li 비활성화
  $('#teamApp li').removeClass('active');
  
  // 타겟 li 활성화
  $(targetId).addClass('active');
});



  /* =========================
     APP SUB → APP MAIN 복귀
  ========================= */
  $(document).on('click', '#appsub .backToMain', function(e){
    e.preventDefault();

    $('#appsub').removeClass('active');
    $('#appsub > *').removeClass('active');
    $('body').removeClass('appsub-open');

    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);

    $.fn.fullpage.moveTo('toappmain');
  });


  /* ===================================
     기존 action.js 코드
  =================================== */
  //나침반(.mini) hover시 길이 늘어나고 사이트명(.name)도 보이게
  $('.mini').mouseover(function(){
      $(this).addClass('on')
  })
  $('.mini').mouseout(function(){
      $(this).removeClass('on')
  })

   /* ===============================
     ⭐ 페이지 로드 시 초기 목업(dl) active
  =============================== */
  let currentMockup = 'dong';
  
$('.mini').hover(
      function() {
          const $this = $(this);
          
          // 모든 mini에서 active 제거
          $('.mini').removeClass('active');
          
          // 현재 mini에 active 추가
          $this.addClass('active');
          
          // 이미지 변경 + 초기화
          const $webcapture = $('.webcapture');
          
          if($this.hasClass('dong')){
              if (currentMockup !== 'dong') {
                  $webcapture.css('top', '0');
                  $webcapture.attr('src','images/dongkook.jpg');
                  currentMockup = 'dong';
              }
          }
          if($this.hasClass('book')){
              if (currentMockup !== 'book') {
                  $webcapture.css('top', '0');
                  $webcapture.attr('src','images/library.jpg');
                  currentMockup = 'book';
              }
          }
          if($this.hasClass('dl')){
              if (currentMockup !== 'dl') {
                  $webcapture.css('top', '0');
                  $webcapture.attr('src','images/dl.jpg');
                  currentMockup = 'dl';
              }
          }
          if($this.hasClass('dive')){
              if (currentMockup !== 'dive') {
                  $webcapture.css('top', '0');
                  $webcapture.attr('src','images/underwaterdive.jpg');
                  currentMockup = 'dive';
              }
          }
      }
  );


  /* ===============================
     목업 스크롤 효과
  =============================== */
  let isMonitorHovering = false;

  $('.notebook .monitor').on('mouseenter', function() {
      isMonitorHovering = true;
      
      const $img = $(this).find('.webcapture');
      const monitorH = $(this).height();
      
      $img.off('load').on('load', function() {
          if (isMonitorHovering) {
              const imgH = $(this).height();
              const scrollDistance = -(imgH - monitorH);
              
              $(this).css({
                  'transition': 'top 3s ease',
                  'top': scrollDistance + 'px'
              });
          }
      });
      
      if ($img[0].complete) {
          const imgH = $img.height();
          const scrollDistance = -(imgH - monitorH);
          
          $img.css({
              'transition': 'top 3s ease',
              'top': scrollDistance + 'px'
          });
      }
  });

  $('.notebook .monitor').on('mouseleave', function() {
      isMonitorHovering = false;
      
      const $img = $(this).find('.webcapture');
      $img.css({
          'transition': 'top 0.5s ease',
          'top': '0'
      });
  });


  //#home 애니메이션 
  var currentAngle = 0;
  var isReady = false;

  $('.compass2').css({
      transition: 'transform 1.5s ease-in-out',
      transform: 'translateX(-50%) rotate(900deg)'
  });

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


/* ===================================
   flowdesign 무한 스크롤 초기화
=================================== */
$(document).ready(function() {
  
  // 각 flowdesign 초기화
  $('.flowdesign').each(function() {
    const $flow = $(this);
    
    // 이미지 로드 완료 후 높이 계산
    $flow.find('img').on('load', function() {
      calculateScrollDistance($flow);
    });
    
    // 이미 로드된 경우 즉시 계산
    if ($flow.find('img')[0].complete) {
      calculateScrollDistance($flow);
    }
  });
  
  function calculateScrollDistance($flow) {
    const liCount = $flow.find('li').length / 2; // 원본 개수
    let totalHeight = 0;
    
    // 원본 li들의 높이만 합산
    $flow.find('li').slice(0, liCount).each(function() {
      totalHeight += $(this).outerHeight(true); // margin 포함
    });
    
    console.log($flow.attr('class'), 'totalHeight:', totalHeight);
    
    // CSS 변수로 저장
    $flow.css('--scroll-distance', `-${totalHeight}px`);
  }
  
});


/* ===================================
   designedPage 이미지 스크롤
=================================== */
$(document).ready(function() {
  
  $('.designedPage figure').each(function() {
    const $figure = $(this);
    const $img = $figure.find('img:first-child');
    let scrollPosition = 0;
    
    // 마우스 휠 이벤트
    $figure.on('wheel', function(e) {
      e.preventDefault();
      
      const delta = e.originalEvent.deltaY;
      const figureHeight = $figure.height();
      const imgHeight = $img.height();
      const maxScroll = imgHeight - figureHeight;
      
      // 스크롤 위치 계산
      scrollPosition += delta * 0.5; // 스크롤 속도 조절
      scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
      
      // 이미지 이동
      $img.css('transform', `translateY(-${scrollPosition}px)`);
    });
    
    // ⭐ 스크롤 위치 초기화 함수
    $figure.data('resetScroll', function() {
      scrollPosition = 0;
      $img.css('transform', 'translateY(0)');
    });
  });
  
});


/* ===================================
   ⭐ teamApp li 변경 시 스크롤 초기화
=================================== */
$('#teamApp').on('click', '.teambtn a, .member', function(e) {
  e.preventDefault();
  
  const targetId = $(this).attr('href');
  
  if(targetId === '#appmain') return;
  
  console.log('이동할 페이지:', targetId);
  
  // ⭐ 모든 designedPage 스크롤 초기화
  $('.designedPage figure').each(function() {
    const resetFn = $(this).data('resetScroll');
    if (resetFn) resetFn();
  });
  
  // 모든 li 비활성화
  $('#teamApp li').removeClass('active');
  
  // 타겟 li 활성화
  $(targetId).addClass('active');
});




/* ===============================
   mini hover 시 커서 따라다니는 CLICK 텍스트
=============================== */
const $cursorText = $('.mini-cursor-text');
let isHoveringMini = false;

$('.mini').on('mouseenter', function() {
    isHoveringMini = true;
    $cursorText.addClass('show');
});

$('.mini').on('mouseleave', function() {
    isHoveringMini = false;
    $cursorText.removeClass('show');
});

$(document).on('mousemove', function(e) {
    if (isHoveringMini) {
        $cursorText.css({
            left: e.pageX + 'px',
            top: e.pageY + 'px'
        });
    }
});






});






