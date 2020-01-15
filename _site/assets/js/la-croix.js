let start_date = new Date("Sept 03, 2019 00:00:00");
let day_diff = (Math.round(new Date().getTime() - start_date.getTime()) / 86400000).toFixed(0);
let minus_weekends = ((day_diff / 7).toFixed(0))*2;
let work_days = day_diff - minus_weekends;
var la_croix_consumed = work_days * 2;
var la_croix_count = document.querySelectorAll('.la-croix');
var la_croix_cans = document.getElementById ("la-croix-cans");

if(la_croix_count) {
    
    for(let i = 0; i < ( la_croix_count.length ); i++) {
        la_croix_count[i].append(la_croix_consumed);
    }

    if(la_croix_cans) {
        for(let i = 0; i < la_croix_consumed; i++) {
            la_croix_cans.innerHTML += '<span id="'+i+'" class="la-croix-can"></span>';
        }
    }
} else {
    la_croix_count[0].append(la_croix_consumed);
}