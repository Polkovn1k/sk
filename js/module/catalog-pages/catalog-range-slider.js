//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".catalog-range-slider")) {

    (function () {
        var stepsSlider = document.getElementById("price-container");
        var input0 = document.getElementById("price_ranger_min");
        var input1 = document.getElementById("price_ranger_max");
        var inputs = [input0, input1];

        noUiSlider.create(stepsSlider, {
            start: [0, 200],
            connect: true,
            range: {
                "min": [0],
                "max": 200
            }
        });

        stepsSlider.noUiSlider.on("update", function (values, handle) {
            inputs[handle].value = values[handle];
        });

        // Listen to keydown events on the input field.
        inputs.forEach(function (input, handle) {
            input.addEventListener('change', function () {
                stepsSlider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
              var values = stepsSlider.noUiSlider.get();
              var value = Number(values[handle]);
              var steps = stepsSlider.noUiSlider.steps();
              var step = steps[handle];
              var position;
              switch (e.which) {
                  case 13:
                  stepsSlider.noUiSlider.setHandle(handle, this.value);
                  break;
                  case 38:position = step[1];
                  if (position === false) {
                      position = 1;
                  }
                  if (position !== null) {
                      stepsSlider.noUiSlider.setHandle(handle, value + position);
                  }
                  break;
                  case 40:
                  position = step[0];
                  if (position === false) {
                      position = 1;
                  }
                  if (position !== null) {
                      stepsSlider.noUiSlider.setHandle(handle, value - position);}
                      break;
                  }
              });
        });
    }());

}