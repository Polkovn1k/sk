//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".grid-tog")) {

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
                document.querySelectorAll(".js-products-list-container").forEach((container) => {
                    container.classList.remove(elements.dataset.toClass);
                });
                elements.classList.remove("active-btn");
            });
            document.querySelectorAll(".js-products-list-container").forEach((container) => {
                container.classList.add(opt.dataset.toClass);
            });
            opt.classList.add("active-btn");
        },

        init: () => {
            gridStyle.listenClick();
        },
    };
    gridStyle.init();

}