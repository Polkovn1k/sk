//ПЕРЕКЛЮЧАТЕЛЬ ВИДА ТАБОВ НА СТРАНИЦЕ ТОВАРА
if (document.querySelector(".product-tab-tog")) {

    var productTabs = {

        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach(function(clickedBtn) {
                clickedBtn.addEventListener("click", function(event) {
                    if (clickedBtn.classList.contains(".active")) return
                    productTabs._removeAllActiveClasses(clickedBtn);
                    productTabs._addActiveForClickedBtn(clickedBtn);
                    productTabs._findContainerByBtnAndSetActive(clickedBtn);
                });
            });
        },

        _removeAllActiveClasses: (btn) => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".js-tabs-content").forEach((item) => {
                item.classList.remove("active");
            });
        },

        _addActiveForClickedBtn: (btn) => {
            btn.classList.add("active");
        },

        _findContainerByBtnAndSetActive: (btn) => {
            document.getElementById(btn.dataset.toId).classList.add("active");
        },

        init: () => {
            productTabs.listenClick();
        },
    };
    productTabs.init();

}