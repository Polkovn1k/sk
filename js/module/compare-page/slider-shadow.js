//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    var sliderShadow = {

        listenScroll: () => {
            window.addEventListener("scroll", (event) => {
                var headerBlock = document.querySelector(".js-header");
                var sliderBlock = document.querySelector(".js-compare-slider-block");
                var sliderBody = document.querySelector(".js-compare__body");
                var headerHeight = sliderShadow._getHeaderHeight(".js-header");
                if (sliderBlock.getBoundingClientRect().y == headerHeight || 0) {
                    sliderBlock.classList.add("sticked");
                } else {
                    sliderBlock.classList.remove("sticked");
                }
                sliderShadow._hideHeaderAndSliderToTop(sliderBody, headerBlock, sliderBlock);
            });
        },

        _hideHeaderAndSliderToTop: (sliderBody, headerBlock, sliderBlock) => {
            if (sliderBody.getBoundingClientRect().y <= 0 && /*sliderBlock.getBoundingClientRect().y > 0*/) {
                headerBlock.classList.add("hide");
                sliderBlock.classList.add("top-stick");
                return false;
            }
            headerBlock.classList.remove("hide");
            sliderBlock.classList.remove("top-stick");
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