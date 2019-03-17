
//---------------------------------------------------------------
//раскрытие пунктов навигаций в футере
var footerNav = {
    catalogButtons: ".js-footer-nav__nav-tog",

    catalogCollapsedContent: ".js-footer-nav__links-list",

    clickListener: (btns) => {
        document.querySelectorAll(btns).forEach(function(item) {
            item.addEventListener("click", (event) => {
                if (!item.classList.contains("active-btn")) {
                    footerNav.removeAllBtnsActive();
                    footerNav.removeAllContentsHeight();
                    item.classList.add("active-btn");
                    footerNav.openDataToIdContent(item);
                    return false;
                }
                footerNav.removeAllBtnsActive();
                footerNav.removeAllContentsHeight();
            });
        });
    },

    removeAllBtnsActive: () => {
        document.querySelectorAll(footerNav.catalogButtons).forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

    removeAllContentsHeight: () => {
        document.querySelectorAll(footerNav.catalogCollapsedContent).forEach((element) => {
            element.style.removeProperty("max-height");
        });
    },

    openDataToIdContent: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        if (item.classList.contains("active-btn")) {
            findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
            return false;
        }
    },
};
footerNav.clickListener(footerNav.catalogButtons);
//тоглер подписки в футера
var subscription = {
    subscriptionElement: [".js-subscription-footer-btn", ".js-subscription-footer-input"],

    togleElements: () => {
        var checkedSubscription = document.querySelector(".js-footer-switch");
        checkedSubscription.addEventListener("click", (event) => {
            subscription.subscriptionElement.forEach((element) => {
                document.querySelector(element).classList.toggle("active");
            });
        });
    },
};
subscription.togleElements();
//модалка входа/регистрации
var joinModal = {
    container: document.getElementById("profile-block"),
    joinBtns: document.querySelectorAll(".js-profile__tab"),
    joinItems: document.querySelectorAll(".js-profile-item"),
    btnToDefault: document.querySelectorAll(".js-default-overlay"),

    init: () => {
        joinModal.joinBtns.forEach(function(item) {
            item.addEventListener("click", function(event) {
                joinModal._removeBtnActiveClasses(joinModal.joinBtns);
                joinModal._removeBlockActiveClasses(joinModal.joinItems);
                joinModal._openBlock(event.target);
                joinModal._activeBtn(event.target);
            });
        });
    },

    resetOverlayView: () => {
        joinModal.btnToDefault.forEach(function(item) {
            item.addEventListener("click", function(event) {
                if (!joinModal.container.classList.contains("opened")) {
                    joinModal._removeBtnActiveClasses(joinModal.joinBtns);
                    joinModal._removeBlockActiveClasses(joinModal.joinItems);
                    document.querySelector(".js-profile-join").classList.add("active");
                    document.querySelector(".js-first-tab").classList.add("active-btn");
                    return false;
                }
            });
        });
    },

    _removeBtnActiveClasses: (allBtns) => {
        allBtns.forEach(function(bItem) {
            bItem.classList.remove("active-btn");
        });
    },

    _removeBlockActiveClasses: (allBlocks) => {
        allBlocks.forEach(function(jItem) {
            jItem.classList.remove("active");
        });
    },

    _openBlock: (opt) => {
        var currentBtn = opt.dataset.toClass;
        for (var i = 0; i < joinModal.joinItems.length; i++) {
            if (joinModal.joinItems[i].classList.contains(currentBtn)) {
                joinModal.joinItems[i].classList.add("active");
            }
        };
    },

    _activeBtn: (opt) => {
        for (var i = 0; i < joinModal.joinBtns.length; i++) {
            opt.classList.add("active-btn");
        };
    },
};
joinModal.init();
joinModal.resetOverlayView();