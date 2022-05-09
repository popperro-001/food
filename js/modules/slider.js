function slider() {
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

}

module.exports = slider;