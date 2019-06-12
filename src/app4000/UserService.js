import RequestManager from "../app/network/RequestManager";

const baseURL = 'http://localhost:8080';
// const baseURL = 'http://172.22.44.128:8080';

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
        let result = {success: false, errorMessage: '', token: '', role: ''};  
        // first fetch: get token
        return fetch(baseURL + '/oauth/token', tokenRequestOptions)
            .then(response => {
                // const json = response.json();
                if (response.ok) console.log(response.json());
                else console.warn(response);
            })
            .then(myJson => {
                console.log('myJson');
                console.log(myJson);
                // result.token = myJson.access_token;
                // console.log(result.token);
                // return fetch(baseURL + "/oauth/check_token?token=" + result.token, roleRequestOptions)
                //     .then(response => {
                //         return response.json()
                //     })
                //     .then(myJson => {
                //         result.role = myJson.authorities[0];
                //         console.log(result.role);
                //         return result;
                //     })
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

    static getUserInfo() {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));
        return fetch(baseURL + "/api/user/data",
            {
                headers: headers,
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            }).then(response => {
            return response.json();
        });
    }

    static getTeacherData() {
        console.log("teacher data");
        // TODO get classes with students
        return "teacher data!";
    };

    static getVerified() {
        return fetch(baseURL + "/api/user/student/all", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            redirect: "follow",
            referrer: "no-referrer",
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
            }
        })
            .catch(error => {
                console.log("Error: " + error)
            });

    };

    static getUnverified() {
        return fetch(baseURL + "/api/user/unregistered/all", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            redirect: "follow",
            referrer: "no-referrer",
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
            }
        })
            .catch(error => {
                console.log("Error: " + error)
            });

    };

    static getAllStudents() {
        return fetch(baseURL + "/api/student/all", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            redirect: "follow",
            referrer: "no-referrer",
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
            }
        })
            .catch(error => {
                console.log("Error: " + error)
            });
    };

    static editStudent(data) {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0"  // clientid and clientsecret    
            },
            body: JSON.stringify(data),
        }

        return fetch(baseURL + '/api/student/edit', requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else console.log(response);
            })
    };

    static deleteStudent(id) {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {"Authorization": "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0"},
        }

        return fetch(baseURL + '/api/student/delete/' + id, requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else console.log(response);
            })
    };
}

export default UserService;
