import RequestManager from "../app/network/RequestManager";

// const baseURL = 'http://localhost:8080';  
// const baseURL = 'http://172.22.44.128:8080';  // laptop facu en UA-Alumnos
const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080'  // server aws que hizo facu

class UserService {
    static _handleError(status) {
        console.log('handle error of: ' + status)
        switch (status) {
            case 200:
                return 'Ok';
            case 400:
                return 'Datos ingresados son invalidos';
            case 401:
                return '401';
            case 402:
                return '402';
            case 403:
                return '403';
            case 404:
                return '404';
            case 405:
                return '405';
            case 406:
                return '406';
            case 407:
                return '407';
            default: return 'Estado invalido'
        }
    };

    static login(email, password) {
        // console.log(email + ', ' + password);
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
                if (response.ok) result.success = true;
                else result.errorMessage = this._handleError(response.status);
                return response.json();
            })
            .then(myJson => {
                if (result.errorMessage !== '') return result;
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

    static getUnverified() {
        return fetch(baseURL + "/api/unregistered/all", {
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

    static createStudent(data) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }

        let result = {success: false, errorMessage: ''};  

        return fetch(baseURL + '/api/student/add', requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorMessage = this._handleError(response.status);
                return result;
            })
    };

    static editStudent(data) {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
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
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        }

        return fetch(baseURL + '/api/student/delete/' + id, requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else console.log(response);
            })
    };
}

export default UserService;
