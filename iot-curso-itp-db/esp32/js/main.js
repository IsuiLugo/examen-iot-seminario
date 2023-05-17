let led1 = document.getElementById('led1');
let led2 = document.getElementById('led2');
let led3 = document.getElementById('led3');
let rele = document.getElementById('rele');

setInterval(() => {

    $.ajax
        ({
            type: "GET",
            url: "./../backend/getStatusRele.php",
            success: function (res) {

                if (res === "1")
                    rele.src = "img/led_on.png";
                else
                    rele.src = "img/led_off.png";
            }
        });
}, 1000);

setInterval(() => {

    $.ajax
        ({
            type: "GET",
            url: "./../backend/getStatusLed1.php",
            success: function (res) {

                console.log(res);

                if (res === "1")
                    led1.src = "img/led_on.png";
                else
                    led1.src = "img/led_off.png";
            }
        });
}, 1000);

setInterval(() => {

    $.ajax
        ({
            type: "GET",
            url: "./../backend/getStatusLed2.php",
            success: function (res) {

                if (res === "1")
                    led2.src = "img/led_on.png";
                else
                    led2.src = "img/led_off.png";
            }
        });
}, 1000);

setInterval(() => {

    $.ajax
        ({
            type: "GET",
            url: "./../backend/getStatusLed3.php",
            success: function (res) {

                if (res === "1")
                    led3.src = "img/led_on.png";
                else
                    led3.src = "img/led_off.png";
            }
        });
}, 1000);
