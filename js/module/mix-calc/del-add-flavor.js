//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".del-add-flavor")) {

    var delAndAddFlavor = {

        btnCollection: document.querySelectorAll(".js-mix-calc-del-flavor"),

//----------------удаление элементов

        listenRemoveClick: () => {
            document.querySelectorAll(".js-mix-calc-del-flavor").forEach((btn) => {
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
            document.querySelector(".js-mix-calc-add-flavor").addEventListener("click", () => {
                var clonedNode = document.querySelector(".js-flavor-container:first-child").cloneNode(true);
                delAndAddFlavor._removeValandClassFromClonedNode(clonedNode);
                document.querySelector(".js-flavor-parent").appendChild(clonedNode);
                delAndAddFlavor.listenRemoveClick();
                delAndAddFlavor._checkHideStatusForFirstDelBtn();
            })
        },

        _removeValandClassFromClonedNode: (clonedElement) => {
            var allInnerInputs = clonedElement.querySelectorAll("input");
            allInnerInputs.forEach((input) => {
                input.value = "";
            });
            if (clonedElement.querySelector(".mix-calc__del-element").classList.contains("hide")) {
                clonedElement.querySelector(".hide").classList.remove("hide");
            }
        },

        _checkHideStatusForFirstDelBtn: () => {
            var delBtn = document.querySelectorAll(".js-mix-calc-del-flavor");
            if (delBtn.length > 1) {
                delBtn[0].classList.remove("hide");
            }
        },

        init: () => {
            delAndAddFlavor.elementStatusAfterInit();
            delAndAddFlavor.listenRemoveClick();
            delAndAddFlavor.listenAddClick();
        }

    }
    delAndAddFlavor.init();

}