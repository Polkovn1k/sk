//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".hide-sort")) {

    var hideSort = {
        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (item.classList.contains("js-hide-sort")) {
                        document.querySelector(".sort").classList.add("visually-hidden");
                        document.querySelector(".search-result").classList.add("col-lg-12");
                        document.querySelector(".js-hide").classList.add("visually-hidden");
                        return false;
                    }
                    document.querySelector(".sort").classList.remove("visually-hidden");
                    document.querySelector(".search-result").classList.remove("col-lg-12");
                    document.querySelector(".js-hide").classList.remove("visually-hidden");
                });
            });
        },

        init: () => {
            hideSort.listenClick();
        },
    };
    hideSort.init();

}