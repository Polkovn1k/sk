//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    //Примерное значание для отслеживания прилипания слайдера к верху, т.к. на Safari это значение при скроле постоянно меняется и не может быть строго зафиксированным на 0
    let REFERENT_VAL = 10;

    let eventHandler = function(event) {
        var headerBlock = document.querySelector(".js-header");
        var sliderBlock = document.querySelector(".js-compare-slider-block");
        var sliderBody = document.querySelector(".js-compare__body");
        var headerHeight = sliderShadow._getHeaderHeight(".js-header");
        if ((sliderBlock.getBoundingClientRect().y >= -REFERENT_VAL) && (sliderBlock.getBoundingClientRect().y <= REFERENT_VAL)) {
            sliderBlock.classList.add("sticked");
            headerBlock.classList.add("hide");
            return false;
        }
        sliderBlock.classList.remove("sticked");
        headerBlock.classList.remove("hide");
    }

    var sliderShadow = {

        actionAfterEvent: throttle(eventHandler, 100),

        listenScroll: () => {
            window.addEventListener("scroll", sliderShadow.actionAfterEvent);
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