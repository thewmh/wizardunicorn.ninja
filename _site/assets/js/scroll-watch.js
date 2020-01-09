let prev_position = window.pageYOffset || document.body.scrollTop;

window.addEventListener('scroll', function(e) {
    var s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let d = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    console.log(s, d)
    var position = (s / d) * 100;
    document.getElementById('progress').setAttribute('style', 'width: ' + position + '%');
    prev_position = s <= 0 ? 0 : s;
});