export function writeCookie(name, value, expiry){
    var d = new Date();
    d.setTime(d.getTime() + expiry*1000);
    var expires = "expires=" + d.toUTCString();
    var cookie = name + "=" + value + ";" + expires + ";path=/";
    document.cookie = cookie;
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

export function getToken(){
    var user = this.getCookie('user');
    if(user === "" || user === undefined){
        user = "{}";
    }
    return JSON.parse(user).token;
}

export function resetCookie(name){
    document.cookie = `${name}={}`;
}