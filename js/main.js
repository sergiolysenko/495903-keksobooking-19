'use strict';

var AD_QUANTITY = 8;
var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_QUANTITY = 4;
var GUESTS_QUANTITY = 10;
var CHECKINOUT_HOURS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_FROM = 130;
var LOCATION_TO = 630;
var PIN_WIDTH = 50;
var clientWidth = document.querySelector('main').clientWidth;
var ads = [];
var map = document.querySelector('.map');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getNumberWithZero = function (number) {
  return '0' + number;
};

var getRandomArray = function (arr, newArr) {
  for (var i = 0; i < getRandomInt(1, arr.length); i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

var getAdsMoki = function (arr) {
  for (var i = 0; i < AD_QUANTITY; i++) {
    var randomFeatures = [];
    var randomPhotos = [];
    arr.push({
      author: {
        avatar: 'img/avatars/user' + getNumberWithZero(i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок' + ' ' + [i],
        address: '100, 200', /* строка, адрес предложения. Для простоты пусть пока представляет
                            собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350" */
        price: getRandomInt(100, 5000),
        type: HOUSE_TYPE[getRandomInt(0, HOUSE_TYPE.length - 1)],
        rooms: getRandomInt(1, ROOMS_QUANTITY),
        guests: getRandomInt(1, GUESTS_QUANTITY),
        checkin: CHECKINOUT_HOURS[getRandomInt(0, CHECKINOUT_HOURS.length - 1)],
        checkout: CHECKINOUT_HOURS[getRandomInt(0, CHECKINOUT_HOURS.length - 1)],
        features: getRandomArray(FEATURES, randomFeatures),
        description: 'строка с описанием',
        photos: getRandomArray(PHOTO_LINKS, randomPhotos),
      },
      location: {
        x: getRandomInt(PIN_WIDTH, clientWidth),
        y: getRandomInt(LOCATION_FROM, LOCATION_TO)
      }
    });
  }
  return arr;
};

getAdsMoki(ads);

map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var createPin = function (adsArrey) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style = 'left:' + (adsArrey.location.x - PIN_WIDTH) + 'px; top:' + adsArrey.location.y + 'px;';
  var pinImg = mapPin.querySelector('img');
  pinImg.src = adsArrey.author.avatar;
  pinImg.alt = adsArrey.offer.title;

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(createPin(ads[i]));
}

mapPins.appendChild(fragment);
