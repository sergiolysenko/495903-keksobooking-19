'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var addCardToDom = function (arr) {
    map.insertBefore(window.card.create(arr), mapFiltersContainer);
  };

  var addOnPinClick = function (pin, adElem) {
    var openPin = function () {
      var createOpenedCard = function () {
        addCardToDom(adElem);
        pin.classList.add('map__pin--active');
        addCloseCard();
      };
      if (!document.querySelector('.map__pin--active')) {
        createOpenedCard();
      } else {
        deleteCard();
        document.removeEventListener('keydown', onCardEscPress);
        createOpenedCard();
      }
    };
    var addCloseCard = function () {
      document.addEventListener('keydown', onCardEscPress);
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', deleteCard);
    };
    var deleteCard = function () {
      var activePin = document.querySelector('.map__pin--active');
      activePin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
      var cardClose = document.querySelector('.popup__close');
      cardClose.removeEventListener('click', deleteCard);
      var card = document.querySelector('.popup');
      card.remove();
    };
    var onCardEscPress = function (evt) {
      if (evt.key === 'Escape' && document.querySelector('.map__pin--active')) {
        deleteCard();
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

  (function () {
    for (var q = 0; q < window.pin.collection.length; q++) {
      addOnPinClick(window.pin.collection[q], window.data.ads[q]);
    }
  })();
  window.map = map;

})();
