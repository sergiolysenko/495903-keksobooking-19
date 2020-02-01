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
// Заполнение карточки ---------------------------------
var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');

var createCard = function (adsArrey) {
  var card = cardTemplate.cloneNode(true);

  var popupTitle = card.querySelector('.popup__title');
  var popupAddress = card.querySelector('.popup__text--address');
  var popupPrice = card.querySelector('.popup__text--price');
  var popupType = card.querySelector('.popup__type');
  var popupCapacity = card.querySelector('.popup__text--capacity');
  var popupTime = card.querySelector('.popup__text--time');
  var popupFeaturesList = card.querySelectorAll('.popup__feature');
  var popupFeaturesNode = card.querySelector('.popup__features');
  var popupDescription = card.querySelector('.popup__description');
  var popupAvatar = card.querySelector('.popup__avatar');
  var popupPhotoNode = card.querySelector('.popup__photos');
  var popupPhotoElem = card.querySelector('.popup__photo');

  var createCardElement = function (arreyElem, domElem, method, text) {
    if (arreyElem && text) {
      domElem[method] = arreyElem + text;
    } else if (arreyElem && !text) {
      domElem[method] = arreyElem;
    } else {
      domElem.hidden = true;
    }
    return domElem;
  };

  var translateHouseType = function (arreyElem) {
    if (arreyElem === 'flat') {
      var type = 'Квартира';
    } else if (arreyElem === 'bungalo') {
      type = 'Бунгало';
    } else if (arreyElem === 'house') {
      type = 'Дом';
    } else if (arreyElem === 'palace') {
      type = 'Дворец';
    }
    return type;
  };

  var getRoomGuestText = function (roomsElem, guestsElem) {
    if (roomsElem && guestsElem) {
      var RoomGuestText = roomsElem + ' комнаты для ' + guestsElem + ' гостей';
    } else if (roomsElem && !guestsElem) {
      RoomGuestText = roomsElem + ' комнаты';
    } else if (!roomsElem && guestsElem) {
      RoomGuestText = guestsElem + ' гостей';
    }
    return RoomGuestText;
  };

  var getTimeText = function (checkinElem, checkoutElem) {
    if (checkinElem && checkoutElem) {
      var timeText = 'Заезд после ' + checkinElem + ', ' + 'выезд до ' + checkoutElem;
    } else if (checkinElem && !checkoutElem) {
      timeText = 'Заезд после ' + checkinElem;
    } else if (!checkinElem && checkoutElem) {
      timeText = 'выезд до ' + checkoutElem;
    }
    return timeText;
  };

  var createCardFeatures = function (featuresArrey, featuresDom, featuresNode) {
    if (featuresArrey) {
      for (var t = 0; t < featuresDom.length; t++) {
        if (featuresDom.item(t).classList.contains('popup__feature--' + featuresArrey[t])) {
          featuresDom.item(t).textContent = featuresArrey[t];
        } else {
          featuresDom.item(t).remove();
        }
      }
    } else {
      featuresNode.hidden = true;
    }
    return featuresDom;
  };

  var createCardImges = function (imgArrey, domNode, domElem) {
    if (imgArrey) {
      for (var j = 0; j < imgArrey.length; j++) {
        var cardImg = domElem.cloneNode(true);
        cardImg.src = imgArrey[j];
        domNode.appendChild(cardImg);
      }
    } else {
      domNode.hidden = true;
    }
    domNode.removeChild(domElem);
  };

  createCardElement(adsArrey.offer.title, popupTitle, 'textContent');
  createCardElement(adsArrey.offer.address, popupAddress, 'textContent');
  createCardElement(adsArrey.offer.price, popupPrice, 'textContent', '₽/ночь');
  createCardElement(translateHouseType(adsArrey.offer.type), popupType, 'textContent');
  createCardElement(getRoomGuestText(adsArrey.offer.rooms, adsArrey.offer.guests), popupCapacity, 'textContent');
  createCardElement(getTimeText(adsArrey.offer.checkin, adsArrey.offer.checkout), popupTime, 'textContent');
  createCardFeatures(adsArrey.offer.features, popupFeaturesList, popupFeaturesNode);
  createCardElement(adsArrey.offer.description, popupDescription, 'textContent');
  createCardElement(adsArrey.author.avatar, popupAvatar, 'src');
  createCardImges(adsArrey.offer.photos, popupPhotoNode, popupPhotoElem);

  return card;
};

var cardFragment = document.createDocumentFragment();
for (var k = 0; k < ads.length; k++) {
  cardFragment.appendChild(createCard(ads[k]));
}
var mapSection = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
mapSection.insertBefore(cardFragment, mapFilters);
