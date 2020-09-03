(function ($, undefined) {
  $('.scroll-next').on('click', function() {
    $('html, body').animate({
      scrollTop: $('.advantages-section').offset().top
    }, 700);
  });
})(jQuery);