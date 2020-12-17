var colorMode = (function() {

    const elements = {
        root: document.querySelector(':root'),
        initialColorMode: {
            id: window.localStorage.getItem('colorMode')
        },
        wizard: document.querySelector('#wizard'),
        unicorn: document.querySelector('#unicorn'),
        ninja: document.querySelector('#ninja')
    }

    var toggle = function toggle(e) {
        let colorModeTrigger = e.id ? e.id : e;
        switch (colorModeTrigger) {
            case 'wizard':
                window.localStorage.setItem('colorMode', 'wizard');
                elements.root.classList.remove('unicorn', 'dark');
                updateClasses(wizard);
                break;
            case 'unicorn':
                window.localStorage.setItem('colorMode', 'unicorn');
                elements.root.classList.remove('wizard', 'dark');
                elements.root.classList.add('unicorn');
                updateClasses(unicorn);
                break;
            case 'ninja':
                window.localStorage.setItem('colorMode', 'ninja');
                elements.root.classList.remove('wizard', 'unicorn');
                elements.root.classList.add('dark');
                updateClasses(ninja);
                break;
        }
    }

    var updateClasses = function updateClasses(element) {
        let allElements = [wizard, unicorn, ninja];
        allElements.forEach(el => {
            if(el.id == element.id) {
                el.classList.replace('underline', 'line-through');
            } else {
                el.classList.replace('line-through', 'underline');
            }
        });
    }

return {
    toggle: toggle
}

}());

colorMode.toggle(window.localStorage.getItem('colorMode'));