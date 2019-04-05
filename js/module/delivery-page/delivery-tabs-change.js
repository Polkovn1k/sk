//ТАБЫ В DELIVERY-PAGE
if (document.querySelector(".delivery-tabs-change")) {

    var orderTabs = {
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

        _removeActiveStatusForBtn: (btn) => {
            document.querySelectorAll(btn).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _addActiveStatusForBtn: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        init: () => {
            orderTabs.listenClickForPayType();
        },
    };
    orderTabs.init();

}