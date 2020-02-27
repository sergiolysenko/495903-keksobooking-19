'use strict';
(function () {
  var rightMouseButton = 1;
  var addressInput = document.getElementById('address');

  var enablePage = function (arr) {
    window.pin.create(arr);
    var pinCollection = document.querySelectorAll('.map__pin--main ~ .map__pin');
    window.map.mainBlock.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.util.enableElem(window.disablePage.disableElements);
    window.form.addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);
    addressInput.readOnly = true;
    for (var q = 0; q < pinCollection.length; q++) {
      window.map.addOnPinClick(pinCollection[q], arr[q]);
    }
  };

  var onBigPinClick = function (evt) {
    if (evt.which === rightMouseButton || evt.key === 'Enter') {
      window.load(enablePage, window.onError);
      window.map.mainPin.removeEventListener('mousedown', onBigPinClick);
      window.map.mainPin.removeEventListener('keydown', onBigPinClick);
    }
  };

  window.map.mainPin.addEventListener('mousedown', onBigPinClick);
  window.map.mainPin.addEventListener('keydown', onBigPinClick);

  window.activatepage = {
    onBigPinClick: onBigPinClick
  };
})();
