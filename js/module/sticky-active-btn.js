//СТИЛИ НАВИГАЦИЯ - ОБРАБОТЧИК КЛИКА КНОПОК В STICKY НАВИГАЦИИ
if (document.querySelector(".sticky-active-btn")) {

    var anchorTransition = {

        listenBtnClick: () => {
            document.querySelectorAll(".js-sticky-btn").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    anchorTransition._removeAllBtnsActive();
                    anchorTransition._addActiveForBtns(item);
                });
            });
        },

        _removeAllBtnsActive: () => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.classList.remove("active-btn");
            });
        },

        _addActiveForBtns: (clickedBtn) => {
            clickedBtn.classList.add("active-btn");
        },

        init: () => {
            anchorTransition.listenBtnClick();
        },
    };
    anchorTransition.init();

}