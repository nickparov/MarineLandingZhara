
(function SetupApp() {
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
 window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-420px";
  }
  prevScrollpos = currentScrollPos;
}
// STICKY
$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (scroll >= 50) {
      $(".sticky").addClass("nav-sticky");
  } else {
      $(".sticky").removeClass("nav-sticky");
  }
});


// SmoothLink
$('.navbar-nav a').on('click', function(e) {
e.preventDefault();
var clickedLink = $(this),
    sectionToNavigateTO = clickedLink.attr('href').split('#')[1];

$('html, body').stop().animate({
  scrollTop: $(`#${sectionToNavigateTO}`).offset().top - 0
}, 1500, 'easeInOutExpo');
});

// scrollspy
$("#navbarCollapse").scrollspy({
  offset:20
});


//owlCarousel
$(document).ready(function() {

    $("#owl-demo").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 1]

    });
});
})();