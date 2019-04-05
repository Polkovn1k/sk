//РАДИО КНОПКИ В DELIVERY-PAGE
if (document.querySelector(".delivery-radio-change")) {

    var openCheckedRadioContainer = {
        listenClick: () => {
            document.querySelectorAll(".js-delivery-calc").forEach((radioBtn) => {
                radioBtn.addEventListener("click", (event) => {
                    var radioParent = openCheckedRadioContainer._findClickedRadioParent(radioBtn);
                    openCheckedRadioContainer._removeParentActiveStatus();
                    openCheckedRadioContainer._addParentActiveStatus(radioParent);
                });
            });
        },

        _findClickedRadioParent: (radio) => {
            return radio.closest(".delivery-calc__item");
        },

        _removeParentActiveStatus: () => {
            document.querySelectorAll(".delivery-calc__item").forEach((element) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        },

        _addParentActiveStatus: (parent) => {
            parent.classList.add("active");
        },

        init: () => {
            openCheckedRadioContainer.listenClick();
        },
    };
    openCheckedRadioContainer.init();

}