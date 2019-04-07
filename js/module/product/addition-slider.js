//СЛАЙДЕР ПОСЛЕДНИХ ПРОСМОТРЕННЫХ ТОВАРОВ
if (document.querySelector(".js-addition-slider")) {

    var watchedProducts = new Glide(".js-addition-slider", {
        gap: -1,
        bound: true,
        rewind: false,
        perView: 4,
        peek: {
            before: 0,
            after: 0,
        },
        breakpoints: {
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
                    after: 50,
                },
                perView: 2,
            },
            575: {
                peek: {
                    before: 0,
                    after: 100,
                },
                perView: 1,
            },
            480: {
                peek: {
                    before: 0,
                    after: 30,
                },
                perView: 1,
            },
        }
    });
    watchedProducts.mount();

}