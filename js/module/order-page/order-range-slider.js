if (document.querySelector(".order-range-slider")) {
    
    (function () {
        let orderBonusesRange = document.getElementById("order-bonuses");
        let minValuePresent = document.getElementById("order_bonuses_ranger_min");
        let maxValuePresent = document.getElementById("order_bonuses_ranger_max");
        let bonusesRangeInput = document.getElementById("order_bonuses_ranger_input");
        let minAndMaxSpread = {
            'min': [0],
            'max': [1000],
        }
        minValuePresent.innerHTML = minAndMaxSpread['min'];
        maxValuePresent.innerHTML = minAndMaxSpread['max'];
        orderBonusesRange.classList.add("order-aside__range-slider");
        
        noUiSlider.create(orderBonusesRange, {
            step: 5,
            range: minAndMaxSpread,
            start: [minAndMaxSpread['max'] / 2],
            connect: [true, false],
            format: {
                from: function(value) {
                    return parseInt(value);
                },
                to: function(value) {
                    return parseInt(value);
                }
            }
        });
    
        orderBonusesRange.noUiSlider.on('update', function (values, handle) {
            bonusesRangeInput.value = values[handle];
        });
    
        bonusesRangeInput.addEventListener('change', function () {
            orderBonusesRange.noUiSlider.set(this.value);
        });
        
    }());

}