//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".mix-calc-range-slider")) {

    (function () {
        var rangeSlider = document.getElementById("vg-pg-range");

        noUiSlider.create(rangeSlider, {
            start: [50],
            step: 5,
            range: {
                'min': [0],
                'max': [100]
            },
            format: {
                from: function(value) {
                    return parseInt(value);
                },
                to: function(value) {
                    return parseInt(value);
                }
            }
        });

        var vgValue = document.getElementById("vg-range");
        var pgValue = document.getElementById("pg-range");

        rangeSlider.noUiSlider.on('update', function (values, handle) {
            vgValue.innerHTML = values[handle];
            pgValue.innerHTML = 100 - values[handle];
        });
    }());
}