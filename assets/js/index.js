start('ws://' + window.location.host)

var btns = document.getElementsByClassName('keypad-btn')
for(var ele of btns){
    ele.style.width = window.getComputedStyle(ele, null).getPropertyValue("height")
};

var dots = document.getElementsByClassName('dots')
var first = true;
for(var ele of dots){
    ele.style.width = window.getComputedStyle(ele, null).getPropertyValue("height")
    if(first){
        first = false;
    }else{
        ele.style['margin-left'] = "calc(3 / 2 * " + window.getComputedStyle(ele, null).getPropertyValue("height") + ")"
    }
};

var headertaps = 0;
function headertap(){
    headertaps++
    if(headertaps > 10){
        headertaps = 0;
        changekey()
    }
}

var btni = 0;
var disabled = false;
var inputarr = [];
function btnStart(ele){
    if(!disabled){
        ele.classList.add('btn-pressed')
        dots[btni].style.background = "rgba(255,255,255,1)";
        inputarr.push(ele.value)
        if(btni+1 >= dotslength){
            disabled = true
            var inputcode = inputarr.join("")
            var verificationcode = getCookie("key")
            inputarr = []
            var authobj = {pin:inputcode, key:verificationcode}
            ws.send(JSON.stringify(authobj))
            setTimeout(function(){
                btni = 0
                for(var ele of dots){
                    ele.style.background = "rgba(255,255,255,0)"
                };
                disabled = false
            }, 500)
        }else{
            btni++
        }
    }
}

function btnEnd(ele){
    ele.classList.remove('btn-pressed')
}

function start(websocketServerLocation) {
    ws = new WebSocket(websocketServerLocation);
    ws.onopen = function () {
        console.log("ws connection established")
    };
    ws.onclose = function () {
        console.log("ws connection has been closed");
        setTimeout(function () {
            start(websocketServerLocation)
        }, 3000);
    };
}

function changekey(){
    var key = prompt("Please enter a new key", getCookie("key"));

    if (key != null && key != "") {
        setCookie("key", key, 3650);
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}