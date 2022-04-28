window.addEventListener('DOMContentLoaded', () => {
    /* Tab Content */
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { //set default value if we call function without arg
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent(); //on load screen we need default settings
    showTabContent(); //on load screen we need default settings, default arg value = 0

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //if we will use event.target multiple times it is better to set variable
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) { //compare terget tab with tabs NodeList, to get the index = i, in order to put this index for tabContent
                    hideTabContent(); //first hide all tabs
                    showTabContent(i); //second display tab by index
                }
            });
        }
    });

    /* Timer */

    const deadline = '2022-05-06';

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

    function getZero(num) { //function to add 0 if digit is less than 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
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

    setClock('.timer', deadline);
    // console.log(new Date(Date.parse(deadline)));

    /* Modal */

    const modal = document.querySelector('.modal'),
        btnOpenModal = document.querySelectorAll('[data-modal]');
    // btnCloseModal = document.querySelector('[data-close]'); this approach would not work with the dynamic created content

    function openModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; //disable scroll function of the window when modal is opened
        clearInterval(modalTimerId);
    }
    btnOpenModal.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    // btnCloseModal.addEventListener('click', closeModal); this approach would not work with the dynamic created content

    modal.addEventListener('click', (e) => { //if user clicks anywhere besides the opened modal, modal should close
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //addid getAttribute to close modal
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //if user press esc button on keyboard, modal should close
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() { //if user scrolled down till the end of the page modal will pop-up automatically
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //thus modal will be showed by scroll only once
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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

    const getResource = async(url) => { //common GET function to be reusable
        const result = await fetch(url);

        if (!result.ok) { //fetch does not handle 400 or 500 errors, so we need to handle it manually by catching the error
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => { //({}) - desconstruction of the object
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });



    /* Forms */
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Thank you! we will contact you soon.',
        failure: 'Something went wrong'
    };

    forms.forEach(item => { //assign function postData to each form on the page
        bindPostData(item);
    });

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
            postData('http://localhost:3000/requests', json)
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
        openModal(); //open modal with form hidden

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
            closeModal();
        }, 4000);
    }

    /* Slider */
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        currentSlide = document.querySelector('#current'),
        totalSlides = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1; //default position of our slider
    let offset = 0;

    totalSlides.textContent = getZero(slides.length);

    currentSlide.textContent = getZero(slideIndex);

    /* Slider navigation */
    const slider = document.querySelector('.offer__slider');

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

        currentSlide.textContent = getZero(slideIndex);

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

        currentSlide.textContent = getZero(slideIndex);

        activeDot(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => { //get event object
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; //set slide index using attribute value

            offset = +parseInt(width) * (slideTo - 1); //set offset using attribute value

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide.textContent = getZero(slideIndex);

            activeDot(slideIndex);
        });
    });

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
});