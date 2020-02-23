'use strict';
(function () {

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

    var createCardImages = function (imgArray, domNode, domElem) {
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
    createCardImages(adsArray.offer.photos, popupPhotoNode, popupPhotoElem);

    return card;
  };

  window.card = {
    create: createCard
  };
})();
