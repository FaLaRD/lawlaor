(function ($, undefined) {
  const toggleNavbar = document.querySelector('.navbar-trigger');
    
  if (toggleNavbar) {
    /* Toggler Navbar */
    toggleNavbar.addEventListener('click', function() {
      const body = document.body;

      if ( !body.classList.contains('is-navbar-opened') ) {
        body.classList.add('is-navbar-opened');
        body.style.paddingRight = scrollWidth() + 'px';
        toggleNavbar.classList.add('is-active');
      } else {
        body.classList.remove('is-navbar-opened');
        body.style.paddingRight = '';
        toggleNavbar.classList.remove('is-active');
      }
    });
    /* Toggler Navbar */

    /* Toggles Deep Levels Inside */
    // create toggles
    let navbarLinks = document.querySelectorAll('.main-nav a');
    // let navbarLinks = document.querySelectorAll('.main-nav .icon');

    navbarLinks.forEach(function(item) {
      if ( item.closest('li').querySelector('ul') ) {
        item.classList.add('has-dropdown');
      }
    });

    let dropdownToggles = document.querySelectorAll('.main-nav .has-dropdown');

    dropdownToggles.forEach(function(item) {
      item.addEventListener('click', function(e) {
        item.closest('li').classList.toggle('is-opened');

        e.preventDefault();
      });
    });
    /* Toggles Deep Levels Inside */
  }

  function scrollWidth() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
  }
})(jQuery);
