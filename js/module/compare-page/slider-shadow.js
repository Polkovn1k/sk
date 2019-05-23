//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    var sliderShadow = {

        listenScroll: () => {
            window.addEventListener("scroll", (event) => {
                var headerHeight = sliderShadow._getHeaderHeight(".js-header");
                var sliderBlock = document.querySelector(".js-compare-slider-block");
                if (sliderBlock.getBoundingClientRect().y == headerHeight) {
                    sliderBlock.classList.add("sticked");
                    return false;
                }
                sliderBlock.classList.remove("sticked");
            });
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        init: () => {
            sliderShadow.listenScroll();
        },

    };
    sliderShadow.init();

}