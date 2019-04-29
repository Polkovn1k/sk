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

        DESKTOP_XL_SIZE: 1395,

        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                if (document.documentElement.clientWidth <= compare.START_DESKTOP_WIDTH) return false;
                //меняем позицию только у 2-го слайдера, т.к. 1-ый скрыт на десктопе
                glideCompareSliders[1].update({ startAt: 0 });
                if (document.documentElement.clientWidth <= compare.DESKTOP_XL_SIZE) return false;
                //устраняем баг, при котором в col-xl при ресайзе показывал только один товар
                glideCompareSliders[1].update({ perView: 6 });
            });
        },

        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                if (document.documentElement.clientWidth <= compare.START_DESKTOP_WIDTH) return false;
                //меняем позицию только у 2-го слайдера, т.к. 1-ый скрыт на десктопе
                glideCompareSliders[1].update({ startAt: 0 });
                if (document.documentElement.clientWidth <= compare.DESKTOP_XL_SIZE) return false;
                //устраняем баг, при котором в col-xl при ресайзе показывал только один товар
                glideCompareSliders[1].update({ perView: 6 });
            });
        },

        someAction: () => {
            glideCompareSliders[0].on(["mount.before", "run"], function() {
                var diffBlock = document.querySelectorAll(".js-parameter-diff");
                console.dir(diffBlock);
                var currentElement = glideCompareSliders[0].index;
                console.log(currentElement);
            });
        },

        init: () => {
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            compare.someAction();
        },
    };
    compare.init();

}

/*for (var i = 0; i < glideCompareSliders.length; i++) {
    glideCompareSliders[i].on(["mount.before", "run"], function() {
      console.log(glideCompareSliders[0].index);
      console.log(glideCompareSliders[1].index);
    })
}*/