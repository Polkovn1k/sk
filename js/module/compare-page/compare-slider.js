//СЛАЙДЕРЫ СРАВНЕНИЕ
//БАЗОВЫЕ НАСТРОЙКИ СЛАЙДЕРОВ----------------------------------------------------------------------------------------
if (document.querySelector(".compare-slider")) {

    var addCompare = new Glide(".js-compare-add-slider", {
        gap: 0,
        bound: true,
        rewind: true,
        perView: 6,
        breakpoints: {
            1394: {
                perView: 4,
            },
            1023: {
                perView: 1,
            },
        }
    });
    var addCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                addCompare.on("run.before", () => {
                    console.log(Components.Run.move.direction);
                });
            }
        }
    }
    addCompare.mount({"createdComponent": addCustomComponent});

    var mainCompare = new Glide(".js-compare-main-slider", {
        gap: 0,
        bound: true,
        rewind: true,
        startAt: 1,
        perView: 6,
        breakpoints: {
            1394: {
                perView: 4,
            },
            1023: {
                perView: 1,
            },
        }
    });
    var mainCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                mainCompare.on("run.before", () => {
                    console.log(Components.Run.move.direction);
                });
            }
        }
    }
//Второй слайдер всегда начинается со 2-го слайда на мобилках, либо с 1-го на десктопе
    if (document.documentElement.clientWidth < 1024) {
        mainCompare.update({ startAt: 1 });
    } else {
        mainCompare.update({ startAt: 0 });
    }
    mainCompare.mount({"createdComponent": mainCustomComponent});

//ОБЪЕКТ--------------------------------------------------------------------
    var compare = {

        START_DESKTOP_WIDTH: 1024,

        DESKTOP_XL_SIZE: 1395,

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
            if (viewPort < compare.START_DESKTOP_WIDTH) {
                mainCompare.update({ startAt: 1 });
                return false;
            } else {
                mainCompare.update({ startAt: 0 });
            }
//Устраняем баг, при котором в col-xl при ресайзе показывал только один товар
            if (viewPort >= compare.DESKTOP_XL_SIZE) {
                mainCompare.update({ perView: 6 });
            }
        },




        /*listenSliderActions: () => {
            for (var i = 0; i < glideCompareSliders.length; i++) {
                glideCompareSliders[i].on(["mount.before", "run"], function() {
                    document.querySelectorAll(".js-parameter-col").forEach((block) => {
                        block.classList.add("visually-hidden");
                    });
                })
            }
        },*/

        _propsPosition: (currentElement) => {
            var diffBlock = document.querySelectorAll(".js-parameter-diff-row");
            diffBlock.forEach((propContainer) => {
                propContainer.children[currentElement].classList.remove("visually-hidden");
            });
        },

        _writeCurrentIndex: () => {
            var firstSlider = document.querySelectorAll(".js-compare-slider");
            return firstSlider[0].querySelector(".glide__slide--active");
        },

        init: () => {
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            //compare.listenSliderActions();
        },
    };
    compare.init();

}