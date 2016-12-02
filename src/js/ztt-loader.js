(function () {
  angular
    .module("zttDesignLite")
    .directive("zttLoader", zttLoader);

  function zttLoader () {
    var directive = {
      restrict: "E",
      scope: {
        "active": "=",
        "size": "@"
      },
      template: '<div class="ztt-loader" ng-class="[\'ztt-loader--\' + size, { \'ztt-loader--active\': active }]">' +
                '  <div class="ztt-loader__circle"></div>' +
                '  <div class="ztt-loader__spinner"></div>' +
                '</div>'
    };

    return directive;
  }
})();
