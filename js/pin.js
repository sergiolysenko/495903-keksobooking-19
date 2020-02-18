'use strict';
(function () {
  var PIN_WIDTH = 40;
  var MAX_TOP = 130;
  var MAX_BOTTOM = 620;
  var MAX_RIGHT = 1150;
  var MOVE_FROM_MAX = 10;
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var createPin = function (adsArray) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style = 'left:' + (adsArray.location.x - PIN_WIDTH) + 'px; top:' + adsArray.location.y + 'px;';
    var pinImg = mapPin.querySelector('img');
    pinImg.src = adsArray.author.avatar;
    pinImg.alt = adsArray.offer.title;
    mapPin.classList.add('hidden');

    return mapPin;
  };

  var createPins = function (arr, domElem) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPin(arr[i]));
    }
    return domElem.appendChild(fragment);
  };
  createPins(window.data.ads, mapPins);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mainPin.style.zIndex = 10;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (mainPin.offsetTop < MAX_TOP) {
        mainPin.style.top = MAX_TOP + MOVE_FROM_MAX + 'px';
      }
      if (mainPin.offsetTop > MAX_BOTTOM) {
        mainPin.style.top = MAX_BOTTOM - MOVE_FROM_MAX + 'px';
      }
      if (mainPin.offsetLeft > MAX_RIGHT) {
        mainPin.style.left = MAX_RIGHT - MOVE_FROM_MAX + 'px';
      }
      if (mainPin.offsetLeft < 0) {
        mainPin.style.left = 0 + MOVE_FROM_MAX + 'px';
      }

      window.form.addressInputFill(mainPin.style.left, mainPin.style.top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mainPin.style.zIndex = 0;
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    collection: document.querySelectorAll('.map__pin--main ~ .map__pin'),
    main: mainPin
  };

})();
