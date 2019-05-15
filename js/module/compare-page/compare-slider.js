//СЛАЙДЕРЫ СРАВНЕНИЕ
//БАЗОВЫЕ НАСТРОЙКИ СЛАЙДЕРОВ----------------------------------------------------------------------------------------
if (document.querySelector(".compare-slider")) {

    let PER_VIEW_MOBILE = 1;
    let PER_VIEW_MIN_DESKTOP = 4;
    let PER_VIEW_DESKTOP = 6;
    let START_DESKTOP_WIDTH = 1024;
    let DESKTOP_XL_SIZE = 1395;

    var addCompare = new Glide(".js-compare-add-slider", {
        gap: 0,
        bound: true,
        rewind: true,
        perView: PER_VIEW_DESKTOP,
        breakpoints: {
            1394: {
                perView: PER_VIEW_MIN_DESKTOP,
            },
            1023: {
                perView: PER_VIEW_MOBILE,
            },
        }
    });
//Выясняем общее количество index'ов таким способом, т.к. встроенные методы не работают----
    var sliderLength = document.querySelector(".js-compare-add-slider").querySelectorAll(".compare__slide").length - 1;
//Компоненты для допонительного слайдера
    var addCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                addCompare.on("run.before", () => {
                    if (Components.Run.move.direction === ">" && addCompare.index + 1 === mainCompare.index) {
                        addCompare.index++;
                    }
                    if (Components.Run.move.direction === "<" && addCompare.index - 1 === mainCompare.index) {
                        addCompare.index--;
                    }
                    if (Components.Run.move.direction === ">" && addCompare.index === sliderLength && mainCompare.index === 0) {
                        addCompare.index = mainCompare.index;
                    }
                    if (Components.Run.move.direction === "<" && mainCompare.index === sliderLength && addCompare.index === 0) {
                        addCompare.index = sliderLength;
                    }
                });
            }
        }
    }
    addCompare.mount({"createdComponent": addCustomComponent});

    var mainCompare = new Glide(".js-compare-main-slider", {
        gap: 0,
        bound: false,
        rewind: false,
        startAt: 1,
        perView: PER_VIEW_DESKTOP,
        breakpoints: {
            1394: {
                perView: PER_VIEW_MIN_DESKTOP,
            },
            1023: {
                perView: PER_VIEW_MOBILE,
                rewind: true,
            },
        }
    });
//Компоненты для основного слайдера
    var mainCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                if (document.documentElement.clientWidth < 1024) {
                    mainCompare.on("run.before", () => {
                        if (Components.Run.move.direction === ">" && mainCompare.index + 1 === addCompare.index) {
                            mainCompare.index++;
                        }
                        if (Components.Run.move.direction === "<" && mainCompare.index - 1 === addCompare.index) {
                            mainCompare.index--;
                        }
                        if (Components.Run.move.direction === ">" && mainCompare.index === sliderLength && addCompare.index === 0) {
                            mainCompare.index = addCompare.index;
                        }
                        if (Components.Run.move.direction === "<" && addCompare.index === sliderLength && mainCompare.index === 0) {
                            mainCompare.index = sliderLength;
                        }
                    });
                }
            }
        }
    }
    mainCompare.mount({"createdComponent": mainCustomComponent});

//ОБЪЕКТ--------------------------------------------------------------------
    var compare = {

//Стартовые позиции слайдов и свойств основного слайдера
        slidesAndPropsStartPosition: () => {
            if (document.documentElement.clientWidth < 1024) {
                mainCompare.update({ startAt: 1 });
                compare._propsPositionInMobile(addCompare.index, mainCompare.index);
            }
            if (document.documentElement.clientWidth >= 1024 && document.documentElement.clientWidth < 1395) {
                mainCompare.update({ startAt: 0 });
                compare._propsPositionInDesktop(PER_VIEW_MIN_DESKTOP);
            }
            if (document.documentElement.clientWidth >= 1395) {
                mainCompare.update({ startAt: 0 });
                compare._propsPositionInDesktop(PER_VIEW_DESKTOP);
            }
        },

//Внешний вид при повороте устройства
        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                compare._resizeOrTurn();
            });
        },

//Внешний вид при ресайзе окна
        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                compare._resizeOrTurn();
            });
        },

        _resizeOrTurn: () => {
//Меняем позицию слайда у второго слайда, в зависимости от вьюпорта
            var viewPort = document.documentElement.clientWidth;
            if (viewPort < START_DESKTOP_WIDTH) {
                mainCompare.update({ startAt: 1 });
                return false;
            } else {
                mainCompare.update({ startAt: 0 });
            }
//Устраняем баг, при котором в col-xl при ресайзе показывал только один товар
            if (viewPort >= DESKTOP_XL_SIZE) {
                mainCompare.update({ perView: 6 });
            }
        },










        listenSliderActions: () => {
            addCompare.on("run.after", () => {
//Условия запуска функции на смену свойств для дополнительного слайдера на мобиле
                if (document.documentElement.clientWidth < START_DESKTOP_WIDTH) {
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
            });
            mainCompare.on("run.after", () => {
//Условия запуска функции на смену свойств для основного слайдера на мобиле
                if (document.documentElement.clientWidth < START_DESKTOP_WIDTH) {
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
//Условия запуска функции на смену свойств для основного слайдера на десктопе 1024 - 1394
                if (document.documentElement.clientWidth >= START_DESKTOP_WIDTH) {
                    compare._propsPositionInDesktop(PER_VIEW_MIN_DESKTOP);
                }
//Условия запуска функции на смену свойств для основного слайдера на десктопе 1395+
                if (document.documentElement.clientWidth >= DESKTOP_XL_SIZE) {
                    compare._propsPositionInDesktop(PER_VIEW_DESKTOP);
                }
            });
        },

//Cмена свойств на мобиле
        _propsPositionInMobile: (addSliderIndex, mainSliderIndex) => {
            document.querySelectorAll(".js-parameter-col").forEach((block) => {
                block.classList.add("visually-hidden");
            });
            var diffRow = document.querySelectorAll(".js-parameter-diff-row");
            diffRow.forEach((propContainer) => {
                if (addSliderIndex > mainSliderIndex) {
                    propContainer.classList.add("reverse");
                } else {
                    propContainer.classList.remove("reverse");
                }
                propContainer.children[addSliderIndex].classList.remove("visually-hidden");
                propContainer.children[mainSliderIndex].classList.remove("visually-hidden");
            });
        },

//Cмена свойств на десктопе
        _propsPositionInDesktop: (quantity) => {
            var propRow = document.querySelectorAll(".js-parameter-diff-row");
            var allMainSlides = document.querySelectorAll(".js-compare-main-slider .compare__slide");
            propRow.forEach((block) => {
                var propCol = block.querySelectorAll(".js-parameter-col");
                for (var i = 0; i < propCol.length; i++) {
                    if (i < mainCompare.index || i >= mainCompare.index + quantity || allMainSlides[i] === undefined) {
                        propCol[i].classList.add("visually-hidden");
                        continue;
                    }
                    propCol[i].classList.remove("visually-hidden");
                }
            });
        },

        init: () => {
            compare.slidesAndPropsStartPosition();
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            compare.listenSliderActions();
        },
    };
    compare.init();

}