//ПОДГРУЗКА AJAX НА ГЛАВНОЙ (блок жидкостей)
if (document.querySelector(".index-page")) {

    var loadAfterClick = {

        listenBtnsClick: () => {
            document.querySelectorAll(".js-load-ajax").forEach((button) => {
                var ajaxString;
                button.addEventListener("click", (event) => {
                    if (ajaxString) return false;
                    ajaxString = loadAfterClick._getJsonString(button, "path");
                    loadAfterClick._loadAjaxAndActions(ajaxString, button);
                });
            });
        },

        _getJsonString: (clickedBtn, findString) => {
            switch (findString) {
                case "overlay":
                    return clickedBtn.dataset.overlayId;
                    break;
                case "path":
                    return clickedBtn.dataset.ajax;
                    break;
            }
        },

        _loadAjaxAndActions: (jsonPath, clickedBtn) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", (evt) => {
                var parsedJson = JSON.parse(xhr.responseText);
                var htmlFragment = loadAfterClick._convertJsonToHtmlFragment(parsedJson);
                loadAfterClick._appendHtml(htmlFragment, clickedBtn);
            });
            xhr.open("GET", "json/"+jsonPath+".json");
            xhr.send();
        },

        _convertJsonToHtmlFragment: (loadedAjax) => {
            return document.createRange().createContextualFragment(loadedAjax);
        },

        _appendHtml: (htmlContent, button) => {
            var openedOverlayIdString = loadAfterClick._getJsonString(button, "overlay");
            document.querySelector("#"+openedOverlayIdString+" .index-overlay__content").appendChild(htmlContent);
        },

        init: () => {
            loadAfterClick.listenBtnsClick();
        },
    };
    loadAfterClick.init();

}