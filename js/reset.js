'use strict';
(function () {

  var resetButton = document.querySelector('.ad-form__reset');
  var onButtonReset = function (evt) {
    evt.preventDefault();
    window.disablePage.disable();
  };

  resetButton.addEventListener('click', onButtonReset);
})();
