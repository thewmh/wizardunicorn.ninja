document.addEventListener( 'DOMContentLoaded', function () {
    const root = document.querySelector(':root')
    const initialColorMode = {id: window.localStorage.getItem('colorMode')};
    root.classList.add(initialColorMode.id);
    const wizard = document.querySelector('#wizard');
    const unicorn = document.querySelector('#unicorn');
    const ninja = document.querySelector('#ninja');
    toggleColorMode(initialColorMode);
    return wizard, unicorn, ninja
});

function toggleColorMode(e) {
    const root = document.querySelector(':root');
    let colorModeTrigger = e.id ? e.id : e;
    switch (colorModeTrigger) {
        case 'wizard':
            window.localStorage.setItem('colorMode', 'wizard');
            root.classList.remove('unicorn', 'dark');
            updateClasses(wizard);
            break;
        case 'unicorn':
            window.localStorage.setItem('colorMode', 'unicorn');
            root.classList.remove('wizard', 'dark');
            root.classList.add('unicorn');
            updateClasses(unicorn);
            break;
        case 'ninja':
            window.localStorage.setItem('colorMode', 'ninja');
            root.classList.remove('wizard', 'unicorn');
            root.classList.add('dark');
            updateClasses(ninja);
            break;
    }
}

function updateClasses(element) {
    let allElements = [wizard, unicorn, ninja];
    allElements.forEach(el =>{
        if(el.id == element.id) {
            el.classList.replace('underline', 'line-through');
        } else {
            el.classList.replace('line-through', 'underline');
        }
    });
}