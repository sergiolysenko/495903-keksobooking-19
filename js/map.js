'use strict';
(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var filterCheckboxes = document.querySelectorAll('.map__checkbox');
  var filterSelects = document.querySelectorAll('.map__filter');

  var addCardToDom = function (arr) {
    map.insertBefore(window.card.create(arr), filtersContainer);
  };

  var addOnPinClick = function (pin, adElem) {
    var openPin = function () {
      var createOpenedCard = function () {
        addCardToDom(adElem);
        pin.classList.add('map__pin--active');
        window.card.addClose();
      };
      if (!document.querySelector('.map__pin--active')) {
        createOpenedCard();
      } else {
        window.card.delete();
        document.removeEventListener('keydown', window.card.onCardEscPress);
        createOpenedCard();
      }
    };
    var onPinEnterOpen = function (evt) {
      if (evt.key === 'Enter') {
        openPin();
      }
    };

    pin.addEventListener('keydown', onPinEnterOpen);
    pin.addEventListener('click', openPin);
  };

  window.map = {
    mainBlock: map,
    addOnPinClick: addOnPinClick,
    mainPin: mainPin,
    filterCheckboxes: filterCheckboxes,
    filterSelects: filterSelects
  };
})();
