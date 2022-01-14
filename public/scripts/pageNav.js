;(function() {
    var config = {
        selectors: {
            pageNav: '.workshop-nav',
            pageNavTitle: '.workshop-nav--title',
            pageNavLinkList: '.workshop-nav--list',
            pageNavLinks: '.workshop-nav--link'
        }
    }

    var init = function init() {
        getElements();
        attachListeners();
    }

    var getElements = function getElements() {
        pageNav = document.querySelector(config.selectors.pageNav);
        pageNavTitle = document.querySelector(config.selectors.pageNavTitle);
        pageNavLinkList = document.querySelector(config.selectors.pageNavLinkList);
        pageNavLinks = document.querySelectorAll(config.selectors.pageNavLinks);
    };

    var attachListeners = function attachListeners() {
        for (const link of pageNavLinks) {
            link.addEventListener('click', scrollToTitle);
        }
        
        pageNavTitle.addEventListener('click', toggleNav);
    }


function scrollToTitle(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;
    const expandedNavHeight = document.querySelector('.workshop-nav').offsetHeight;
    const offsetHeight = document.querySelector(href).offsetHeight;

    scroll({
        top: offsetTop - expandedNavHeight,
        behavior: "smooth"
    });
    toggleNav();
}

function toggleNav() {
    pageNavLinkList.classList.toggle('hidden');
}

if (document.querySelector('.workshop-nav')) {
    init();
}

})();