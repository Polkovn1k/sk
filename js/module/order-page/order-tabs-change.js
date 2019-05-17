//ТАБЫ В ORDER-PAGE
if (document.querySelector(".order-tabs-change")) {

    var orderTabs = {
        listenClick: () => {
            document.querySelectorAll(".js-order-calc-inner-btn").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (btn.classList.contains("active")) {
                        return false;
                    }
                    var currentContainer = orderTabs._findContainerByBtnsData(btn);
                    orderTabs._removeAllContainerActiveStatus(".js-tab-item");
                    orderTabs._addActiveStatusForContainer(currentContainer);
                    orderTabs._removeActiveStatusForBtn(".js-order-calc-inner-btn");
                    orderTabs._addActiveStatusForBtn(btn);
                });
            });
        },

        listenClickForPayType: () => {
            document.querySelectorAll(".js-pay-tog").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (btn.classList.contains("active")) {
                        return false;
                    }
                    orderTabs._removeActiveStatusForBtn(".js-pay-tog");
                    orderTabs._addActiveStatusForBtn(btn);
                });
            });
        },

        _addActiveStatusForBtn: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        _addActiveStatusForContainer: (container) => {
            container.classList.add("active");
        },

        _removeAllContainerActiveStatus: (tabItem) => {
            document.querySelectorAll(tabItem).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _removeActiveStatusForBtn: (btn) => {
            document.querySelectorAll(btn).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _findContainerByBtnsData: (clickedBtn) => {
            var classnameString = clickedBtn.dataset.classname;
            return document.querySelector("."+classnameString);
        },

        init: () => {
            orderTabs.listenClick();
            orderTabs.listenClickForPayType();
        },
    };
    orderTabs.init();

}