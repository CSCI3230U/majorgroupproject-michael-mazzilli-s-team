var cookies = require('./cookies');

export function isAuthenticated(){
    var currentUser = cookies.getCookie("user");
    if(currentUser === '{}'){
        return false;
    }else{
        return true;
    }
}
