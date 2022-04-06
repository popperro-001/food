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
    console.log(new Date(Date.parse(deadline)));

    /* Modal */

    const modal = document.querySelector('.modal'),
        btnOpenModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-close]');

    btnOpenModal.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.remove('hide');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; //disable scroll function of the window when modal is opened
        });
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
});