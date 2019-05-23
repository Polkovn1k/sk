//СЛАЙДЕР ТОВАРА - (ДЕТАЛЬНАЯ)
if (document.querySelector(".product-item-slider")) {

    $(".js-product-slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      //lazyLoad: 'ondemand',
      autoplay: true,
      arrows: false,
      fade: false,
      asNavFor: ".js-product-slider-nav",
            responsive: [
          {
            breakpoint: 767,
            settings: {
              dots: true,
              arrows: false
            }
          },
        ]
    });
    $(".js-product-slider-nav").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".js-product-slider-for",
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0
    });

}