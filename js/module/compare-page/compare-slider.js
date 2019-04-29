//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".compare-slider")) {

    var sliders = document.querySelectorAll(".js-compare-slider");
    var glideCompareSliders = [];
    var sliderCollection = function (i, item) {
        glideCompareSliders[i] = new Glide(item[i], {
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
        glideCompareSliders[i].mount();
        return glideCompareSliders;
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderCollection(i, sliders);
    }
//Второй слайдер всегда начинается со 2-го слайда на мобилках, либо с 1-го на десктопе
    if (document.documentElement.clientWidth < 1024) {
        glideCompareSliders[1].update({ startAt: 1 });
    } else {
        glideCompareSliders[1].update({ startAt: 0 });
    }

}

//ОБНУЛЯЕМ ПОЗИЦИЮ АКТИВНЫЙХ СЛАЙДЕРОВ, ЕСЛИ ОКНО РЕСАЙЗИТСЯ (ИЛИ МЕНЯЕТСЯ ОРИЕНТАЦИЯ УСТРОЙСТВА)
if (document.querySelector(".js-main-compare-slider")) {

    var compare = {

        START_DESKTOP_WIDTH: 1024,

        DESKTOP_XL_SIZE: 1395,
//Внешний вид при ресайзе или повороте устройства
        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                compare._resizeOrTurn();
            });
        },

        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                compare._resizeOrTurn();
            });
        },

        _resizeOrTurn: () => {
            //меняем позицию слайда у второго слайда, в зависимости от вьюпорта
            var viewPort = document.documentElement.clientWidth;
            if (viewPort < compare.START_DESKTOP_WIDTH) {
                glideCompareSliders[1].update({ startAt: 1 });
                return false;
            } else {
                glideCompareSliders[1].update({ startAt: 0 });
            }
            //устраняем баг, при котором в col-xl при ресайзе показывал только один товар
            if (viewPort >= compare.DESKTOP_XL_SIZE) {
                glideCompareSliders[1].update({ perView: 6 });
            }
        },
//Свойства после инициализации
        propertyStateAfterInit: () => {
            document.querySelectorAll(".js-parameter-col").forEach((block) => {
                block.classList.add("visually-hidden");
            });
            compare._propsPosition(glideCompareSliders[0].index);
            compare._propsPosition(glideCompareSliders[1].index);
        },

        _propsPosition: (currentElement) => {
            var diffBlock = document.querySelectorAll(".js-parameter-diff-row");
            diffBlock.forEach((propContainer) => {
                propContainer.children[currentElement].classList.remove("visually-hidden");
            });
        },
//Свойства при смене слайдов
        listenSliderActions: () => {
            for (var i = 0; i < glideCompareSliders.length; i++) {
                glideCompareSliders[i].on(["mount.before", "run"], function() {
                    document.querySelectorAll(".js-parameter-col").forEach((block) => {
                        block.classList.add("visually-hidden");
                    });
                    //Первый слайдер
                    compare.sliderBlock(glideCompareSliders[0]);
                    //Второй слайдер
                    compare.sliderBlock(glideCompareSliders[1]);
                })
            }
        },

        sliderBlock: (sliderNumber) => {
            var diffBlock = document.querySelectorAll(".js-parameter-diff-row");
            var currentElement = sliderNumber.index;
            diffBlock.forEach((propContainer) => {
                propContainer.children[currentElement].classList.remove("visually-hidden");
            });
        },

        init: () => {
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            compare.propertyStateAfterInit();
            compare.listenSliderActions();
        },
    };
    compare.init();

}