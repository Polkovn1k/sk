//СЛАЙДЕРЫ СРАВНЕНИЕ
//БАЗОВЫЕ НАСТРОЙКИ СЛАЙДЕРОВ----------------------------------------------------------------------------------------
if (document.querySelector(".compare-slider")) {

    var perViewMobile = 1;
    var perViewMinDesktop = 4;
    var perViewDesktop = 6;

    var addCompare = new Glide(".js-compare-add-slider", {
        gap: 0,
        bound: true,
        rewind: true,
        perView: perViewDesktop,
        breakpoints: {
            1394: {
                perView: perViewMinDesktop,
            },
            1023: {
                perView: perViewMobile,
            },
        }
    });
//Выясняем общее количество index'ов таким способом, т.к. встроенные методы не работают----
    var sliderLength = document.querySelector(".js-compare-add-slider").querySelectorAll(".compare__slide").length - 1;
//----
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
        perView: perViewDesktop,
        breakpoints: {
            1394: {
                perView: perViewMinDesktop,
            },
            1023: {
                perView: perViewMobile,
                rewind: true,
            },
        }
    });
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
//Второй слайдер всегда начинается со 2-го слайда на мобилках, либо с 1-го на десктопе----
    if (document.documentElement.clientWidth < 1024) {
        mainCompare.update({ startAt: 1 });
    } else {
        mainCompare.update({ startAt: 0 });
    }
    mainCompare.mount({"createdComponent": mainCustomComponent});
//----

//ОБЪЕКТ--------------------------------------------------------------------
    var compare = {

        START_DESKTOP_WIDTH: 1024,

        DESKTOP_XL_SIZE: 1395,

//Внешний вид при повороте устройства----
        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                compare._resizeOrTurn();
            });
        },
//----

//Внешний вид при ресайзе окна----
        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                compare._resizeOrTurn();
            });
        },
//----

        _resizeOrTurn: () => {
//Меняем позицию слайда у второго слайда, в зависимости от вьюпорта----
            var viewPort = document.documentElement.clientWidth;
            if (viewPort < compare.START_DESKTOP_WIDTH) {
                mainCompare.update({ startAt: 1 });
                return false;
            } else {
                mainCompare.update({ startAt: 0 });
            }
//----
//Устраняем баг, при котором в col-xl при ресайзе показывал только один товар----
            if (viewPort >= compare.DESKTOP_XL_SIZE) {
                mainCompare.update({ perView: 6 });
            }
//----
        },










        listenSliderActions: () => {
            addCompare.on("run.after", () => {
//Меняем свойства в мобилке
                if (document.documentElement.clientWidth < compare.START_DESKTOP_WIDTH) {
                    document.querySelectorAll(".js-parameter-col").forEach((block) => {
                        block.classList.add("visually-hidden");
                    });
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
            });
            mainCompare.on("run.after", () => {
//Меняем свойства в мобилке
                if (document.documentElement.clientWidth < compare.START_DESKTOP_WIDTH) {
                    document.querySelectorAll(".js-parameter-col").forEach((block) => {
                        block.classList.add("visually-hidden");
                    });
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
//Меняем свойства на десктопе
                if (document.documentElement.clientWidth >= compare.START_DESKTOP_WIDTH) {
                    var propRow = document.querySelectorAll(".js-parameter-diff-row");
                    propRow.forEach((block) => {
                        var propCol = block.querySelectorAll(".js-parameter-col");
                        for (var i = 0; i < propCol.length; i++) {
                            if (i < mainCompare.index || i >= mainCompare.index + perViewMinDesktop) {
                                propCol[i].classList.add("visually-hidden");
                                continue;
                            }
                            propCol[i].classList.remove("visually-hidden");
                        }
                    });
                }
                if (document.documentElement.clientWidth >= compare.DESKTOP_XL_SIZE) {
                    var propRow = document.querySelectorAll(".js-parameter-diff-row");
                    propRow.forEach((block) => {
                        var propCol = block.querySelectorAll(".js-parameter-col");
                        for (var i = 0; i < propCol.length; i++) {
                            if (i < mainCompare.index || i >= mainCompare.index + perViewDesktop) {
                                propCol[i].classList.add("visually-hidden");
                                continue;
                            }
                            propCol[i].classList.remove("visually-hidden");
                        }
                    });
                }
            });
        },

        _propsPositionInMobile: (addSliderIndex, mainSliderIndex) => {
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

        init: () => {
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            compare.listenSliderActions();
        },
    };
    compare.init();

}