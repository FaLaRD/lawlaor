(function ($, undefined) {
    /*============================================
    local Storage https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage
    ==============================================*/
    $(function () {
        var cookiesApplyBtn = $('.js-cookies-apply'),
            cookiesCancelBtn = $('.js-cookies-cancel'),
            cookiesBlock = $('.js-cookies-block');

        if (!localStorage.getItem('isAgreement')) {
            cookiesBlock.addClass('active');
        }

        cookiesApplyBtn.on('click', function(e) {
            e.preventDefault();
            cookiesBlock.removeClass('active');
            localStorage.setItem('isAgreement', true);
        });

        cookiesCancelBtn.on('click', function(e) {
            e.preventDefault();
            cookiesBlock.removeClass('active');
        });
    });
})(jQuery);
