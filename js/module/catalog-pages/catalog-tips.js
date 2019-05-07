//ПОДСКАЗКИ В ФИЛЬТРЕ
if (document.querySelector(".catalog-tips")) {

    var filterTips = {

        listenAction: () => {
            var checkbox = document.querySelectorAll('.filters__container input[type="checkbox"]');
            checkbox.forEach((clickedCheckbox) => {
                clickedCheckbox.addEventListener("change", (event) => {
//Убираем все классы clicked
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].classList.remove("clicked");
                    };
//Ставим clicked только на нажатом элементе
                    event.target.classList.add("clicked");
                    if (!clickedCheckbox.checked) {
                        filterTips._removeAllStatus();
                        return false;
                    }
                    filterTips.action();
                });
            });
        },

        action: () => {
            var clickedCheckbox = document.querySelector(".clicked:checked");
            var clickedElementTopPosition = filterTips._getCheckboxPosition(clickedCheckbox);
            filterTips._removeAllStatus();
            filterTips._addStyleForTip(clickedCheckbox, clickedElementTopPosition);
        },

        _getCheckboxPosition: (activeCheckbox) => {
            var mainContainer = activeCheckbox.closest(".filters__panel");
            var innerContainer = activeCheckbox.closest(".check-box__item");
            var objectTopPosition = innerContainer.getBoundingClientRect().top - mainContainer.getBoundingClientRect().top - 4;
            return objectTopPosition;
        },

        _removeAllStatus: () => {
            document.querySelectorAll(".filters__tooltip").forEach((tip) => {
                tip.classList.remove("active");
            });
        },

        _fadeOverTime: (tip) => {
            function fade() {
                tip.classList.remove("active");
            }
            return fade;
        },

        _addStyleForTip: (checkBox, positionTopOfcheckBox) => {
            var mainContainer = checkBox.closest(".filters__panel");
            var currentTooltip = mainContainer.querySelector(".filters__tooltip");
            currentTooltip.classList.add("active");
            currentTooltip.style.top = positionTopOfcheckBox + "px";
            setTimeout(filterTips._fadeOverTime(currentTooltip), 7000);
        },

        init: () => {
            filterTips.listenAction();
        },
    };

}
filterTips.init();