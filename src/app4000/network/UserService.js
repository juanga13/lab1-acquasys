const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080'; 

class UserService {
    static login(email, password) {
        const tokenRequestOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0"  // clientid and clientsecret    
            },
            body: "grant_type=password&password=" + password + "&username=" + email
        };

        const roleRequestOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache"
        };

        // insert all responses and return it anyway to show message on front
        let result = {success: false, errorStatus: null, errorMessage: '', token: '', role: ''};  
        // first fetch: get token
        return fetch(baseURL + '/oauth/token', tokenRequestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            })
            .then(myJson => {
                if (result.errorStatus) {
                    result.errorMessage = myJson.error_description;
                    return result;
                }
                result.token = myJson.access_token;
                return fetch(baseURL + "/oauth/check_token?token=" + result.token, roleRequestOptions)
                    .then(response => {
                        return response.json()
                    })
                    .then(myJson => {
                        
                        result.role = myJson.authorities[0];
                        return result;
                    })
                }
            )
    };

    static register(user, password) {
        let result = {success: false, error: false, errorMessage: ''};
        return fetch(baseURL + "/api/user/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {"Content-Type": "application/json"},
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({email: user, password: password}),
        })
            .then(response => {
                if (response.ok) {
                    result.success = true;
                    return result;
                } else {
                    result.error = true;
                    result.errorMessage = response.text();
                }
            })
            .catch(error => {
                result.errorMessage = error.toString();
                result.error = true;
            }).then(() => {
                return result
            });
    };

}

export default UserService;