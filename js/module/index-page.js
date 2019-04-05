//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".index-page")) {

    var glide = new Glide('.js-top-slider', {
      type: 'carousel',
      autoplay: 3000,
      hoverpause: true,
    });
    glide.mount();

    var glideAdvantages = new Glide('.js-advantages-slider', {
      perView: 5,
      dragThreshold: false,
      bound: true,
      breakpoints: {
          1023: {
              dragThreshold: 120,
              perView: 1
          }
      }
    });
    glideAdvantages.mount();

    var sliders = document.querySelectorAll(".js-goods-slider");
    var glideGoodsSliders = [];
    var sliderCollection = function (i, item) {
        glideGoodsSliders[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
          perView: 5,
          breakpoints: {
              1280: {
                  perView: 4,
              },
              1023: {
                  perView: 3,
              },
              767: {
                  perView: 2,
              },
              575: {
                  perView: 2,
              },
              480: {
                  perView: 1,
              },
          }
      });
        glideGoodsSliders[i].mount();
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderCollection(i, sliders);
    }

    var articlesSlider = new Glide('.js-articles-slider', {
        gap: 15,
        bound: true,
        rewind: false,
        perView: 4,
        breakpoints: {
            1223: {
                peek: {
                    before: 0,
                    after: 110,
                },
                perView: 3,
            },
            1023: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 3,
            },
            767: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 2,
            },
            575: {
                peek: {
                    before: 0,
                    after: 110,
                },
                perView: 1,
            },
            480: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 1,
            },
        }
    });
    articlesSlider.mount();

    var brandsSlider = new Glide('.js-brands-slider', {
        gap: 15,
        bound: true,
        rewind: false,
        perView: 6,
        breakpoints: {
            1023: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 5,
            },
            767: {
                peek: {
                    before: 0,
                    after: 100,
                },
                perView: 3,
            },
            575: {
                peek: {
                    before: 0,
                    after: 70,
                },
                perView: 3,
            },
            480: {
                peek: {
                    before: 0,
                    after: 70,
                },
                perView: 2,
            },
        }
    });
    brandsSlider.mount();

}