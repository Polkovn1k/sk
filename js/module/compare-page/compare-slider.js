//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".compare-slider")) {

    var sliders = document.querySelectorAll(".js-compare-slider");
    var glideCompareSliders = [];
    var sliderCollection = function (i, item) {
        glideCompareSliders[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
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

}

//ОБНУЛЯЕМ ПОЗИЦИЮ АКТИВНЫЙХ СЛАЙДЕРОВ, ЕСЛИ ОКНО РЕСАЙЗИТСЯ (ИЛИ МЕНЯЕТСЯ ОРИЕНТАЦИЯ УСТРОЙСТВА)
if (document.querySelector(".js-main-compare-slider")) {

    var compare = {

        START_DESKTOP_WIDTH: 1024,

        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                if (document.documentElement.clientWidth <= compare.START_DESKTOP_WIDTH) return false;
                //меняем позицию только у 2-го слайдера, т.к. 1-ый скрыт на десктопе
                glideCompareSliders[1].update({ startAt: 0 });
            });
        },

        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                if (document.documentElement.clientWidth <= compare.START_DESKTOP_WIDTH) return false;
                //меняем позицию только у 2-го слайдера, т.к. 1-ый скрыт на десктопе
                glideCompareSliders[1].update({ startAt: 0 });
            });
        },

        init: () => {
            compare.listenTurnDevice();
            compare.listenResizeDevice();
        },
    };
    compare.init();

}