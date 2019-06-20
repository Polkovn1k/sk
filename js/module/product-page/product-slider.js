//СЛАЙДЕР ТОВАРА - (ДЕТАЛЬНАЯ)
if (document.querySelector(".js-product-slider-for")) {

    var NAV_FOR_SLIDE_QUANTITY = 4;

    $(".js-product-slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
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
      slidesToShow: NAV_FOR_SLIDE_QUANTITY,
      slidesToScroll: 1,
      asNavFor: ".js-product-slider-for",
      dots: false,
      focusOnSelect: true,
      settings: {
        swipe: true,
      }
    });

//Если кол-во слайдов ниже 4-х, то отключаем движение нижнего слайдера
    if (document.querySelectorAll(".js-product-slider-nav .product-slider__nav-item").length < NAV_FOR_SLIDE_QUANTITY) {
        document.querySelector(".js-product-slider-nav .slick-track").classList.add("block-translate");
    }

}