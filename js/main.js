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
var PIN_BIG_SIZE = 156;
var PIN_SMALL_SIZE = 65;
var PIN_WIDTH = 40;
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

var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

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
createPins(ads, mapPins);
// Заполнение карточки ---------------------------------
var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');

var createCard = function (adsArray) {
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

  var createCardElement = function (arrayElem, domElem, method, text) {
    if (arrayElem && text) {
      domElem[method] = arrayElem + text;
    } else if (arrayElem && !text) {
      domElem[method] = arrayElem;
    } else {
      domElem.hidden = true;
    }
    return domElem;
  };

  var translateHouseType = function (arrayElem) {
    if (arrayElem === 'flat') {
      var type = 'Квартира';
    } else if (arrayElem === 'bungalo') {
      type = 'Бунгало';
    } else if (arrayElem === 'house') {
      type = 'Дом';
    } else if (arrayElem === 'palace') {
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

  var createCardFeatures = function (featuresArray, featuresDom, featuresNode) {
    if (featuresArray) {
      for (var s = 0; s < featuresDom.length; s++) {
        for (var t = 0; t < featuresArray.length; t++) {
          if (featuresDom.item(s).classList.contains('popup__feature--' + featuresArray[t])) {
            featuresDom.item(s).textContent = featuresArray[t];
          }
        }
        if (!featuresDom.item(s).textContent) {
          featuresDom.item(s).remove();
        }
      }
    } else {
      featuresNode.hidden = true;
    }
    return featuresDom;
  };

  var createCardImges = function (imgArray, domNode, domElem) {
    if (imgArray) {
      for (var j = 0; j < imgArray.length; j++) {
        var cardImg = domElem.cloneNode(true);
        cardImg.src = imgArray[j];
        domNode.appendChild(cardImg);
      }
    } else {
      domNode.hidden = true;
    }
    domNode.removeChild(domElem);
  };

  createCardElement(adsArray.offer.title, popupTitle, 'textContent');
  createCardElement(adsArray.offer.address, popupAddress, 'textContent');
  createCardElement(adsArray.offer.price, popupPrice, 'textContent', '₽/ночь');
  createCardElement(translateHouseType(adsArray.offer.type), popupType, 'textContent');
  createCardElement(getRoomGuestText(adsArray.offer.rooms, adsArray.offer.guests), popupCapacity, 'textContent');
  createCardElement(getTimeText(adsArray.offer.checkin, adsArray.offer.checkout), popupTime, 'textContent');
  createCardFeatures(adsArray.offer.features, popupFeaturesList, popupFeaturesNode);
  createCardElement(adsArray.offer.description, popupDescription, 'textContent');
  createCardElement(adsArray.author.avatar, popupAvatar, 'src');
  createCardImges(adsArray.offer.photos, popupPhotoNode, popupPhotoElem);

  card.classList.add('hidden');

  return card;
};
var mapSection = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var createCards = function(arr) {
  var cardFragment = document.createDocumentFragment();
  for (var k = 0; k < arr.length; k++) {
    cardFragment.appendChild(createCard(arr[k]));
  }
  mapSection.insertBefore(cardFragment, mapFilters);
};
  createCards(ads);


// Отключение страницы до активации
// Блокиировка input and select в .ad-form и .map__filters

var adForm = document.querySelector('.ad-form');
var adFormInputsSelects = adForm.querySelectorAll('input, select, textarea');
var mapFilters = map.querySelector('.map__filters');
var mapInputsSelects = mapFilters.querySelectorAll('input, select');
var mainPin = map.querySelector('.map__pin--main');
var adressInput = document.getElementById('address');
var pinsCollection = document.querySelectorAll('.map__pin--main ~ .map__pin');

var disableElem = function (elem) {
  elem.forEach(function (item) {
    item.disabled = true;
  });
};
var enableElem = function (elem) {
  elem.forEach(function (item) {
    item.disabled = false;
  });
};

disableElem(mapInputsSelects);
disableElem(adFormInputsSelects);

//  Активация страницы
var deleteClassHidden = function (elem) {
  elem.forEach(function (item) {
    item.classList.remove('hidden');
  })
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableElem(adFormInputsSelects);
  enableElem(mapInputsSelects);
  deleteClassHidden(pinsCollection);
  adressInputFill(mainPin.style.left, mainPin.style.top);
  adressInput.disabled = true;
};

var onBigPinClick = function (evt) {
  if (evt.which === 1) {
    activatePage();
    mainPin.removeEventListener('mousedown', onBigPinClick);
  }
};

mainPin.addEventListener('mousedown', onBigPinClick);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

//  Заполнение поля адреса

var adressInputFill = function (x, y) {
  if (map.classList.contains('map--faded')) {
    adressInput.value = Math.round((parseInt(x, 10) + PIN_BIG_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_BIG_SIZE / 2));
  } else {
    adressInput.value = Math.round((parseInt(x, 10) + PIN_SMALL_SIZE / 2)) + ' ' + Math.round((parseInt(y, 10) + PIN_SMALL_SIZE));
  }
};
adressInputFill(mainPin.style.left, mainPin.style.top);

// Валидаци форм тип жилья и цена ---

var houseType = document.getElementById('type');
var priceInput = document.getElementById('price');
var BUNGALO_PRICE = '0';
var FLAT_PRICE = '1000';
var HOUSE_PRICE = '5000';
var PALACE_PRICE = '10000';

priceInput.placeholder = FLAT_PRICE;
priceInput.min = FLAT_PRICE;

var houseTypeChange = function () {
  switch (true) {
    case houseType.value === 'bungalo':
      priceInput.placeholder = BUNGALO_PRICE;
      priceInput.min = BUNGALO_PRICE;
      break;
    case (houseType.value === 'flat'):
      priceInput.placeholder = FLAT_PRICE;
      priceInput.min = FLAT_PRICE;
      break;
    case (houseType.value === 'house'):
      priceInput.placeholder = HOUSE_PRICE;
      priceInput.min = HOUSE_PRICE;
      break;
    case (houseType.value === 'palace'):
      priceInput.placeholder = PALACE_PRICE;
      priceInput.min = PALACE_PRICE;
      break;
  }
};
houseType.addEventListener('change', houseTypeChange);

//  Валидация форм количество комнат и вместимость

var roomNumberSelect = document.getElementById('room_number');
var capacity = document.getElementById('capacity');
var capacityOptions = capacity.querySelectorAll('option');

var roomsNumbers = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ONE_HUNDRED: '100'
}
var capacitySelected = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  NONE: '0'
}
var capacityOption = {
  THREE: capacityOptions[0],
  TWO: capacityOptions[1],
  ONE: capacityOptions[2],
  NONE: capacityOptions[3]
}
capacityOption.THREE.disabled = true;
capacityOption.TWO.disabled = true;
capacityOption.NONE.disabled = true;

