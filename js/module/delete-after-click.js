//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".delete-after-click")) {

    var hideElementPerClick = {
        listenClick: () => {
            document.querySelectorAll(".js-btn-delete").forEach((item) => {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    item.closest(".js-deleted-element").remove();
                });
            });
        },

        init: () => {
            hideElementPerClick.listenClick();
        },
    };
    hideElementPerClick.init();

}