//ПЕРЕХОД ПО ЯКОРЮ
if (document.querySelector(".transition-to-anchor")) {

    var goToAnchor = {

        listenClick: () => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.addEventListener("click", (event) => {
                  event.preventDefault();
                  var currentElement = goToAnchor._findClickedBtnsDataToId(item);
                  window.scrollTo(0, goToAnchor._getCoords(currentElement));
                });
            });
        },

        _findClickedBtnsDataToId: (clickedBtn) => {
            return document.getElementById(clickedBtn.dataset.findId);
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        _getCoords: (elem) => {
            return elem.getBoundingClientRect().top + pageYOffset - goToAnchor._getHeaderHeight(".js-header");
        },

        init: () => {
            goToAnchor.listenClick();
        },
    };
    goToAnchor.init();

}