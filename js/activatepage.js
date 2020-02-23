'use strict';
(function () {
  var rightMouseButton = 1;
  var adForm = document.querySelector('.ad-form');
  var adFormInputsSelects = adForm.querySelectorAll('input, select, textarea');
  var mapFilters = document.querySelector('.map__filters');
  var mapInputsSelects = mapFilters.querySelectorAll('input, select');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');

  window.util.disableElem(mapInputsSelects);
  window.util.disableElem(adFormInputsSelects);

  var enablePage = function (arr) {
    window.pin.create(arr);
    var pinCollection = document.querySelectorAll('.map__pin--main ~ .map__pin');
    window.map.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.enableElem(adFormInputsSelects);
    window.util.enableElem(mapInputsSelects);
    window.util.deleteClassHidden(pinCollection);
    window.form.addressInputFill(mainPin.style.left, mainPin.style.top);
    addressInput.readOnly = true;
    for (var q = 0; q < pinCollection.length; q++) {
      window.map.addOnPinClick(pinCollection[q], arr[q]);
    }
  };

  var onBigPinClick = function (evt) {
    if (evt.which === rightMouseButton || evt.key === 'Enter') {
      window.load(enablePage, window.onError);
      mainPin.removeEventListener('mousedown', onBigPinClick);
      mainPin.removeEventListener('keydown', onBigPinClick);
    }
  };
  mainPin.addEventListener('mousedown', onBigPinClick);
  mainPin.addEventListener('keydown', onBigPinClick);
})();
