(function () {
  angular
    .module("zttDesignLite")
    .directive("zttSelectable", zttSelectable);

  zttSelectable.$inject = ["$timeout"];

  function zttSelectable ($timeout) {
    var directive = {
      restrict: "A",
      require: "?ngModel",
      link: linkFunction
    };

    function linkFunction (scope, element, attributes, ngModel) {
      var kind          = attributes.zttSelectable || "checkbox";
      var input         = element[0];
      var inputWrapper  = input.parentElement;
      var inputIcon     = inputWrapper.querySelector(".ztt-" + kind + "__icon-wrapper");
      var inputLabel    = inputWrapper.querySelector(".ztt-" + kind + "__text");

      input.addEventListener("focusin",  focusInHandler);
      input.addEventListener("focusout", focusOutHandler);
      input.addEventListener("change",   inputChangeHandler);

      if (ngModel) {
        scope.$watch(function() {
          return ngModel.$modelValue;
        }, inputChangeHandler);
      }

      function focusInHandler (event) {
        if (input.checked) {
          inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--focus");
          inputIcon.classList.add("ztt-" + kind + "__icon-wrapper--checked-focus");
        } else {
          inputIcon.classList.add("ztt-" + kind + "__icon-wrapper--focus");
          inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--checked-focus");
        }
      }

      function focusOutHandler (event) {
        if (input.checked) {
          inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--checked-focus");
        } else {
          inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--focus");
        }
      }

      function inputChangeHandler (event) {
        inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--focus");
        inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--checked-focus");

        if (!inputLabel) { return; }

        if (input.checked) {
          inputLabel.classList.add("ztt-" + kind + "__text--checked");
          inputLabel.classList.remove("ztt-" + kind + "__text--unchecked");
        } else {
          inputLabel.classList.add("ztt-" + kind + "__text--unchecked");
          inputLabel.classList.remove("ztt-" + kind + "__text--checked");
        }
      }

      $timeout(inputChangeHandler, 0);
    }

    return directive;
  }
})();
