var cookies = require('./cookies');

export function isAuthenticated(){
    var currentUser = cookies.getCookie("user");
    console.log(currentUser);
    if(currentUser === '{}' || currentUser === ''){
        console.log("false");
        return false;
    }else{
        console.log("true");
        return true;
    }
}
