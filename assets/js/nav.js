new WOW().init();
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 75) {
      $('#primary-nav').hide();
      $('header').addClass("sticky");

      $('#user-secondary, #notification-secondary').show();
    } else {
      $('#primary-nav').show();
      $('header').removeClass("sticky");

      $('#user-secondary, #notification-secondary').hide();
    }
  });

 

});
