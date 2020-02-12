'use strict';
(function () {
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
  var deleteClassHidden = function (elem) {
    elem.forEach(function (item) {
      item.classList.remove('hidden');
    });
  };
  window.util = {
    getRandomInt: getRandomInt,
    getNumberWithZero: getNumberWithZero,
    getRandomArray: getRandomArray,
    disableElem: disableElem,
    enableElem: enableElem,
    deleteClassHidden: deleteClassHidden
  };
})();
