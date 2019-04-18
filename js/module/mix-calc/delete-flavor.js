//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".delete-flavor")) {

    var delAndAddFlavor = {

        listenClick: () => {
            var dynamicCollection = Array.prototype.slice.call(document.querySelectorAll(".js-mix-calc-del-flavor"));
            dynamicCollection.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    if (document.querySelectorAll(".js-mix-calc-del-flavor").length <= 1) {
                        return false;
                    }
                    btn.closest(".mix-calc__col").remove();
                })
            });
        },

        init: () => {
            delAndAddFlavor.listenClick();
        }

    }
    delAndAddFlavor.init();

}