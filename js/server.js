
'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var ads;
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      activatePagemain(xhr.response);
    });
    xhr.send();
  };
  window.load(window.pin.create);
})();
