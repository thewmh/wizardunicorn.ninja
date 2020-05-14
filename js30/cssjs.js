// elements

const inputs = document.querySelectorAll('.controls input:not([type="submit"]):not([name="image"])');
const submit = document.querySelector('form [type="submit"]');
const imageField = document.querySelector('form [name="image"]');
const img = document.querySelector('img');

// functions

var handleUpdate = function() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

var imageSearch = function(e) {
    e.preventDefault();
    imageSource = 'http://loremflickr.com/1920/1080/';
    searchString = imageField.value.replace(/\\s+/g, '');
    img.src = (imageSource + searchString);
}

// listeners

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
submit.addEventListener('click', imageSearch);