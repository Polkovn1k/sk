//ПРЕЛОАДЕР НА КНОПКУ В ДЕТАЛЬНОЙ СТРАНИЦЕ

if (document.querySelector(".btn-loader")) {

    var btnLoader = {

        element: document.querySelector(".js-btn-loader"),

        activeLoader: () => {
            btnLoader.element.classList.add("active");
        },

        hideLoader: () => {
            btnLoader.element.classList.remove("active");
        },

    };
//btnLoader.activeLoader(); - показать прелоадер
//btnLoader.hideLoader(); - скрыть прелоадер

}