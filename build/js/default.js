
  $( document ).ready( () => {
    var a = 0;
    $(window).scroll(function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            a = 1;
        }
    });
    var prevScrollpos = window.pageYOffset;

  // window.onscroll = function() {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("navbar").style.top = "0";
  //   } else {
  //     document.getElementById("navbar").style.top = "-420px";
  //   }
  //   prevScrollpos = currentScrollPos;
  // }

  // STICKY
  // $(window).scroll(function() {
  //   var scroll = $(window).scrollTop();

  //   if (scroll >= 50) {
  //       $(".sticky").addClass("nav-sticky");
  //   } else {
  //       $(".sticky").removeClass("nav-sticky");
  //   }
  // });

  // MAIN SLIDER
  $('.main-slider').slick({
    dots: false,
    infinite: true,
    speed: 450,
    arrows:false,
    fade: false,
    autoplay: true,
    cssEase: 'ease'
  });

// CONTENT CAROUSEL
  $('.content-carousel').slick({
  dots: true,
  arrows:false,
  autoplay: true
  });

  function MobileSetup() {
  
    // const mobileTopOffset = 0;
  
    // $("#home .main-slider").css({
    //   "margin-top": mobileTopOffset
    // });
  
    // $("#home .main-banner").css({
    //   "margin-top": mobileTopOffset
    // });
  
    $("#middle-menu-container").removeClass('d-none');
  }

  function DesktopSetup() {
    console.log("Desktop Setup");
  }

  if(window.innerWidth <= 980) {
    MobileSetup();
  } else {
    DesktopSetup();
  }

  // Home page height 
  $("#home").css({
    height: window.innerHeight
  });

  $(".slick-dots li button").addClass("slick-dot-button");

  // SmoothLink
  $('#ToServicesBtn').on('click', (e) => SmoothTransitionLink(e, window.innerHeight - 85));
  $('#ToPricesBtn').on('click', (e) => SmoothTransitionLink(e));
  $('.navbar-nav a.scroll_link').on('click', (e) => SmoothTransitionLink(e));
  $('#BackToTopBtn').on('click', (e) => SmoothTransitionLink(e));
  
  function SmoothTransitionLink(e, topOffset = null) {
    e.preventDefault();
    var clickedLink = $(e.target)[0],
        sectionToNavigateTO = $(clickedLink).attr('href').split('#')[1];

    var trueTopOffset = 0;

    if($(clickedLink).data("topoffset")) {
      trueTopOffset = parseInt($(clickedLink).data("topoffset"));
    }

    if(topOffset) {
      trueTopOffset = topOffset;
    }
    
    $('html, body').stop().animate({
      scrollTop: $(`#${sectionToNavigateTO}`).offset().top + trueTopOffset
    }, 1500, 'easeInOutExpo');
  }

  // Links Menu Interactions 
  $("a.nav-link").on('click', (e) => {
    if(window.innerWidth <= 990) {
      $("#navbarCollapse").removeClass("show");
      $("button.navbar-toggler").addClass("collapsed");
    }
  });

  // scrollspy
  // $("#navbarCollapse").scrollspy({
  //   offset:20
  // });


  //owlCarousel
  // $("#owl-demo").owlCarousel({
  //   autoPlay: 3000, //Set AutoPlay to 3 seconds

  //   items: 4,
  //   itemsDesktop: [1199, 3],
  //   itemsDesktopSmall: [979, 1]

  // });

  // Service box
  $(".service-box").on('click', function(e) {
    const compressedClass = "compressed",
          isCompressed = $(this).hasClass(compressedClass);
    var that = $(this);

    function addCompressed() {
      $(that).addClass(compressedClass);
    }

    function remCompressed() {
      $(that).removeClass(compressedClass);
    }

    if(isCompressed) {
      // decompress
      $(that).css("max-height", "500px")
      $(that).children().first().children().last().css("transform", "rotate(180deg) translateY(20px)");
      console.log("Decompressed!");
      remCompressed();
    } else {
      // compress
      $(that).css("max-height", "150px");
      $(that).children().first().children().last().css("transform", "rotate(0deg)");
      console.log("Compressed!");
      addCompressed();
    }
  });

  // City List Module
  $(".city_list").on('click', 'li', (e) => {
    const selected_city = $(e.target).text(),
          city_list_id = $($(e.target).parent())[0].id,
          field_id = $(`#${city_list_id}`).data("fieldid");

    $(`#${field_id}`).val(selected_city);

    $(`#${city_list_id}`).html("");
    $(`#${city_list_id}`).addClass("d-none");
  });

  // $(".city_list").on('click', ".close_city_list_btn", (e) => {
  //   $($(e.target).parent().parent()).addClass("d-none");
  // });

  $(".price_city_select_field").blur(function(e) {
    const city_list = $(this).parent().children().last();
    setTimeout(() => {
      if(!$(city_list).hasClass('d-none')) 
        $(city_list).addClass('d-none');
    }, 100);
    
  })

    

  // date picker
  $('#date_airport').datepicker({autoHide: true});

  });