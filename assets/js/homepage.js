$(document).ready(function() {
  $('.filter-section .filter-header').on('click', function() {
    $this = $(this);

    $this.next('.filters').slideToggle(300).next('.more').fadeToggle(200);;
  });
});
