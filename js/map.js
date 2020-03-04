'use strict';
(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var filterCheckboxes = mapFilters.querySelectorAll('.map__checkbox');
  var filterSelects = mapFilters.querySelectorAll('.map__filter');
  var housingType = mapFilters.querySelector('#housing-type');
  /*  var housingPrice = mapFilters.querySelector('#housing-price');*/
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  /*  var housingFeatures = mapFilters.querySelector('#housing-features');*/
  var FILTER_DEFAULT = 'any';
  var pinsData = [];

  var addOnPinClick = function (pin, adElem) {
    var openPin = function () {
      window.card.delete();
      document.removeEventListener('keydown', window.card.onCardEscPress);
      map.insertBefore(window.card.create(adElem), filtersContainer);
      pin.classList.add('map__pin--active');
      window.card.addClose();
    };
    var onPinEnterOpen = function (evt) {
      if (evt.key === 'Enter') {
        openPin();
      }
    };
    pin.addEventListener('keydown', onPinEnterOpen);
    pin.addEventListener('click', openPin);
  };

  var onSuccessData = function (data) {
    pinsData = data.slice();
    window.pin.create(pinsData);
  };

  var filterData = function () {
    var typeValue = housingType.value;
    /*  var priceValue = housingPrice.value;*/
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;

    var data = pinsData.filter(function (card) {
      var isTypeMatched = typeValue === FILTER_DEFAULT ? true : card.offer.type === typeValue;
      var isRoomMatched = roomsValue === FILTER_DEFAULT ? true : card.offer.rooms === +roomsValue;
      var isGuestMatched = guestsValue === FILTER_DEFAULT ? true : card.offer.guests === +guestsValue;
      return isTypeMatched && isRoomMatched && isGuestMatched;
    });
    return data;
  };

  mapFilters.addEventListener('change', function () {
    window.card.delete();
    window.util.deletePins();
    window.pin.create(filterData());
  });

  window.map = {
    mainBlock: map,
    addOnPinClick: addOnPinClick,
    mainPin: mainPin,
    filterCheckboxes: filterCheckboxes,
    filterSelects: filterSelects,
    onSuccessData: onSuccessData
  };
})();
