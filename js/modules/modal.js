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

export default modal;
export {closeModal};
export {openModal};