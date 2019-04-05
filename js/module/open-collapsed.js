//ПЛАВНОЕ ОТКРЫТИЕ СХЛОПНУТЫХ ЭЛЕМЕНТОВ
if (document.querySelector(".open-collapsed")) {

    var expandCollapsedItems = {

        TRANSITION_TIME: "300",

        showCollapsedElement: () => {
            document.querySelectorAll(".js-call-collapsed-element").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    if (item.classList.contains("active-btn")) {
                        expandCollapsedItems._removeBtnActive(item);
                        var currentCollapsedElement = expandCollapsedItems._findClickedBtnsDataToId(item);
                        expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                        expandCollapsedItems._deleteInlineStyleFromCollapsed(currentCollapsedElement);
                        return false;
                    }
                    expandCollapsedItems._addBtnActive(item);
                    var currentCollapsedElement = expandCollapsedItems._findClickedBtnsDataToId(item);
                    expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                    expandCollapsedItems._deleteMaxHeightFromExpanded(currentCollapsedElement);
                });
            });
        },

        _addBtnActive: (clickedBtn) => {
            clickedBtn.classList.add("active-btn");
        },

        _removeBtnActive: (clickedBtn) => {
            clickedBtn.classList.remove("active-btn");
        },

        _deleteMaxHeightFromExpanded: (item) => {
            setTimeout(function() {
                item.style.maxHeight = "none";
            }, expandCollapsedItems.TRANSITION_TIME);
        },

        _deleteInlineStyleFromCollapsed: (item) => {
            setTimeout(function() {
                item.style.removeProperty("max-height");
            }, 50);
        },

        _findClickedBtnsDataToId: (clickedBtn) => {
            return document.getElementById(clickedBtn.dataset.findId);
        },

        _getTrueElementHeight: (collapsedElement) => {
            collapsedElement.style.maxHeight = collapsedElement.scrollHeight + "px";
        },
    };
    expandCollapsedItems.showCollapsedElement();

}