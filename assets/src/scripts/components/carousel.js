(function ($, undefined) {
  const advantagesCarousel = new Swiper('.js-advantages-carousel', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: true,
    // loopFillGroupWithBlank: true,
    // spaceBetween: 10,
    pagination: {
      el: '.js-advantages-pagination',
      //type: 'fraction',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span> / <span class="swiper-pagination-total">' + ('0' + total).slice(-2) + '</span>';
      }
    },
    navigation: {
      prevEl: '.js-advantages-prev',
      nextEl: '.js-advantages-next',
    },
    breakpoints: {
        360: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        480: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        // 576: {},
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        992: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        // 1200: {}
    },
  });

  const newsCarousel = new Swiper('.js-news-carousel', {
    slidesPerView: 1,
    // slidesPerGroup: 1,
    loop: true,
    // loopFillGroupWithBlank: true,
    spaceBetween: 40,
    pagination: {
      el: '.js-news-pagination',
      //type: 'fraction',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span> / <span class="swiper-pagination-total">' + ('0' + total).slice(-2) + '</span>';
      }
    },
    navigation: {
      prevEl: '.js-news-prev',
      nextEl: '.js-news-next',
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
    },
  });

  const instance = new Swiper('.js-interactive-carousel', {
    loop: true,
    // slidesPerView: 1,
    autoHeight: true,
    spaceBetween: 20,
    pagination: {
      el: '.js-interactive-pagination',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span> / <span class="swiper-pagination-total">' + ('0' + total).slice(-2) + '</span>';
      }
    },
    navigation: {
      prevEl: '.js-interactive-prev',
      nextEl: '.js-interactive-next',
    },
    breakpoints: {
        //480: {},
        //576: {},
        //768: {},
        //992: {
        //  autoHeight: false
        //},
        1200: {
          //autoHeight: false
        }
    },
  });
})(jQuery);
