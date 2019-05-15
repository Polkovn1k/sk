//ПРЕЛОАДЕР НА СТРАНИЦЕ ОФОРМЛЕНИЯ ЗАКАЗА

if (document.querySelector(".order-loader")) {

    var orderLoader = {

        element: document.querySelector(".order__loader"),

        activeLoader: () => {
            orderLoader.element.style.display = "block";
            orderLoader.element.classList.add("active");
        },

        hideLoader: () => {
            orderLoader.element.classList.remove("active");
            setTimeout(orderLoader._afterHideEffect, 700);
        },

        _afterHideEffect: () => {
            orderLoader.element.style.display = "none";
        },
    };
//orderLoader.activeLoader(); - показать прелоадер
//orderLoader.hideLoader(); - скрыть прелоадер

}