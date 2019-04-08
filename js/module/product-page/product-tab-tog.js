//ПЕРЕКЛЮЧАТЕЛЬ ВИДА ТАБОВ НА СТРАНИЦЕ ТОВАРА
if (document.querySelector(".product-tab-tog")) {

    var gridStyle = {

        listenClick: () => {
            document.querySelectorAll(".js-sort-view").forEach(function(item) {
                item.addEventListener("click", function(event) {
                    gridStyle._switch(item);
                });
            });
        },

        _switch: (opt) => {
            document.querySelectorAll(".js-sort-view").forEach(function(elements) {
                document.getElementById("products-list-container").classList.remove(elements.dataset.toClass);
                elements.classList.remove("active-btn");
            });
            document.getElementById("products-list-container").classList.add(opt.dataset.toClass);
            opt.classList.add("active-btn");
        },

        init: () => {
            gridStyle.listenClick();
        },
    };
    gridStyle.init();

}