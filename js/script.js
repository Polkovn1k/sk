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













function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  var qwe = {
    top: box.top + pageYOffset,
  };
  return qwe.top - 150;
}













var goToAnchor = {
    listenClick: () => {
        document.querySelectorAll(".js-sticky-btn").forEach((item) => {
            item.addEventListener("click", (event) => {
              event.preventDefault();
              var currentElement = goToAnchor._findClickedBtnsDataToId(item);
              window.qwerty = currentElement.getBoundingClientRect();
              console.log(getCoords(currentElement));
              window.scrollTo(0, getCoords(currentElement));
            });
        });
    },

    _findClickedBtnsDataToId: (clickedBtn) => {
        return document.getElementById(clickedBtn.dataset.findId);
    },

    _scrollToCurrentElement: () => {

    },

    init: () => {
        goToAnchor.listenClick();
    },
};
goToAnchor.init();