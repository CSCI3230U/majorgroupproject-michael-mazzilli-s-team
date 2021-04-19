var cookies = require('./cookies');

export function isAuthenticated(){
    var currentUser = cookies.getCookie("user");
    if(currentUser === '{}' || currentUser === ''){
        return false;
    }else{
        return true;
    }
}
