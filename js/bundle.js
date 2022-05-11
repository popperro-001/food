/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    /* fit calculator */

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) { //default values
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) { //default values
        ratio = +localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings(selector, activeClass) { //check values fromm localStorage and decorate accordingly calculator
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { //check for empth input
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) { //function for 2 blocks: geneder and activity
        const elements = document.querySelectorAll(`${selector} div`); //get each child element from parent selector

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) { //if user enters anything besides the digits
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    /* Classes for menu */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.rate = 75; //currency exchange rate
            this.exchangeToUAH(); //rewrite price value according exchange rate
        }

        exchangeToUAH() { //transform price from usd to uah
            this.price = this.price * this.rate;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) { //set default value
                this.e = 'menu__item';
                element.classList.add(this.e);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>            
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => { //({}) - desconstruction of the object
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    /* Forms */
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Thank you! we will contact you soon.',
        failure: 'Something went wrong'
    };

    forms.forEach(item => { //assign function postData to each form on the page
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage); //works better for form that is in order section, not in modal

            /* Using XMLHttpRequest */
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'multipart/form-data'); //multipart/form-data is used for FormData type, but no need to set request header for formData, it is set automatically

            // request.setRequestHeader('Content-type', 'application/json'); //if we want to send data as JSON object

            const formData = new FormData(form); //imprtant - input divs has to contain unique name attribute in order FormData correctly form object (key, value)

            /* const object = {};

            formData.forEach(function(value, key) { //convert FormData object to plain object
                object[key] = value;
            }); */

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //makes [[key], [value]] from FormData - entries, then converts it to object - fromEntries(), then to JSON object - JSON.stringify()

            // const json = JSON.stringify(object); //convert plain object to JSON

            // request.send(formData);//if we want to send FromData object
            // request.send(json); //if we want to send JSON object

            /* Using fetch api */
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => { //proceed result wit fetch
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove(); //remove spinner                    
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); //clear form
                });

            // request.addEventListener('load', () => {//proceed response with XMLHttpRequest
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset(); //clear form
            //         // setTimeout(() => { //remove message after 2 sec
            //         statusMessage.remove(); //remove spinner
            //         // }, 2000);

            //     } else {
            //         // statusMessage.textContent = message.failure;
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) { //create info modal after form was submitted
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //hide form from modal
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); //open modal with form hidden

        const thanksModal = document.createElement('div'); //create new block
        thanksModal.classList.add('modal__dialog'); //add styles
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `; //fill new block with necessary content

        document.querySelector('.modal').append(thanksModal); //add new block to maodal

        setTimeout(() => { //bring back default settings for modal
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');    
    document.body.style.overflow = 'hidden'; //disable scroll function of the window when modal is opened
    console.log(modalTimerId);
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');    
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    /* Modal */

    const modal = document.querySelector(modalSelector),
        btnOpenModal = document.querySelectorAll(triggerSelector);
    // btnCloseModal = document.querySelector('[data-close]'); this approach would not work with the dynamic created content


    btnOpenModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    // btnCloseModal.addEventListener('click', closeModal); this approach would not work with the dynamic created content

    modal.addEventListener('click', (e) => { //if user clicks anywhere besides the opened modal, modal should close
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //addid getAttribute to close modal
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { //if user press esc button on keyboard, modal should close
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    

    function showModalByScroll() { //if user scrolled down till the end of the page modal will pop-up automatically
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //thus modal will be showed by scroll only once
        }
    }

    window.addEventListener('scroll', showModalByScroll);



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {//using decomposition
    /* Slider */
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1; //default position of our slider
    let offset = 0;

    totalSlides.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);

    currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

    /* Slider navigation */
    const slider = document.querySelector(container);

    slider.style.position = 'relative'; //put parent element positon relative thus we can position absolute inner element

    const indicators = document.createElement('ol'), //create ordered list
        dots = [];
    indicators.classList.add('carousel-indicators'); //add stiles to ol

    slider.append(indicators); //put ol into slider

    for (let i = 0; i < slides.length; i++) { //create list item for each slide
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); //set data attribute to each list item so we can reffer to it in the future
        dot.classList.add('dot');
        if (i == 0) { //highlight default element
            dot.style.opacity = 1;
        }

        indicators.append(dot); //put dot element into ol   
        dots.push(dot);
    }

    /*     totalSlides.textContent = getZero(slides.length);


        showSlides(slideIndex); //we need to run function at the beginning to set default behavior

        function showSlides(n) {
            if (n > slides.length) { //if we reached the end of slider we return to the beginning
                slideIndex = 1;
            }

            if (n < 1) { //if we want to go beyond the beginning we return to the end of the slider
                slideIndex = slides.length;
            }

            slides.forEach(item => { //hide all slides
                item.classList.remove('show');
                item.classList.add('hide');
            });

            slides[slideIndex - 1].classList.remove('hide'); //show slide by index
            slides[slideIndex - 1].classList.add('show');

            currentSlide.textContent = getZero(slideIndex);
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', () => {
            plusSlides(-1);
        });

        next.addEventListener('click', () => {
            plusSlides(1);
        }); */

    /* Slider advanced */
    slidesField.style.width = 100 * slides.length + '%'; //all slides are placed inside the sliderWrapper
    slidesField.style.display = 'flex'; //get all slides stand in line
    slidesField.style.transition = '0.5s all'; //set smooth transition

    slidesWrapper.style.overflow = 'hidden'; //hide all slides that are off the visibility area
    slides.forEach(item => {
        item.style.width = width; //set all slides equal width, so we can be sure they are all fit in slidesField
    });

    function activeDot(index) {
        dots.forEach(dot => dot.style.opacity = '0.5'); //put all dots to inactive state
        dots[index - 1].style.opacity = 1; //highlight active element
    }

    next.addEventListener('click', () => {
        if (offset == +parseInt(width) * (slides.length - 1)) { //if we reached the end of slider we return to the beginning, aslo we need to parseInt because width = string(ex '500px')
            offset = 0;
        } else {
            offset += +parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

        activeDot(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { //if we want to go beyond the beginning we return to the end of the slider
            offset = +parseInt(width) * (slides.length - 1);
        } else {
            offset -= +parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

        activeDot(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => { //get event object
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; //set slide index using attribute value

            offset = +parseInt(width) * (slideTo - 1); //set offset using attribute value

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

            activeDot(slideIndex);
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    /* Tab Content */
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { //set default value if we call function without arg
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent(); //on load screen we need default settings
    showTabContent(); //on load screen we need default settings, default arg value = 0

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //if we will use event.target multiple times it is better to set variable
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) { //compare terget tab with tabs NodeList, to get the index = i, in order to put this index for tabContent
                    hideTabContent(); //first hide all tabs
                    showTabContent(i); //second display tab by index
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) { //function to add 0 if digit is less than 10
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


function timer(id, deadline) {
    /* Timer */
    
    function getTimeRemaining(endtime) { //get difference between current date and arg date
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) { //check for past date
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //in order not to wait 1 second when we refresh website and default(in HTML) values change to actual ones

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
    // console.log(new Date(Date.parse(deadline)));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async(url, data) => { //common function to handle fitch POST requests
    const result = await fetch(url, { //remember this is async code, error could be when result.json(), second when return, we need to use async before the function and await in the body of function
        method: "POST",
        headers: { //if we send JSON
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json(); //proceed data to json and return as promise
};

const getResource = async(url) => { //common GET function to be reusable
    const result = await fetch(url);

    if (!result.ok) { //fetch does not handle 400 or 500 errors, so we need to handle it manually by catching the error
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-06-06');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        totalCounter: '#total',
        currentCounter: '#current'
    });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map