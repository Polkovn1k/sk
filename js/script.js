/*---THIS COMPONENT INCLUDING IN ALL PAGES---*/
// ОБРАБОТЧИК МОДАЛОК
var modals = {
   listenClick: () => {
       document.addEventListener("click", (event) => {
           document.querySelectorAll(".js-overlay-btn").forEach((btnCallingOverlays) => {
               if (btnCallingOverlays && btnCallingOverlays.contains(event.target)) {
                   modals.toggleBtnAndModals(btnCallingOverlays);
               }
           });
       });
   },

   listenTurnDevice: () => {
       window.addEventListener("orientationchange", function() {
           modals.hideOverlays();
           modals.deleteButtonsState();
           modals.toggleHtmlBodyScrollLineInOverlays('enable');
       });
   },

   listenResizeDevice: () => {
       window.addEventListener("resize", function() {
           modals.hideOverlays();
           modals.deleteButtonsState();
           modals.toggleHtmlBodyScrollLineInOverlays('enable');
       });
   },

   toggleBtnAndModals: (clickedBtn) => {
       if (clickedBtn.classList.contains("active-btn")) {
           modals.hideOverlays();
           modals.deleteButtonsState();
           modals.toggleHtmlBodyScrollLineInOverlays('enable');
           return false;
       }
       modals.hideOverlays();
       modals.openOverlayForClickedButton(clickedBtn);
       modals.deleteButtonsState();
       modals.addButtonState(clickedBtn);
   },

   hideOverlays: () => {
       document.querySelectorAll(".js-overlay").forEach((element) => {
           element.classList.remove("opened");
       });
   },

   deleteButtonsState: () => {
       document.querySelectorAll(".js-overlay-btn").forEach((element) => {
           element.classList.remove("active-btn");
       });
   },

   addButtonState: (btn) => {
       btn.classList.add("active-btn");
   },

   openOverlayForClickedButton: (clickedBtn) => {
       let overlayIdForClickedElement = clickedBtn.dataset.overlayId;
       let overlayForClickedElement = document.getElementById(overlayIdForClickedElement);
       overlayForClickedElement.classList.add("opened");
       modals.toggleHtmlBodyScrollLineInOverlays('disable');
   },

   toggleHtmlBodyScrollLineInOverlays (state) {
       let toggledElems = document.querySelectorAll('html, body');
       if (state === 'disable') {
           for (let i = 0; i < toggledElems.length; i++) {
               toggledElems[i].classList.add('scroll-disabled');
           }
           return false;
       }
       for (let i = 0; i < toggledElems.length; i++) {
           toggledElems[i].classList.remove('scroll-disabled');
       }
   },
};
modals.listenClick();
modals.listenTurnDevice();
modals.listenResizeDevice();
//---------------------------------------------------------------
      var productNav = {

          catalogButtons: [
          ".js-product-nav__sub-nav-tog",
          ],

          TRANSITION_TIME: "300",

// ОБРАБОТЧИК ФИЛЬТРА
          filterShowContent: () => {
              productNav.catalogButtons.forEach(function(item) {
                  document.querySelectorAll(item).forEach((item) => {
                      item.addEventListener("click", (event) => {
                          item.classList.toggle("active-btn");
                          if (item.classList.contains("js-product-nav__sub-nav-tog")) {
                              productNav.findFilterContentId(item);
                              return false;
                          }
                          productNav.findOtherContentId(item);
                      });
                  });
              });
          },

// Высота элемента без учета схлопывания
          elementHeightBeforeCollapse: (item) => {
              item.style.maxHeight = item.scrollHeight + "px";
              item.style.maxHeight = "0px";
          },

// Убираем ограничитель высоты
          deleteItemMaxHeight: (item) => {
              setTimeout(function() {
                  item.style.maxHeight = "none";
              }, productNav.TRANSITION_TIME);
          },

// Находим элемент через id с помощью data-атрибута (без заданной высоты)
          findFilterContentId: (item) => {
              var findContentElementByID = document.getElementById(item.dataset.findId);
              findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
              if (!item.classList.contains("active-btn")) {
                  productNav.elementHeightBeforeCollapse(findContentElementByID);
                  return false;
              }
              productNav.deleteItemMaxHeight(findContentElementByID);
          },

// ДЛЯ ЭЛЕМЕНТОВ С ФИКСИРОВАННОЙ ВЫСОТОЙ
          findOtherContentId: (item) => {
              var findContentElementByID = document.getElementById(item.dataset.findId);
              if (item.classList.contains("active-btn")) {
                  findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
                  return false;
              }
              findContentElementByID.style.removeProperty("max-height");
          },
      };
      productNav.filterShowContent();