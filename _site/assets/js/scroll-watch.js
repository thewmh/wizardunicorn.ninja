// window.onscroll = function() {myFunction()};

// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("myBar").style.width = scrolled + "%";
// }

let prev_position = window.pageYOffset || document.body.scrollTop;

window.addEventListener('scroll', function(e) {
    var s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var content = document.getElementById('main-content');
    var d = Math.max(content.clientHeight, content.scrollHeight, content.offsetHeight);
    var position = (s / d) * 100;
    document.getElementById('progress').setAttribute('style', 'width: ' + position + '%');
    // if(s <= 493 || (s >= 494 && s <= 693 && s > prev_position)) {
    //     console.log('below 693px');
    //     document.getElementById('main-content').setAttribute('style', 'height: 700px; width: 100%; position: fixed; transform: translateY(-' + s +'px); transition: transform 0s;');
    // } else if(s >= 694 && s > prev_position) {
    //     console.log('increased above 694px');
    //     document.getElementById('main-content').setAttribute('style', 'height: 700px; width: 100%; position: fixed; transform: translateY(-694px); transition: transform .5s ease, height .5s ease;');
    // } else {
    //     document.getElementById('main-content').setAttribute('style', 'height: 200px; width: 100%; position: fixed; transform: translateY(0); transition: transform .5s ease;');
    //     console.log('decreasing but above 694px');
    // };
    prev_position = s <= 0 ? 0 : s;
});