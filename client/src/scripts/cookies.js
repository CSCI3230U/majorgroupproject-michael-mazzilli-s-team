export function writeCookie(name, value, expiry){
    var d = new Date();
    d.setTime(d.getTime() + expiry);
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name){
    name += "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i=0; i<ca.length; i++){
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var tmp =  c.substring(name.length, c.length);
            return tmp;
        }
    }
    return "";
}

export function resetCookie(name){
    document.cookie = `"${name}"=""`;
}