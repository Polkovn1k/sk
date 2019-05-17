//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    var sliderShadow = {

        listenScroll: () => {
            window.addEventListener("scroll", (event) => {
                var headerBlock = document.querySelector(".js-header");
                var sliderBlock = document.querySelector(".js-compare-slider-block");
                var sliderBody = document.querySelector(".js-compare__body");
                var headerHeight = sliderShadow._getHeaderHeight(".js-header");
                if (sliderBlock.getBoundingClientRect().y === 0) {
                    sliderBlock.classList.add("sticked");
                    headerBlock.classList.add("hide");
                } else {
                    sliderBlock.classList.remove("sticked");
                    headerBlock.classList.remove("hide");
                }
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