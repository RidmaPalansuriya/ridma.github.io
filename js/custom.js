jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });
  
  // Initiate the wowjs
  new WOW().init();
  
  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  
  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
      
      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });
      
      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });
      
      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
              
              var top_space = 0;
              
              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }
              
              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
              
              return false;
          }
      }
  });
  
  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
      
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();



const leftPerspectives = [
    { x: -10, z: -4 },
    { x: -20, z: -8 },
    { x: -30, z: -12 },
    { x: -40, z: -16 },
    { x: -50, z: -20 },
    { x: 10, z: -4 }
  ];
  
  const rightPerspectives = [
    { x: 10, z: -4 },
    { x: 20, z: -8 },
    { x: 30, z: -12 },
    { x: 40, z: -16 },
    { x: 50, z: -20 },
    { x: -10, z: -4 }
  ];
  
  const leftCards = document.querySelectorAll(".left .item");
  const rightCards = document.querySelectorAll(".right .item");
  
  const translateImage = (target, p) => {
    target.style.transform = `translate3d(${p.x}rem, 0, ${p.z}rem)`;
  };
  
  const animateCards = (c, perspectives) => {
    const count = parseInt(c.dataset.counter);
    translateImage(c, perspectives[count - 1]);
    c.dataset.counter = (count === 6 ? 1 : count + 1).toString();
  };
  
  const loop = () => {
    setInterval(() => {
      leftCards.forEach((c) => {
        animateCards(c, leftPerspectives);
      });
  
      rightCards.forEach((c) => {
        animateCards(c, rightPerspectives);
      });
    }, 1000);
  };
  
  loop();
  


  
  function openOverlay(imageSrc) {
    document.getElementById('overlay').style.display = "block";
    document.getElementById('overlayImage').src = imageSrc;
  }

  function closeOverlay() {
    document.getElementById('overlay').style.display = "none";
  }


  const marquees = document.querySelectorAll('.marquee');

  marquees.forEach(marquee => {
    const marqueeSpeed = 50; // Adjust scrolling speed (lower is faster)
    let timer;
  
    marquee.addEventListener('mouseenter', () => {
      clearInterval(timer);
    });
  
    marquee.addEventListener('mouseleave', () => {
      timer = startScrolling(marquee, marqueeSpeed);
    });
  
    timer = startScrolling(marquee, marqueeSpeed);
  
    marquee.addEventListener('mouseover', () => {
      marquee.style.animationPlayState = 'paused';
    });
  
    marquee.addEventListener('mouseout', () => {
      marquee.style.animationPlayState = 'running';
    });
  });
  
  function startScrolling(marquee, speed) {
    return setInterval(() => {
      marquee.scrollLeft -= 1; // Decrement scrollLeft for reverse horizontal scrolling
    }, speed);
  }
  















  