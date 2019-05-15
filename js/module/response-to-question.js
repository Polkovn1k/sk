//КОММЕНТАРИИ К ОТВЕТАМ
if (document.querySelector(".response-to-question")) {

    var articlePage = {
        listenBtnCallingReplyForm: () => {
            document.querySelectorAll(".js-reply-btn").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    articlePage._removeAllFormActive();
                    articlePage._removeAllBtnsHidden();
                    articlePage._addHiddenToClickedBtns(item);
                    var clickedBtnParent = articlePage._findClickedBtnsParent(item);
                    var findRequiredElement = articlePage._findSiblingAndMakeActive(clickedBtnParent);
                    articlePage._doFormActive(findRequiredElement);
                });
            });
        },

        listenBtnClosingReplyForm: () => {
            document.querySelectorAll(".js-btn-cancel").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    articlePage._removeAllFormActive();
                    articlePage._removeAllBtnsHidden();
                });
            });
        },

        _addHiddenToClickedBtns: (clickedBtn) => {
            clickedBtn.classList.add("hidden");
        },

        _doFormActive: (element) => {
            element.classList.add("active");
        },

        _findClickedBtnsParent: (clickedBtn) => {
            return clickedBtn.parentElement;
        },

        _findSiblingAndMakeActive: (element) => {
            return element.nextElementSibling;
        },

        _removeAllFormActive: () => {
            document.querySelectorAll(".js-discussion-form").forEach((item) => {
                item.classList.remove("active");
            });
        },

        _removeAllBtnsHidden: () => {
            document.querySelectorAll(".js-reply-btn").forEach((item) => {
                item.classList.remove("hidden");
            });
        },

        init: () => {
            articlePage.listenBtnCallingReplyForm();
            articlePage.listenBtnClosingReplyForm();
        },
    };
    articlePage.init();

}