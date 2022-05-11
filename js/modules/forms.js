import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
        openModal('.modal', modalTimerId); //open modal with form hidden

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;