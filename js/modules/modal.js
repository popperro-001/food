function modal() {
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



}

module.exports = modal;