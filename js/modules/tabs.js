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

export default tabs;