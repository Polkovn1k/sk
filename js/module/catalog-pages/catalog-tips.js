//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".catalog-tips")) {

    //ПРЕЛОАДЕР
    var filterTips = {

        listenAction: () => {
            document.querySelectorAll('.filters__container input[type="checkbox"]').forEach((clickedCheckbox) => {
                clickedCheckbox.addEventListener("change", (event) => {
                    if (clickedCheckbox.checked) {
                        var clickedElementTopPosition = filterTips._getCheckboxPosition(clickedCheckbox);
                        filterTips._removeAllActiveTips();
                        filterTips._addStyleForTip(clickedCheckbox, clickedElementTopPosition);
                        return false;
                    }
                    filterTips._removeAllActiveTips();
                });
            });
        },

        _getCheckboxPosition: (activeCheckbox) => {
            var mainContainer = activeCheckbox.closest(".filters__panel");
            var innerContainer = activeCheckbox.closest(".check-box__item");
            var objectTopPosition = innerContainer.getBoundingClientRect().top - mainContainer.getBoundingClientRect().top - 4;
            return objectTopPosition;
        },

        _removeAllActiveTips: () => {
            document.querySelectorAll(".filters__tooltip").forEach((tip) => {
                tip.classList.remove("active");
            });
        },

        _addStyleForTip: (checkBox, positionTopOfcheckBox) => {
            var mainContainer = checkBox.closest(".filters__panel");
            var currentTooltip = mainContainer.querySelector(".filters__tooltip");
            currentTooltip.classList.add("active");
            currentTooltip.style.top = positionTopOfcheckBox + "px";
        },

        init: () => {
            filterTips.listenAction();
        },















        /*element: document.querySelector(".loader"),

        activeLoader: () => {
            filterTips.element.style.display = "block";
            filterTips.element.classList.add("active");
        },

        hideLoader: () => {
            filterTips.element.classList.remove("active");
            setTimeout(filterTips._afterHideEffect, 700);
        },

        _afterHideEffect: () => {
            filterTips.element.style.display = "none";
        },*/
    };
    //filterTips.activeLoader();
    //filterTips.hideLoader();

}
filterTips.init();