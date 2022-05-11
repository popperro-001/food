import {getResource} from '../services/services';

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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => { //({}) - desconstruction of the object
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;