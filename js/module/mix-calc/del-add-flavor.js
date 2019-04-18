//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".del-add-flavor")) {

    var delAndAddFlavor = {

        btnCollection: document.querySelectorAll(".js-mix-calc-del-flavor"),

//----------------удаление элементов

        listenRemoveClick: () => {
            var dynamicCollection = Array.prototype.slice.call(document.querySelectorAll(".js-mix-calc-del-flavor"));
            dynamicCollection.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    btn.closest(".mix-calc__col").remove();
                    var btnCollection = document.querySelectorAll(".js-mix-calc-del-flavor");
                    if (btnCollection.length <= 1) {
                        btnCollection[0].classList.add("hide");
                        return false;
                    }
                })
            });
        },

        elementStatusAfterInit: () => {
            if (delAndAddFlavor.btnCollection.length == 1) {
                delAndAddFlavor.btnCollection[0].classList.add("hide");
            }
        },

//----------------добавление элементов

        listenAddClick: () => {

        },

        init: () => {
            delAndAddFlavor.elementStatusAfterInit();
            delAndAddFlavor.listenRemoveClick();
            delAndAddFlavor.listenAddClick();
        }

    }
    delAndAddFlavor.init();

}