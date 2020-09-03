(function ($, undefined) {
  const regionsSelect = document.querySelector('.js-select-region');

  if (regionsSelect) {
    let worldwideChoices = new Choices('.js-select-region', {

      callbackOnCreateTemplates: function(strToEl) {

        let classNames = this.config.classNames;
        let itemSelectText = this.config.itemSelectText;

        return {
          item: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(
                        data.highlighted
                          ? classNames.highlightedState
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-item\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(data.active ? 'aria-selected="true"' : '') +
                      '\
                  ' +
                      String(data.disabled ? 'aria-disabled="true"' : '') +
                      '\
                  >\
                  <span class="country-icon ' + data.value +  '"></span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

          choice: function(classNames, data) {
            return strToEl(
                '\
                  <div\
                    class="' +
                        String(classNames.item) +
                        ' ' +
                        String(classNames.itemChoice) +
                        ' ' +
                        String(
                          data.disabled
                            ? classNames.itemDisabled
                            : classNames.itemSelectable,
                        ) +
                        '"\
                    data-select-text="' +
                        String(itemSelectText) +
                        '"\
                    data-choice \
                    ' +
                        String(
                          data.disabled
                            ? 'data-choice-disabled aria-disabled="true"'
                            : 'data-choice-selectable',
                        ) +
                        '\
                    data-id="' +
                        String(data.id) +
                        '"\
                    data-value="' +
                        String(data.value) +
                        '"\
                    ' +
                        String(
                          data.groupId > 0 ? 'role="treeitem"' : 'role="option"',
                        ) +
                        '\
                    >\
                    <span class="flag-icon ' + data.value + '"></span> ' +
                        String(data.label) +
                        '\
                </div>\
              ',
            );
          },
        };

      },

      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
    });
  }

  /* Lang */
  function cropLangText() {
    if ( window.matchMedia("(max-width: 767px)").matches ) {
      let el = document.querySelector('.select-lang .choices__item--selectable');
      el.innerHTML = el.dataset.value;

      document.querySelector('.select-lang .js-select-region').addEventListener('change', function(e) {
        let el = document.querySelector('.select-lang .choices__item--selectable');
        el.innerHTML = e.detail.value;
      });
    }
  }

  window.addEventListener('resize', cropLangText);
  cropLangText();
  /* Lang */
})(jQuery);
