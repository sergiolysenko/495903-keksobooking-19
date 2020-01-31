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
        address: '100, 200',
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

var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');

var createCard = function (adsArrey) {
  var card = cardTemplate.cloneNode(true);

  var popupTitle = card.querySelector('.popup__title');
  if (adsArrey.offer.title) {
    popupTitle.textContent = adsArrey.offer.title;
  } else {
    popupTitle.hidden = true;
  }

  var popupAddress = card.querySelector('.popup__text--address');
  if (adsArrey.offer.address) {
    popupAddress.textContent = adsArrey.offer.address;
  } else {
    popupAddress.hidden = true;
  }

  var popupPrice = card.querySelector('.popup__text--price');
  if (adsArrey.offer.price) {
    popupPrice.textContent = adsArrey.offer.price + '₽/ночь';
  } else {
    popupPrice.hidden = true;
  }

  var popupType = card.querySelector('.popup__type');

  if (adsArrey.offer.type === 'flat') {
    popupType.textContent = 'Квартира';
  } else if (adsArrey.offer.type === 'bungalo') {
    popupType.textContent = 'Бунгало';
  } else if (adsArrey.offer.type === 'house') {
    popupType.textContent = 'Дом';
  } else if (adsArrey.offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  } else {
    popupType.hidden = true;
  }

  var popupCapacity = card.querySelector('.popup__text--capacity');
  var textRooms = adsArrey.offer.rooms + ' комнаты';
  var textGuests = adsArrey.offer.guests + ' гостей';
  if (adsArrey.offer.rooms && adsArrey.offer.guests) {
    popupCapacity.textContent = textRooms + ' для ' + textGuests;
  } else if (adsArrey.offer.rooms && !adsArrey.offer.guests) {
    popupCapacity.textContent = textRooms;
  } else if (!adsArrey.offer.rooms && adsArrey.offer.guests) {
    popupCapacity.textContent = textGuests;
  } else {
    popupCapacity.hidden = true;
  }

  var popupTime = card.querySelector('.popup__text--time');
  var popupCheckin = 'Заезд после ' + adsArrey.offer.checkin;
  var popupCheckout = 'выезд до ' + adsArrey.offer.checkout;
  if (adsArrey.offer.checkin && adsArrey.offer.checkout) {
    popupTime.textContent = popupCheckin + ', ' + popupCheckout;
  } else if (adsArrey.offer.checkin && !adsArrey.offer.checkout) {
    popupTime.textContent = popupCheckin;
  } else if (!adsArrey.offer.checkin && adsArrey.offer.checkout) {
    popupTime.textContent = popupCheckout;
  } else {
    popupTime.hidden = true;
  }

  var popupFeatures = card.querySelector('.popup__features');
  if (adsArrey.offer.features) {
    var popupWifi = card.querySelector('.popup__feature--wifi');
    if (adsArrey.offer.features.includes('wifi')) {
      popupWifi.textContent = 'wifi';
    } else {
      popupWifi.remove();
    }
    var popupDishwasher = card.querySelector('.popup__feature--dishwasher');
    if (adsArrey.offer.features.includes('dishwasher')) {
      popupDishwasher.textContent = 'dishwasher';
    } else {
      popupDishwasher.remove();
    }
    var popupParking = card.querySelector('.popup__feature--parking');
    if (adsArrey.offer.features.includes('parking')) {
      popupParking.textContent = 'parking';
    } else {
      popupParking.remove();
    }
    var popupWasher = card.querySelector('.popup__feature--washer');
    if (adsArrey.offer.features.includes('washer')) {
      popupWasher.textContent = 'washer';
    } else {
      popupWasher.remove();
    }
    var popupElevator = card.querySelector('.popup__feature--elevator');
    if (adsArrey.offer.features.includes('elevator')) {
      popupElevator.textContent = 'elevator';
    } else {
      popupElevator.remove();
    }
    var popupConditioner = card.querySelector('.popup__feature--conditioner');
    if (adsArrey.offer.features.includes('conditioner')) {
      popupConditioner.textContent = 'conditioner';
    } else {
      popupConditioner.remove();
    }
  } else {
    popupFeatures.hidden = true;
  }

  var popupDescription = card.querySelector('.popup__description');
  if (adsArrey.offer.description) {
    popupDescription.textContent = adsArrey.offer.description;
  } else {
    popupDescription.hidden = true;
  }

  var popupPhotos = card.querySelector('.popup__photos');
  var popupPhoto = card.querySelector('.popup__photo');
  var createCardImg = function (imgArrey) {
    var cardImg = popupPhoto.cloneNode(true);
    cardImg.src = imgArrey;

    return cardImg;
  };
  if (adsArrey.offer.photos) {
    for (var j = 0; j < adsArrey.offer.photos.length; j++) {
      popupPhotos.appendChild(createCardImg(adsArrey.offer.photos[j]));
    }
  } else {
    popupPhotos.hidden = true;
  }
  popupPhotos.removeChild(popupPhoto);

  var popupAvatar = card.querySelector('.popup__avatar');
  if (adsArrey.author.avatar) {
    popupAvatar.src = adsArrey.author.avatar;
  } else {
    popupAvatar.hidden = true;
  }

  return card;
};

var cardFragment = document.createDocumentFragment();
for (var k = 0; k < ads.length; k++) {
  cardFragment.appendChild(createCard(ads[k]));
}

