'use strict';
(function () {

  var AD_QUANTITY = 8;
  var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_QUANTITY = 4;
  var GUESTS_QUANTITY = 10;
  var CHECKINOUT_HOURS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTO_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_FROM = 130;
  var LOCATION_TO = 630;
  var PIN_WIDTH = 40;
  var clientWidth = document.querySelector('main').clientWidth;
  var ads = [];

  var getAdsMoki = function (arr) {
    for (var i = 0; i < AD_QUANTITY; i++) {
      var randomFeatures = [];
      var randomPhotos = [];
      arr.push({
        author: {
          avatar: 'img/avatars/user' + window.util.getNumberWithZero(i + 1) + '.png',
        },
        offer: {
          title: 'Заголовок' + ' ' + [i],
          address: '100, 200',
          price: window.util.getRandomInt(100, 5000),
          type: HOUSE_TYPE[window.util.getRandomInt(0, HOUSE_TYPE.length - 1)],
          rooms: window.util.getRandomInt(1, ROOMS_QUANTITY),
          guests: window.util.getRandomInt(1, GUESTS_QUANTITY),
          checkin: CHECKINOUT_HOURS[window.util.getRandomInt(0, CHECKINOUT_HOURS.length - 1)],
          checkout: CHECKINOUT_HOURS[window.util.getRandomInt(0, CHECKINOUT_HOURS.length - 1)],
          features: window.util.getRandomArray(FEATURES, randomFeatures),
          description: 'строка с описанием',
          photos: window.util.getRandomArray(PHOTO_LINKS, randomPhotos),
        },
        location: {
          x: window.util.getRandomInt(PIN_WIDTH, clientWidth),
          y: window.util.getRandomInt(LOCATION_FROM, LOCATION_TO)
        }
      });
    }
    return arr;
  };
  getAdsMoki(ads);

  window.data = {
    ads: ads
  };
})();
