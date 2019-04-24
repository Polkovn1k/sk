//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".compare-slider")) {

    var sliders = document.querySelectorAll(".js-compare-slider");
    var glideGoodsSliders = [];
    var sliderCollection = function (i, item) {
        glideGoodsSliders[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
          perView: 6,
          breakpoints: {
              1280: {
                  perView: 4,
              },
              1023: {
                  perView: 1,
              },
          }
      });
        glideGoodsSliders[i].mount();
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderCollection(i, sliders);
    }

}