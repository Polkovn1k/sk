//РАДИО КНОПКИ В ORDER-PAGE
if (document.querySelector(".order-radio-change")) {

    var openCheckedRadioContainer = {
        listenClick: () => {
            document.querySelectorAll(".js-order-calc").forEach((radioBtn) => {
                radioBtn.addEventListener("click", (event) => {
                    var radioParent = openCheckedRadioContainer._findClickedRadioParent(radioBtn);
                    openCheckedRadioContainer._removeParentActiveStatus();
                    openCheckedRadioContainer._addParentActiveStatus(radioParent);
                });
            });
        },

        _findClickedRadioParent: (radio) => {
            return radio.closest(".order-calc__item");
        },

        _removeParentActiveStatus: () => {
            document.querySelectorAll(".order-calc__item").forEach((element) => {
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