var roomChange = function () {
  switch (true) {
  case (roomNumberSelect.value === roomsNumbers.ONE):
    capacity.value = capacitySelected.ONE;
    capacityOption.THREE.disabled = true;
    capacityOption.TWO.disabled = true;
    capacityOption.ONE.disabled = false;
    capacityOption.NONE.disabled = true;
    break;
  case (roomNumberSelect.value === roomsNumbers.TWO):
    capacity.value = capacitySelected.TWO;
    capacityOption.THREE.disabled = true;
    capacityOption.TWO.disabled = false;
    capacityOption.ONE.disabled = false;
    capacityOption.NONE.disabled = true;
    break;
  case (roomNumberSelect.value === roomsNumbers.THREE):
    capacity.value = capacitySelected.THREE;
    capacityOption.THREE.disabled = false;
    capacityOption.TWO.disabled = false;
    capacityOption.ONE.disabled = false;
    capacityOption.NONE.disabled = true;
    break;
  default:
    capacity.value = capacitySelected.NONE;
    capacityOption.THREE.disabled = true;
    capacityOption.TWO.disabled = true;
    capacityOption.ONE.disabled = true;
    capacityOption.NONE.disabled = false;
  }
};

roomNumberSelect.addEventListener('change', roomChange);

// время заезда и вермя выезда

var timein = document.getElementById('timein');
var timeout = document.getElementById('timeout');

var timeIn = function () {
  timeout.value = timein.value;
};
var timeOut = function () {
 timein.value = timeout.value;
};

timein.addEventListener('change', timeIn);
timeout.addEventListener('change', timeOut);

// Скрытие и показ карточек по клику по пинам

var cardsCollection = document.querySelectorAll('.popup');
var popUpCloseCollection = document.querySelectorAll('.popup__close');

var addHiddenForEach = function (elem) {
  elem.forEach(function(item) {
    item.classList.add('hidden');
  })
};

var addOnPinClick = function (pin, card, cards) {
  var openPin = function () {
    addHiddenForEach(cards);
    card.classList.remove('hidden');
    pin.removeEventListener('click', openPin);
  }
  pin.addEventListener('click', openPin);
};

var addCloseCards = function (close, card, pin) {
  var closeCard = function () {
    card.classList.add('hidden');
    card.removeEventListener('click', closeCard);
  }
  close.addEventListener('click', closeCard);
}
var addEvtListeners = function () {
  for (var q = 0; q < pinsCollection.length; q++) {
    addOnPinClick(pinsCollection[q], cardsCollection[q], cardsCollection);
    addCloseCards(popUpCloseCollection[q], cardsCollection[q]);
  }
}
addEvtListeners();

