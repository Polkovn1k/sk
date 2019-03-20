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
//подгрузка ajax'а
var callAjaxContent = document.querySelector(".js-ajax-content");
var xhr = new XMLHttpRequest();
var fragments = document.createDocumentFragment();
var articleParent = document.getElementById("products-list-container");
var ajaxResponse;


function addItem() {
    var qwerty = ajaxResponse.length;
    for (var i = 0; i < 6; i++) {
        var frag = document.createRange().createContextualFragment(ajaxResponse[0]);
        fragments.appendChild(frag);
        ajaxResponse.shift();
    };
    articleParent.appendChild(fragments);
};

callAjaxContent.addEventListener("click", function (event) {
    if (xhr.status === 200) {
        addItem();
        return false;
    }
    xhr.addEventListener('load', function () {
        ajaxResponse = JSON.parse(xhr.responseText);
        event.preventDefault();
        addItem();
      });
    xhr.open("GET", "json/articleData.json");
    xhr.send();
});