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















//---------------------------------

var loadAjaxContent = {

    xhr: new XMLHttpRequest(),

    callAjaxBtn: document.querySelector(".js-ajax-btn"),

    parentContainer: document.getElementById("products-list-container"),

    ITEMS_PER_CLICK: 6,

    fragments: document.createDocumentFragment(),

    ajaxObject: null,

    listenClick: () => {
        loadAjaxContent.callAjaxBtn.addEventListener("click", function (event) {
            if (loadAjaxContent.xhr.status === 200) {
                loadAjaxContent._addContentAfterClick();
                return false;
            }
            loadAjaxContent.xhr.addEventListener('load', function () {
                loadAjaxContent.ajaxObject = JSON.parse(loadAjaxContent.xhr.responseText);
                event.preventDefault();
                loadAjaxContent._addContentAfterClick();
              });
            loadAjaxContent.xhr.open("GET", "json/articleData.json");
            loadAjaxContent.xhr.send();
        });
    },

    _addContentAfterClick: () => {
        for (var i = 0; i < loadAjaxContent.ITEMS_PER_CLICK; i++) {
            if (loadAjaxContent.ajaxObject.length <= 0) {
                loadAjaxContent.callAjaxBtn.classList.add("visually-hidden");
                continue;
            }
            var frag = document.createRange().createContextualFragment(loadAjaxContent.ajaxObject[0]);
            loadAjaxContent.fragments.appendChild(frag);
            loadAjaxContent.ajaxObject.shift();
        };
        loadAjaxContent.parentContainer.appendChild(loadAjaxContent.fragments);
    },

    init: () => {
        loadAjaxContent.listenClick();
    },
};
loadAjaxContent.init();