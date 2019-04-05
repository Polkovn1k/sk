//ПЕКЛЮЧЕНИЕ ОТОБРАЖЕНИЯ СОРТИРОВОК
if (document.querySelector(".sort-change")) {

    var sortToggle = {
        listenClickInSort: () => {
            document.querySelectorAll(".js-sort").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    sortToggle._removeAllBtnsActive(".js-sort");
                    sortToggle._addActiveForBtns(item);
                    sortToggle._toggleArrowDirection(event.currentTarget);
                });
            });
        },

        listenClickInAddSort: () => {
            document.querySelectorAll(".js-add-sort").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    sortToggle._removeAllBtnsActive(".js-add-sort");
                    sortToggle._addActiveForBtns(item);
                });
            });
        },

        _toggleArrowDirection: (currentTarget) => {
          var allElements = document.querySelectorAll(".js-sort");
          for (var i = 0; i < allElements.length; i++) {
              if (allElements[i] == currentTarget) {
                  sortToggle._toggleCurrentElementArrow(allElements[i]);
                  continue;
              }
              sortToggle._removeAllDirection(allElements[i]);
          }
        },

        _removeAllDirection: (item) => {
            if (item.classList.contains("down")) {
                item.classList.remove("down");
            }
            if (item.classList.contains("up")) {
                item.classList.remove("up");
            }
        },

        _toggleCurrentElementArrow: (clickedBtn) => {
            if (clickedBtn.classList.contains("down") || clickedBtn.classList.contains("up")) {
              clickedBtn.classList.toggle("down");
              clickedBtn.classList.toggle("up");
              return false;
            }
            clickedBtn.classList.add("down");
        },

        _removeAllBtnsActive: (element) => {
            document.querySelectorAll(element).forEach((item) => {
                item.classList.remove("active");
            });
        },

        _addActiveForBtns: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        init: () => {
            sortToggle.listenClickInSort();
            sortToggle.listenClickInAddSort();
        },
    };
    sortToggle.init();

}