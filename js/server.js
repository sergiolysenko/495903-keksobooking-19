
'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_DOWNLOAD);
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';

    xhr2.addEventListener('load', function () {
      if (xhr2.status === StatusCode.OK) {
        onSuccess(xhr2.response);
      } else {
        onError();
      }
    });
    xhr2.addEventListener('error', function () {
      onError();
    });
    xhr2.addEventListener('timeout', function () {
      onError();
    });

    xhr2.timeout = TIMEOUT_IN_MS;
    xhr2.open('POST', URL_UPLOAD);
    xhr2.send(data);
  };


})();
