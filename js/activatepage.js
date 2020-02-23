'use strict';
var activatePagemain = function (arr) {

  window.pin.create(arr);

  var adForm = document.querySelector('.ad-form');
  var adFormInputsSelects = adForm.querySelectorAll('input, select, textarea');
  var mapFilters = document.querySelector('.map__filters');
  var mapInputsSelects = mapFilters.querySelectorAll('input, select');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');
  var pinCollection = document.querySelectorAll('.map__pin--main ~ .map__pin')
  window.util.disableElem(mapInputsSelects);
  window.util.disableElem(adFormInputsSelects);

  var activatePage = function () {
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
    if (evt.which === 1) {
      activatePage();
      mainPin.removeEventListener('mousedown', onBigPinClick);
    }
  };
    mainPin.addEventListener('mousedown', onBigPinClick);
    mainPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        activatePage();
      }
  });

  window.activepage = {
    pinCollection: pinCollection
  }
};
