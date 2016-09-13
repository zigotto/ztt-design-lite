(function () {
  angular.module("zttDesignLite", []);
})();

(function () {
  angular
    .module("zttDesignLite")
    .directive("zttSelectable", zttSelectable);

  function zttSelectable () {
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
        var ngModelChanged = !event.target;

        if (input.checked) {
          inputIcon.classList.remove("ztt-" + kind + "__icon-wrapper--checked-focus");
        } else if (!ngModelChanged) {
          inputIcon.classList.add("ztt-" + kind + "__icon-wrapper--focus");
        }
      }
    }

    return directive;
  }
})();

(function () {
  angular
    .module("zttDesignLite")
    .directive("zttInput", zttInput);

  function zttInput () {
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

      input.addEventListener("focusin", focusInHandler);
      input.addEventListener("focusout", focusOutHandler);
      input.addEventListener("input change blue", inputUpdateHandler);

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

        if (input.value === "") {
          formLabel.classList.remove(formLabelFocusClass);
        }
      }

      function inputUpdateHandler(event) {
        if (input.value.trim() !== "") {
          formLabel.classList.add(formLabelFocusClass);
        } else if (!floatingLabel) {
          formLabel.classList.remove(formLabelFocusClass);
        }
      }
    }

    return directive;
  };
})();
