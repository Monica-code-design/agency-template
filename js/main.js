  
$(document).ready( function() {

  function ajaxLoad() {
    mouse_move();
    typist();
    animate_button();
    carousel();
    portfolio_titles();
    ZoomImage();
    first_load();
    PortfolioGrids();
    lightbox();
    Footerpad();
    header();
  }

  $(window).resize(function(){
    Footerpad();
  });

  full_menu();
  ajaxLoad();

  function first_load() {
    TweenMax.from('.hero-little', 0.4,{opacity:0, y:-40, delay:.7});  
    TweenMax.from('.hero-title', 0.4,{opacity:0, y:-30, delay:.9});  
    TweenMax.from('.hero .arrow', 0.4,{opacity:0, y:-40, delay:1.2}); 
    TweenMax.from('.work-hero .title', 0,{opacity:0, y:40, delay:0}); 
    TweenMax.from('.hero-subtitle', 0,{opacity:0, y:40, delay:0}); 
    TweenMax.from('.section-down-arrow.subpage', 0.4,{opacity:0, y:40, delay:1}); 
    new WOW({ mobile: false }).init();
  }

  // PAGE LOAD
  $("main").on('click','[data-type="port-load"]', function(e) {
    first_load();
    TweenMax.to('main, footer', 0.4,{y:-100, opacity:0}); 
    var href = $(this).attr("href");
    load_Html();
    function load_Html() {
        setTimeout(function() {
            loadCont(href);     
            if (!href || href[0] === "#") {
                location.hash = href;
                return;
            }         
            history.pushState('', 'new URL: '+href, href);    
        },1000);
    }
    e.preventDefault();
    window.onpopstate = function(event) {
        location.reload();
    };
  });

  function loadCont(url) {
    var getData = $.get(url, function(response) {
        var markup = $("<main>" + response + "</main>");
        var fragment = markup.find("main").html();
        var title = markup.find("title").html();
        $('head title').html(title);
        $("main").html(fragment);
        ajaxLoad();
        full_menu();
        window.scrollTo(0, 0);
    });
    TweenMax.to('main, footer', 0.4,{opacity:1, y:0, delay:.7, clearProps:"all"});
  }

  function typist() {
    var typist;
    typist = document.querySelector("#element");
    new Typist(typist, {
      letterInterval: 60,
      textInterval: 3000
    });
  }

  // FOOTER
  function Footerpad() {
    var fh = $('footer').outerHeight();
    $('body').css({'padding-bottom':fh});
  }

  // full menu
  function full_menu(){
    var box = $(".full-menu nav li");
    var tl = new TimelineMax({
      yoyo: false,
      reversed: true
    });
    tl.pause();
    tl.from('.full-menu', 0.2,{autoAlpha:0, opacity:0}); 
    tl.staggerFrom(box, .3, {
        y: "20",
        opacity: 0,
        ease: Back.easeOut
    },0.1);
    $('header .hamburger, .full-menu nav li a').on('click', function(){
        $('body').toggleClass('full-opened');
        tl.reversed() ? tl.play():tl.reverse();
    });
  }

  //NAVBAR SHOW - HIDE	
  function header() {
    //Smooth scroll
    if ($('.hero').length) {
      $(document).on("scroll", onScroll);
      $('.full-menu nav li a').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");             
          $(this).addClass('active');
          var target = this.hash,
          menu = target;
          target = $(target);
          $('html, body').stop().animate({
              'scrollTop': target.offset().top             
          }, 1000, 'swing', function () {
              window.location.hash = target.selector;
              $(document).on("scroll", onScroll);
          });
      });
    }

    function onScroll(event){
      if ($('#hero').length) {     
        var scrollPos = $(document).scrollTop();
        $('.full-menu nav li a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.full-menu nav li a').removeClass("activelink");
              currLink.addClass("activelink");
          }
        });
      }              
    }
  }

  // PARALLAX ELEMENT
  function animate_button() {

    var mouse = { x: 0, y: 0 };
    var pos = { x: 0, y: 0 };
    var ratio = 0.15;
    var active = false;
    var ball = document.getElementById("ball");
    
    TweenLite.set(ball, { xPercent: -50, yPercent: -50 });
    
    document.addEventListener("mousemove", mouseMove);
    
    function mouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    
    TweenLite.ticker.addEventListener("tick", updatePosition);
    
    function updatePosition() {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;
        TweenLite.set(ball, { x: pos.x, y: pos.y });
      }
    }
    
    $(".icon-wrap").mouseenter(function(e) {
      TweenMax.to(this, 0.3, { scale: 1.01 });
      $(ball).addClass('big');
      active = true;
    });
    
    $(".icon-wrap").mouseleave(function(e) {
      TweenMax.to(this, 0.3, { scale: 1 });
      $(ball).removeClass('big');
      TweenMax.to(this.querySelector(".button-icon"), 0.3, { x: 0, y: 0 });
      active = false;
    });
    
    $(".icon-wrap").mousemove(function(e) {
      parallaxCursor(e, this, 3);
      callParallax(e, this);
    });
    
    function callParallax(e, parent) {
      parallaxIt(e, parent, parent.querySelector(".button-icon"), 10);
    }
    
    function parallaxIt(e, parent, target, movement) {
      var boundingRect = parent.getBoundingClientRect();
      var relX = e.clientX - boundingRect.left;
      var relY = e.clientY - boundingRect.top;
    
      TweenMax.to(target, 0.3, {
        x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
        y: (relY - boundingRect.height / 2) / boundingRect.height * movement,
        ease: Power2.easeOut
      });
    }
    
    function parallaxCursor(e, parent, movement) {
      var rect = parent.getBoundingClientRect();
      var relX = e.clientX - rect.left;
      var relY = e.clientY - rect.top;
      pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
      pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
      TweenMax.to(ball, 0.3, { x: pos.x, y: pos.y });
    }
  }


  // LOADER CURSOR
  function mouse_move(){
    $(".hero").on("mouseenter", function() {
      $('#ball').addClass("active");
    });
    $(".hero").on("mouseleave", function() {
      $('#ball').removeClass("active");
    }); 
    $(".portfolio_filter li a, .next-link, a:not(.lightbox)").on("mouseenter", function() {
      $('#ball').addClass("big");
    });
    $(".portfolio_filter li a, .next-link, a:not(.lightbox)").on("mouseleave", function() {
      $('#ball').removeClass("big");
    }); 
    $(".portfolio-item, .full-menu nav ul li a, .site-btn, .map").on("mouseenter", function() {
      $('#ball').addClass("disable");
    });
    $(".portfolio-item, .full-menu nav ul li a, .site-btn, .map").on("mouseleave", function() {
      $('#ball').removeClass("disable");
    });
    $(".image.lightbox").on("mouseenter", function() {
      $('#ball').addClass("plus");
    });
    $(".image.lightbox").on("mouseleave", function() {
      $('#ball').removeClass("plus");
    }); 
    $(".services .item").on("mouseenter", function() {
      $('#ball').addClass("slide");
    });
    $(".services .item").on("mouseleave", function() {
      $('#ball').removeClass("slide");
    }); 
    $(".services .item").on("mousedown", function() {
      TweenMax.to($('#ball'), 0.3, { scale: 1.3 });
    }); 
    $(".services .item").on("mouseup", function() {
      TweenMax.to($('#ball'), 0.3, { scale: 1 });
    });  
    $(".down-link").on("mouseenter", function() {
      $('#ball').addClass("big");
    });
    $(".down-link").on("mouseleave", function() {
      $('#ball').removeClass("big");
    }); 
  }

  // PORTFOLIO TITLES
  function portfolio_titles() {

    jQuery('.grid-item').each(function() {
      jQuery(this).on('mouseenter', function() {
        if (jQuery(this).data('title')) {
          jQuery('.portfolio-titles').html('<span>' + jQuery(this).data('title') + '</span>');
          jQuery('.portfolio-titles').addClass('visible');
          
        }

        jQuery(document).on('mousemove', function(e) {
          jQuery('.portfolio-titles').css({
            left: e.clientX - 10,
            top: e.clientY + 25
          });
              });
              
      }).on('mouseleave', function() {
        jQuery('.portfolio-titles').removeClass('visible');
      });
    });

    $('.hero .arrow, .section-down-arrow.subpage').on("click", function(){
      var window_height = $(window).height();
      $('html, body').animate({
          scrollTop: window_height
      }, 800);
    }); 
  }

  //PORTFOLIO GRIDS
  function PortfolioGrids() {
    var $container = $('.masonry');
    $container.imagesLoaded( function() {
        $container.isotope({
          layoutMode: 'packery',
          itemSelector: '.grid-item',
          gutter:0,
          transitionDuration: "0.5s",
          columnWidth: '.grid-item'
        });
    })
    $('.portfolio_filter ul li a').on("click", function(){
      $(".portfolio_filter ul li a").removeClass("select-cat");
      $(this).addClass("select-cat");        
      var selector = $(this).attr('data-filter');
      $(".masonry").isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        }
      });
        return false;
    });   

    $(".filter-icon").on("click", function() {
      $('.portfolio_filter').addClass('show');  
      $('.portfolio').addClass('zendex');        
    });

    $(".portfolio_filter").on("click", function (event) {
      if (!$(event.target).is(".portfolio_filter ul li a")) {
        $('.portfolio_filter').removeClass('show');
        return false;
      }
    }); 

    // Infinite Scroll
    var curPage = 1;
    var pagesNum = $("#pagination-selector").find("li a:last").text();

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '#pagination-selector',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '<div class="loader"><span></span></div>',
            speed: 'slow',
            selector: '.load-more',
        },
    },
    
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){   
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems, true ); 
      });

      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more button' ).remove();
      }
      $('.load-more').find('button').css('visibility', 'visible');
    });

    $container.infinitescroll( 'unbind' );
    $container.on( 'append.infinitescroll', function( event, response, path, items ) {
      console.log( 'Loaded: ' + path );
    });

    $( '.load-more button' ).on('click', function() {
      setTimeout(function()
        { 
      portfolio_titles();
      ZoomImage();
        $('.grid-item').addClass('in-view'); 
        },1000);      
      $container.infinitescroll( 'retrieve' );
      $('.load-more').find('button').css('visibility', 'hidden');
      return false;
    });
  }

  // MAGNIFIC POPUP    
  function lightbox() {
    $('.lightbox').magnificPopup({
      type:'image',
      gallery:{enabled:true},
      zoom:{enabled: true, duration: 300}
    });
  }
  
  // OWL CAROUSEL JS  
  function carousel() {
    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
      owlcar.each(function () {
        var $owl = $(this);
        var itemsData = $owl.data('items');
        var autoplayData = $owl.data('autoplay');
        var autoPlayTimeoutData = $owl.data('autoplaytimeout');
        var dotsData = $owl.data('dots');
        var navData = $owl.data('nav');
        var marginData = $owl.data('margin');
        var stagePaddingData = $owl.data('stagepadding');
        var itemsDesktopData = $owl.data('items-desktop');
        var itemsTabletData = $owl.data('items-tablet');
        var itemsTabletSmallData = $owl.data('items-tablet-small');
        $owl.owlCarousel({
            items: itemsData
          , dots: dotsData
          , nav: navData
          , margin: marginData
          , loop: true
          , stagePadding: stagePaddingData
          , autoplay: autoplayData
          , autoplayTimeout: autoPlayTimeoutData
          , navText: ["<i class='fas fa-angle-left'></i>","<i class='fas fa-angle-right'></i>"]
          , responsive:{
              0:{
                items:itemsTabletSmallData,
                stagePadding:0
              },
              600:{
                items:itemsTabletData,
                stagePadding:0
              },
              1000:{
                items:itemsDesktopData
              }
            }
        , });
      });
    }
  }

  function ZoomImage() {
    console.clear();
  }

});