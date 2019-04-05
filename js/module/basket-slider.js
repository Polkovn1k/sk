//СЛАЙДЕР В КОРЗИНЕ

if (document.querySelector(".basket-slider")) {

    var glideAdvantages = new Glide('.js-advantages-slider', {
      perView: 1,
      dragThreshold: 120,
      bound: true,
    });
    glideAdvantages.mount();

}