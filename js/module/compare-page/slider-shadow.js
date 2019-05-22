//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    let eventHandlerArg = function(event) {
        console.log("Произошло событие!");
        var headerBlock = document.querySelector(".js-header");
        var sliderBlock = document.querySelector(".js-compare-slider-block");
        var sliderBody = document.querySelector(".js-compare__body");
        var headerHeight = sliderShadow._getHeaderHeight(".js-header");
        if ((sliderBlock.getBoundingClientRect().y === headerHeight) || (sliderBlock.getBoundingClientRect().y === 0)) {
            sliderBlock.classList.add("sticked");
            headerBlock.classList.add("hide");
            return false;
        }
        sliderBlock.classList.remove("sticked");
        headerBlock.classList.remove("hide");
    }

    var sliderShadow = {

        scrollEvent: throttle(eventHandlerArg, 100),

        listenScroll: () => {
            window.addEventListener("scroll", sliderShadow.scrollEvent);
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