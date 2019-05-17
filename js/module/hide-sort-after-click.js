//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".hide-sort")) {

    var hideSort = {
        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (item.classList.contains("js-hide-sort")) {
                        document.querySelector(".sort").classList.add("disabled");
                        document.querySelector(".filters").classList.add("disabled");
                        return false;
                    }
                    document.querySelector(".sort").classList.remove("disabled");
                    document.querySelector(".filters").classList.remove("disabled");
                });
            });
        },

        init: () => {
            hideSort.listenClick();
        },
    };
    hideSort.init();

}