(function () {
  angular
    .module("zttDesignLite")
    .directive("zttInput", zttInput);

  function zttInput () {
    var directive = {
      restrict: "A",
      require: "ngModel",
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

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, inputUpdateHandler);

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
