'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var PIN_WIDTH = 40;

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
  window.pin = {
    collection: document.querySelectorAll('.map__pin--main ~ .map__pin')
  };

})();
