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

    const deadline = '2022-04-11';

    function getTimeRemaining(endtime) { //get difference between current date and arg date
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

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
        btnOpenModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-close]');

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

    btnCloseModal.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => { //if user clicks anywhere besides the opened modal, modal should close
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //if user press esc button on keyboard, modal should close
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() { //if user scrolled down till the end of the page modal will pop-up automatically
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //thus modal will be showed by scroll only once
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    /* Classes for menu */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.rate = 27; //currency exchange rate
            this.exchangeToUAH(); //rewrite price value according exchange rate
        }

        exchangeToUAH() { //transform price from usd to uah
            this.price = this.price * this.rate;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    const menu1 = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    );
    menu1.render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container'
    ).render(); //if we use object only once it is ok not to declare variable

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container'
    ).render(); //if we use object only once it is ok not to declare variable
});