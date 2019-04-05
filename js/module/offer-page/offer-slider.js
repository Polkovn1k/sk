//СЛАЙДЕР НА СТРАНИЦЕ OFFER-PAGE
if (document.querySelector(".offer-slider")) {

    var sliders = document.querySelectorAll(".js-offer-slider");
    var glideOffer = [];

    var sliderOfferCollection = function (i, item) {
        glideOffer[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
          perView: 5,
          peek: {
              before: 0,
              after: 100,
          },
          breakpoints: {
              1219: {
                  peek: {
                      before: 0,
                      after: 100,
                  },
                  perView: 4,
              },
              1023: {
                  peek: {
                      before: 0,
                      after: 50,
                  },
                  perView: 3,
              },
              767: {
                  peek: {
                      before: 0,
                      after: 100,
                  },
                  perView: 2,
              },
              575: {
                  peek: {
                      before: 0,
                      after: 150,
                  },
                  perView: 1,
              },
              480: {
                  peek: {
                      before: 0,
                      after: 50,
                  },
                  perView: 1,
              },
          }
      });
        glideOffer[i].mount();
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderOfferCollection(i, sliders);
    }

}