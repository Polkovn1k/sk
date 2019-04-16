//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".hide-sort")) {

    var hideSort = {
        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (item.classList.contains("js-hide-sort")) {
                        document.querySelector(".sort").classList.add("hide");
                        return false;
                    }
                    document.querySelector(".sort").classList.remove("hide");
                });
            });
        },

        init: () => {
            hideSort.listenClick();
        },
    };
    hideSort.init();

}