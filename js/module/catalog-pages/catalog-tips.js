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
//Если нажали checkbox и убрали галку - то убираем все открытие тултипы и выходим из функции
                    if (!clickedCheckbox.checked) {
                        filterTips._removeAllStatus();
                        return false;
                    }
//Если нажали checkbox и поставили галку - то запускаем остальные функции
                    event.target.classList.add("clicked");
                    filterTips.action();
                });
            });
        },

//Основная функция показывающая тултипы
        action: () => {
            var html = document.querySelector("html");
            //Если не отработал предыдущий таймаут, а запущен новый - то старый отменяем
            if (html.getAttribute("data-timer-id")) {
                clearTimeout(html.getAttribute("data-timer-id"));
            }
            var clickedCheckbox = document.querySelector(".clicked:checked");
            var clickedElementTopPosition = filterTips._getCheckboxPosition(clickedCheckbox);
            filterTips._removeAllStatus();
            var timerId = filterTips._addStyleForTip(clickedCheckbox, clickedElementTopPosition);
            html.setAttribute("data-timer-id", timerId);
        },

//Возвращается число которое будет использовано для позиционирования тултипа
        _getCheckboxPosition: (activeCheckbox) => {
            var mainContainer = activeCheckbox.closest(".filters__panel");
            var innerContainer = activeCheckbox.closest(".check-box__item");
            var objectTopPosition = innerContainer.getBoundingClientRect().top - mainContainer.getBoundingClientRect().top - 4;
            return objectTopPosition;
        },

//Убираем все активные тултипы
        _removeAllStatus: () => {
            document.querySelectorAll(".filters__tooltip").forEach((tip) => {
                tip.classList.remove("active");
            });
        },

//Убираем все активные тултипы (с передачей параметра в setTimeout)
        _fadeOverTime: (tip) => {
            function fade() {
                tip.classList.remove("active");
            }
            return fade;
        },

//Позиционируем активный тултип + после 7 секунд он исчезает + возвращаем id таймера
        _addStyleForTip: (checkBox, positionTopOfcheckBox) => {
            var mainContainer = checkBox.closest(".filters__panel");
            var currentTooltip = mainContainer.querySelector(".filters__tooltip");
            currentTooltip.classList.add("active");
            currentTooltip.style.top = positionTopOfcheckBox + "px";
            return setTimeout(filterTips._fadeOverTime(currentTooltip), 7000);
        },

        init: () => {
            filterTips.listenAction();
        },
    };
    filterTips.init();
}