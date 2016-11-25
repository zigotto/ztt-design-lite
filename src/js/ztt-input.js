(function () {
  angular
    .module("zttDesignLite")
    .directive("zttInput", zttInput);

  zttInput.$inject = ["$timeout"];

  function zttInput ($timeout) {
    var directive = {
      restrict: "EAC",
      require: "?ngModel",
      link: linkFunction
    };

    function linkFunction (scope, element, attributes, ngModel) {
      var formGroupFocusClass = "ztt-form-group__wrapper--focus";
      var formLabelFocusClass = "ztt-form-group__label--focus";

      var input     = element[0];
      var formGroup = getClosestFormGroup(input);
      var formLabel = getClosestLabel(input);

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

        if (formLabel && floatingLabel) {
          formLabel.classList.add(formLabelFocusClass);
        }
      }

      function focusOutHandler(event) {
        formGroup.classList.remove(formGroupFocusClass);

        if (formLabel && input.value.trim() === "") {
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

    function getClosestFormGroup(input) {
      var parent         = input.parentElement;
      var formGroupClass = "ztt-form-group__wrapper";
      var isCloser       = parent && parent.classList.contains(formGroupClass);

      while (!isCloser) {
        parent   = parent.parentElement;
        isCloser = parent && parent.classList.contains(formGroupClass);
      }

      return parent;
    }

    function getClosestLabel(input) {
      var parent        = input.parentElement;
      var labelSelector = ".ztt-form-group__label";
      var closestLabel  = parent && parent.querySelector(labelSelector);

      while (!closestLabel) {
        parent        = parent.parentElement;
        closestLabel  = parent && parent.querySelector(labelSelector);
      }

      return closestLabel;
    }

    return directive;
  };
})();
