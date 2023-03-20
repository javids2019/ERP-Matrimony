new WOW().init();
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 35) {
      $('header').addClass("sticky");
    } else {
      $('header').removeClass("sticky");
    }
  });
});
