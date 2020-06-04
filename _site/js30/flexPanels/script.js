const panels  = document.querySelectorAll('.panel');
const images = ['frog', 'llama', 'city', 'love', 'banana'];

function toggleOpen() {
    this.classList.toggle('open');
    toggleActive(this);
}

function toggleActive(e) {
    e.classList.toggle('open-active');
}

function imageURL() {
    var url = 'url(http://www.loremflickr.com/1920/1080/';
    for ( var i = 0; i < panels.length; i++) {
        var thisURL = url + images[i] + ')';
        var pl = Math.floor(Math.random() * panels.length);
        panels[i].setAttribute('style', `background-image: ${thisURL}`);
    }
}

imageURL();

panels.forEach(panel => panel.addEventListener('click', toggleOpen));