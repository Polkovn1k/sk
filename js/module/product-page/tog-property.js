//ПЕРЕХОД ПО ЯКОРЮ
if (document.querySelector(".tog-property")) {

    var productPropertyTog = {

      listenClick: () => {
          var propertyContainer = document.querySelectorAll(".js-property-list");
          propertyContainer.forEach((listItem) => {
              var propertyFromList = listItem.querySelectorAll(".js-property-item");
              propertyFromList.forEach((propertyItem) => {
                  propertyItem.addEventListener("click", (event) => {
                      productPropertyTog._removeActive(listItem);
                      productPropertyTog._addActive(propertyItem);
                  });
              });
          });
      },

      _removeActive: (listItem) => {
          listItem.querySelectorAll(".js-property-item").forEach((btn) => {
              btn.classList.remove("active");
          });
      },

      _addActive: (clickedBtn) => {
          clickedBtn.classList.add("active");
      },

      init: () => {
          productPropertyTog.listenClick();
      },
    };
    productPropertyTog.init();

}