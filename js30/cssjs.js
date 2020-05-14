const inputs = document.querySelectorAll('.controls input');
const img = document.querySelectorAll('img');
const randomWords = ['city', 'office', 'technology', 'car', 'human', 'cat', 'computer', 'javascript', 'beans', 'plant', 'palm tree'];

var handleUpdate = function() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

var loadRandom = function() {
    var randomNumber = Math.floor(Math.random() * randomWords.length)
    this.src = ('http://loremflickr.com/1920/1080/' + randomWords[randomNumber])
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

img.forEach(img => img.addEventListener('click', loadRandom));