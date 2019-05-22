//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".index-page")) {

    var indexModal = {

        listenClickForBtnWhichCallOverlay: () => {
            document.querySelectorAll(".js-liquid-prop-list").forEach((btnCallingOverlays) => {
                btnCallingOverlays.addEventListener("click", (event) => {
                    indexModal.action(btnCallingOverlays);
                });
            });
        },

        action: (btnCallingOverlays) => {
            indexModal._hideAllOverlays();
            indexModal._btnState(btnCallingOverlays);
            indexModal._findOverlayByClickedBtn(btnCallingOverlays);
        },

        _hideAllOverlays: () => {
            document.querySelectorAll(".js-liquid-overlay").forEach((overlay) => {
                overlay.classList.remove("opened");
            });
        },

        _btnState: (item) => {
            let btns = document.querySelectorAll(".js-liquid-prop-list");
            for (var i = 0; i < btns.length; i++) {
                if (btns[i] === event.target) {
                    btns[i].classList.toggle("active-btn");
                    continue;
                }
                btns[i].classList.remove("active-btn");
            }
        },

        _findOverlayByClickedBtn: (clickedBtn) => {
            var overlayIdForClickedElement = clickedBtn.dataset.liquid;
            if (clickedBtn.classList.contains("active-btn")) {
                document.getElementById(overlayIdForClickedElement).classList.add("opened");
            }
        },

        init: () => {
            indexModal.listenClickForBtnWhichCallOverlay();
        },
    };
    indexModal.init();

}