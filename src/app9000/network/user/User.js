// const baseURL = 'http://localhost:8080';
const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080/';

/** =============================================
 * request options
 ============================================= */

const requestOptions = {
    register: {
    
    },
    loginToken: {
        method: 'POST',
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0"  // clientid and clientsecret    
        },
        body: ""  // must define in function
    },
    loginRole: {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    },
    getUserInfo: {
        
    },
    logout: {

    },
};

/** =============================================
 * fetch methods
 ============================================= */

function register() {

};

function login(email, password) {
    const loginRequestOption = requestOptions.loginToken;
    loginRequestOption.body = "grant_type=password&password=" + password + "&username=" + email;
    const tokenRequestOptions = requestOptions.loginToken;

    // insert all responses and return it anyway to show message on front
    let result = { success: false, errorStatus: null, errorMessage: '', token: '', role: '' };  
    // first fetch to get token
    return fetch(
        baseURL + '/oauth/token', 
        tokenRequestOptions)
    .then(response => {
        if (response.ok) result.success = true;
        else result.errorStatus = response.status;
        return response.json();
    })
    .then(json => {
        if (result.errorStatus) {
            result.errorMessage = json.error_description;
            return result;
        }
        result.token = json.access_token;
        // second fetch to get role after getting token 
        return fetch(
            baseURL + "/oauth/check_token?token=" + result.token, 
            tokenRequestOptions
        ).then(response => {
            return response.json();
        })
        .then(json => {
            
            result.role = json.authorities[0];
            return result;
        })
    })
};

/**
 * gets user:
 * - name
 * - surname
 */
function getUserInfo() {

};

function logout() {

};
