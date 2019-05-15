//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".scroll-spy")) {

    var scrollSpy = {

        DEVIDER_FOR_SECTION: 2,

        listenScroll: () => {
            window.addEventListener("scroll", (event) => {
                scrollSpy._getCurrentSectionAfterScroll(".js-static-content");
            });
        },

        _getCurrentSectionAfterScroll: (item) => {
            var sections = document.querySelectorAll(item);
            for(var i = 0; i < sections.length; i++) {
                if (scrollSpy._isBelowScroll(sections[i]))
                    break;
            }
            if (sections[i]) {
                scrollSpy._changeLinkStatus(sections[i].id);
            }
        },

        _isBelowScroll: (element) => {
            var position = element.getBoundingClientRect();
            var sectionHeight = scrollSpy._getCurrentElementHeight(element);
            var headerHeight = scrollSpy._getHeaderHeight(".js-header");
            return position.top > -((sectionHeight - headerHeight) / scrollSpy.DEVIDER_FOR_SECTION);
        },

        _getCurrentElementHeight: (element) => {
            return element.offsetHeight;
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        _changeLinkStatus: (id) => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.classList.remove("active-btn");
            });
            document.querySelector(".js-sticky-btn[href='#"+id+"']").classList.add("active-btn");
        },

        init: () => {
            scrollSpy.listenScroll();
        },

    };
    scrollSpy.init();

}