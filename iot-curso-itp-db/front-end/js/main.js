let led1 = document.getElementById('led1');
let led2 = document.getElementById('led2');
let led3 = document.getElementById('led3');
let rele = document.getElementById('rele');

let msjLed1 = document.getElementById('msjLed1');
let msjLed2 = document.getElementById('msjLed2');
let msjLed3 = document.getElementById('msjLed3');
let msjRele = document.getElementById('msjRele');

rele.addEventListener(  'input', function (e) {

    let dataString = "status=" + (rele.checked === true ? 1 : 0);
    e.preventDefault();

    $.ajax
        ({
            type: "GET",
            url: "./backend/setStatusRele.php",
            data: dataString,
            success: function (res) {
                console.log(res);
                msjRele.innerHTML = "[Se guardó en el servidor " + res + "]";
            }
        });
});

led1.addEventListener('input', function (e) {

    let dataString = "status=" + (led1.checked === true ? 1 : 0);
    e.preventDefault();

    $.ajax
        ({
            type: "GET",
            url: "./backend/setStatusLed1.php",
            data: dataString,
            success: function (res) {
                console.log(res);
                msjLed1.innerHTML = "[Se guardó en el servidor " + res + "]";
            }
        });
});

led2.addEventListener('input', function (e) {

    let dataString = "status=" + (led2.checked === true ? 1 : 0);
    e.preventDefault();

    $.ajax
        ({
            type: "GET",
            url: "./backend/setStatusLed2.php",
            data: dataString,
            success: function (res) {
                console.log(res);
                msjLed2.innerHTML = "[Se guardó en el servidor " + res + "]";
            }
        });
});

led3.addEventListener('input', function (e) {

    let dataString = "status=" + (led3.checked === true ? 1 : 0);
    e.preventDefault();

    $.ajax
        ({
            type: "GET",
            url: "./backend/setStatusLed3.php",
            data: dataString,
            success: function (res) {
                console.log(res);
                msjLed3.innerHTML = "[Se guardó en el servidor " + res + "]";
            }
        });
});
