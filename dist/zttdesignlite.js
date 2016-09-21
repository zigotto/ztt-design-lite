(function () {
  angular.module("zttDesignLite", []);
})();

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

(function () {
  angular
    .module("zttDesignLite")
    .directive("zttInput", zttInput);

  zttInput.$inject = ["$timeout"];

  function zttInput ($timeout) {
    var directive = {
      restrict: "A",
      require: "?ngModel",
      link: linkFunction
    };

    function linkFunction (scope, element, attributes, ngModel) {
      var formGroupFocusClass = "ztt-form-group__wrapper--focus";
      var formLabelFocusClass = "ztt-form-group__label--focus";

      var input     = element[0];
      var formGroup = input.parentElement;
      var formLabel = formGroup.querySelector("label");

      var floatingLabel = attributes.zttInput !== "placeholder";

      input.addEventListener("focus",             focusInHandler);
      input.addEventListener("blur",              focusOutHandler);
      input.addEventListener("input change blur", inputUpdateHandler);

      if (ngModel) {
        scope.$watch(function () {
          return ngModel.$modelValue;
        }, inputUpdateHandler);
      }

      function focusInHandler(event) {
        formGroup.classList.add(formGroupFocusClass);

        if (floatingLabel) {
          formLabel.classList.add(formLabelFocusClass);
        }
      }

      function focusOutHandler(event) {
        formGroup.classList.remove(formGroupFocusClass);

        if (input.value.trim() === "") {
          formLabel.classList.remove(formLabelFocusClass);
        }
      }

      function inputUpdateHandler(event) {
        var inputValue = input.value;
        var fromWatch  = typeof event === "string";
        var hasFocus   = input === document.activeElement;

        if (fromWatch) { inputValue = event; }

        if (inputValue.trim() !== "") {
          formLabel.classList.add(formLabelFocusClass);
        } else if (!hasFocus) {
          formLabel.classList.remove(formLabelFocusClass);
        }
      }

      $timeout(inputUpdateHandler, 0);
    }

    return directive;
  };
})();
