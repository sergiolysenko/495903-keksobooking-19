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
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.getElementById('address');
  var title = document.querySelector('#title');
  var description = document.querySelector('#description');
  var featureCheckboxes = document.querySelectorAll('.feature__checkbox');
  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');
  var roomNumberSelect = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  var setPriceDefault = function () {
    priceInput.placeholder = FLAT_PRICE;
    priceInput.min = FLAT_PRICE;
  };
  setPriceDefault();

  var houseTypeChange = function () {
    switch (houseType.value) {
      case 'bungalo':
        priceInput.placeholder = BUNGALO_PRICE;
        priceInput.min = BUNGALO_PRICE;
        break;
      case 'flat':
        priceInput.placeholder = FLAT_PRICE;
        priceInput.min = FLAT_PRICE;
        break;
      case 'house':
        priceInput.placeholder = HOUSE_PRICE;
        priceInput.min = HOUSE_PRICE;
        break;
      case 'palace':
        priceInput.placeholder = PALACE_PRICE;
        priceInput.min = PALACE_PRICE;
        break;
    }
  };
  houseType.addEventListener('change', houseTypeChange);

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
  var setDefaultCapacity = function () {
    window.util.defaultSelect(capacity, 2, 'one');
    capacityOption.THREE.disabled = true;
    capacityOption.TWO.disabled = true;
    capacityOption.NONE.disabled = true;
  };
  setDefaultCapacity();

  var roomChange = function () {
    switch (roomNumberSelect.value) {
      case roomsNumbers.ONE:
        capacity.value = capacitySelected.ONE;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = true;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      case roomsNumbers.TWO:
        capacity.value = capacitySelected.TWO;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = false;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      case roomsNumbers.THREE:
        capacity.value = capacitySelected.THREE;
        capacityOption.THREE.disabled = false;
        capacityOption.TWO.disabled = false;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
        break;
      case roomsNumbers.ONE_HUNDRED:
        capacity.value = capacitySelected.NONE;
        capacityOption.THREE.disabled = true;
        capacityOption.TWO.disabled = true;
        capacityOption.ONE.disabled = true;
        capacityOption.NONE.disabled = false;
        break;
      default:
        capacityOption.THREE.disabled = false;
        capacityOption.TWO.disabled = false;
        capacityOption.ONE.disabled = false;
        capacityOption.NONE.disabled = true;
    }
  };

  roomNumberSelect.addEventListener('change', roomChange);

  var timeIn = function () {
    timeout.value = timein.value;
  };
  var timeOut = function () {
    timein.value = timeout.value;
  };

  timein.addEventListener('change', timeIn);
  timeout.addEventListener('change', timeOut);

  var addressInputFill = function (x, y) {
    if (window.map.mainBlock.classList.contains('map--faded')) {
      addressInput.value = Math.round((parseInt(x, 10) + PIN_BIG_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_BIG_SIZE / 2));
    } else {
      addressInput.value = Math.round((parseInt(x, 10) + PIN_SMALL_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_SMALL_SIZE));
    }
  };

  addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), window.onSendPopup.actionsIfSuccess, window.onSendPopup.actionsIfError);
  });

  window.form = {
    addressInputFill: addressInputFill,
    setPriceDefault: setPriceDefault,
    adForm: adForm,
    priceInput: priceInput,
    title: title,
    description: description,
    featureCheckboxes: featureCheckboxes,
    houseType: houseType,
    timein: timein,
    timeout: timeout,
    capacity: capacity,
    roomNumberSelect: roomNumberSelect,
    setDefaultCapacity: setDefaultCapacity
  };
})();
