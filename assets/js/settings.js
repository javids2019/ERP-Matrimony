new WOW().init();
$(document).ready(function() {

  $('.accordion-header').on('click', function() {
  	var $this = $(this);

  	$this.toggleClass('accordion-open');
  	$this.next('.accordion-content').slideToggle(400);
  });

});
