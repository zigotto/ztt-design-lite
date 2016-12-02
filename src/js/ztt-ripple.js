(function () {
  angular
    .module("zttDesignLite")
    .directive("zttRipple", zttRipple);

  zttRipple.$inject = ["$timeout"];

  function zttRipple ($timeout) {
    var directive = {
      restrict: "A",
      link: linkFunction
    };

    return directive;

    function linkFunction (scope, element, attributes) {
      var $el = element[0];

      $el.addEventListener("click", clickHandler);

      function clickHandler (event) {
        event.preventDefault();

        if ($el.querySelector(".ztt-btn__ripple")) { return; }

        var $ripple = document.createElement("div");
        var $bounds = $el.getBoundingClientRect();

        var $posX   = event.pageX - $bounds.left;
        var $posY   = event.pageY - $bounds.top;

        $ripple.classList.add('ztt-btn__ripple');

        $ripple.style.width  = $bounds.height + "px";
        $ripple.style.height = $bounds.height + "px";

        $ripple.style['top']        = $posY - ($bounds.height / 2) + "px";
        $ripple.style['left']       = $posX - ($bounds.height / 2) + "px";
        $ripple.style['background'] = attributes.zttRipple || "#ffffff";

        $el.appendChild($ripple);

        $timeout(function () {
          $el.removeChild($ripple);
        }, 1000);
      }
    }
  }
})();
