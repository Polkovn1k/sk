function autoCompleteBrands() {
    if (document.querySelector(".autocomplete")) {

        let btn = document.querySelector(".js-show-all");
        let bradsList = document.querySelector(".check-box--brands");
        let brandsArray = bradsList.querySelectorAll(".check-box__text");
        let noResult = document.querySelector(".check-box__no-result");
        let listItems = bradsList.querySelectorAll(".check-box__item");
        let ITEMS_QUANTITY = 5;
        var flag;

        var brandsAutoComplete = {
            listenClick: () => {
                btn.addEventListener("click", function(event) {
                    brandsAutoComplete._showAllBrands();
                    flag = true;
                });
            },

            listenAction: () => {
                document.querySelector(".js-brands-input").addEventListener("input", function(event) {
                    let handler = brandsAutoComplete.actionInInput.bind(document.querySelector(".js-brands-input"));
                    handler();
                });
            },

            itemsValue: () => {
                if (listItems.length <= ITEMS_QUANTITY) {
                    brandsAutoComplete._showAllBrands();
                }
            },

            _showAllBrands: () => {
                bradsList.classList.remove("hide");
                btn.classList.add("hide");
                flag = true;
            },

            _getEqualValues: (element, arrayElement) => {
                let collection = Array.prototype.slice.call(arrayElement);
                let newArr = collection.filter((item) => {
                    return item.innerHTML.toLowerCase().substr(0, element.length) === element;
                });
                return newArr;
            },

            init: () => {
                brandsAutoComplete.listenClick();
                brandsAutoComplete.listenAction()
                brandsAutoComplete.itemsValue();
                return brandsAutoComplete.actionInInput.bind(document.querySelector(".js-brands-input"));
            },

            actionInInput: function() {
                let newArr = brandsAutoComplete._getEqualValues(this.value.toLowerCase().trim(), brandsArray);
                //Если "Показать все" нажата, то
                if (flag) {
                    //если в инпуте есть значения и есть совпадения, то...
                    brandsAutoComplete._showAllBrands();
                    if (this.value.length > 0 && 0 in newArr) {
                        //++++
                        brandsArray.forEach((item) => {
                            item.closest(".check-box__item").classList.add("visually-hidden");
                        });
                        //----
                        newArr.forEach((item) => {
                            item.closest(".check-box__item").classList.remove("visually-hidden");
                        });
                        bradsList.classList.remove("visually-hidden");
                        noResult.classList.add("hide");
                    }
                    //если в инпуте есть значения, но нет совпадений, то...
                    if (this.value.length > 0 && !(0 in newArr)) {
                        bradsList.classList.add("visually-hidden");
                        noResult.classList.remove("hide");
                    }
                    //если после манипуляций инпут стал пустой, то
                    if (this.value.length === 0) {
                        //====
                        brandsArray.forEach((item) => {
                            item.closest(".check-box__item").classList.remove("visually-hidden");
                        });
                        bradsList.classList.remove("visually-hidden");
                        noResult.classList.add("hide");
                    }
                    return null;
                }
                //Если "Показать все" не нажата, то
                //если в инпуте есть значения и есть совпадения, то...
                if (this.value.length > 0 && 0 in newArr) {
                    //++++
                    brandsArray.forEach((item) => {
                        item.closest(".check-box__item").classList.add("visually-hidden");
                    });
                    //----
                    newArr.forEach((item) => {
                        item.closest(".check-box__item").classList.remove("visually-hidden");
                    });
                    bradsList.classList.remove("visually-hidden");
                    bradsList.classList.remove("hide");
                    noResult.classList.add("hide");
                    btn.classList.add("hide");
                }
                //если в инпуте есть значения, но нет совпадений, то...
                if (this.value.length > 0 && !(0 in newArr)) {
                    bradsList.classList.add("visually-hidden");
                    noResult.classList.remove("hide");
                    btn.classList.add("hide");
                }
                //если после манипуляций инпут стал пустой, то
                if (this.value.length === 0) {
                    //====
                    brandsArray.forEach((item) => {
                        item.closest(".check-box__item").classList.remove("visually-hidden");
                    });
                    bradsList.classList.remove("visually-hidden");
                    bradsList.classList.add("hide");
                    noResult.classList.add("hide");
                    btn.classList.remove("hide");
                }
            },
        };
        return brandsAutoComplete.init();
    }
}