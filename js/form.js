'use strict';
(function () {
  var PIN_BIG_SIZE = 156;
  var PIN_SMALL_SIZE = 65;
  var BUNGALO_PRICE = '0';
  var FLAT_PRICE = '1000';
  var HOUSE_PRICE = '5000';
  var PALACE_PRICE = '10000';
  var houseType = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adressInput = document.getElementById('address');

  priceInput.placeholder = FLAT_PRICE;
  priceInput.min = FLAT_PRICE;

  var houseTypeChange = function () {
    switch (true) {
      case houseType.value === 'bungalo':
        priceInput.placeholder = BUNGALO_PRICE;
        priceInput.min = BUNGALO_PRICE;
        break;
      case (houseType.value === 'flat'):
        priceInput.placeholder = FLAT_PRICE;
        priceInput.min = FLAT_PRICE;
        break;
      case (houseType.value === 'house'):
        priceInput.placeholder = HOUSE_PRICE;
        priceInput.min = HOUSE_PRICE;
        break;
      case (houseType.value === 'palace'):
        priceInput.placeholder = PALACE_PRICE;
        priceInput.min = PALACE_PRICE;
        break;
    }
  };
  houseType.addEventListener('change', houseTypeChange);

  var roomNumberSelect = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  var roomsNumbers = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ONE_HUNDRED: '100'
  };
  var capacitySelected = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    NONE: '0'
  };
  var capacityOption = {
    THREE: capacityOptions[0],
    TWO: capacityOptions[1],
    ONE: capacityOptions[2],
    NONE: capacityOptions[3]
  };
  capacityOption.THREE.disabled = true;
  capacityOption.TWO.disabled = true;
  capacityOption.NONE.disabled = true;

  var roomChange = function () {
    switch (true) {
      case (roomNumberSelect.value === roomsNumbers.ONE):
        capacity.value = capacitySelected.ONE;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = true;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      case (roomNumberSelect.value === roomsNumbers.TWO):
        capacity.value = capacitySelected.TWO;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = false;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      case (roomNumberSelect.value === roomsNumbers.THREE):
        capacity.value = capacitySelected.THREE;
        capacityOption.THREE.disabled = false;
        capacityOption.TWO.disabled = false;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      default:
        capacity.value = capacitySelected.NONE;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = true;
        capacityOption.ONE.disabled = true;
        capacityOption.NONE.disabled = false;
    }
  };

  roomNumberSelect.addEventListener('change', roomChange);

  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');

  var timeIn = function () {
    timeout.value = timein.value;
  };
  var timeOut = function () {
    timein.value = timeout.value;
  };

  timein.addEventListener('change', timeIn);
  timeout.addEventListener('change', timeOut);

  var adressInputFill = function (x, y) {
    if (map.classList.contains('map--faded')) {
      adressInput.value = Math.round((parseInt(x, 10) + PIN_BIG_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_BIG_SIZE / 2));
    } else {
      adressInput.value = Math.round((parseInt(x, 10) + PIN_SMALL_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_SMALL_SIZE));
    }
  };
  adressInputFill(mainPin.style.left, mainPin.style.top);

  window.form = {
    adressInputFill: adressInputFill
  };

})();
