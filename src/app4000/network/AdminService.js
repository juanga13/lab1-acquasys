const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080';
// const baseURL = 'http://localhost:8080';

/**
 * Admin Service
 * 
 * - gets students:
 *      * verified (all data).
 *      * unverified (all data).
 *      * all (only name, surname, dni and id).
 * - gets teachers (all data).
 * - gets lessons (all data).
 * 
 */
class AdminService {
    
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
    };
    
    static getMyselfStudent() {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));
        return fetch(baseURL + "/api/student/myself",
            {
                headers: headers,
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            }).then(response => {
            return response.json();
        });
    };

    /** ========================================================
     * PAYMENTS
     * ====================================================== */

    static getPayments() {
        // console.log('getPayments');
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };

        let result = {succes: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + "/payment/payments", requestOptions)
        .then(response => {
            // console.log('getPayments');
            if (response.ok) result.success = true;
            else result.errorStatus = response.status;
            // console.log(response);
            return response.json();
        })
        // .then(json => {
        //     console.log(json);
        // })
    };

    // 
    static setPayed(paymentData) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(paymentData),
        }
        let result = {success: false, errorStatus: '', errorMessage: ''};  
        return fetch(baseURL + '/payment/pay', requestOptions)
            .then(response => {
                console.log('adminservice setPayed');
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(json => {
                result.errorMessage = json;
                return result;
            })
    };

    static getPaymentAmount() {
        // console.log('getPaymentAmount');
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        };
        
        let result = {success: false, errorStatus: '', errorMessage: '', amount: 0};  
        
        return fetch(baseURL + "/payment/fee", requestOptions)
        .then(response => {
            // console.log('getPaymentAmount');
            if (response.ok) result.success = true;
            else result.errorStatus = response.status;
            // console.log(response);
            return response.json();
        })
        .then(json => {
            // console.log(json);
            if (result.success) result.amount = json;
            else result.errorMessage = json.message;
            return result;
        });
    }

    static setPaymentAmount(amount) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(amount),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  
        return fetch(baseURL + '/payment/fee', requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    /** ========================================================
     * STUDENTS
     * 
     * TODO: include all data in result Object for error 
     *      handling (in getVerified(), getUnverified() and
     *      getStudents())
    ========================================================= */

     /**
     * 
     */
    static getVerified() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + "/api/student/all", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            });
            // // .then(myJson => {
            // //     result.errorMessage = myJson;
            // //     return result;
            // });
    };

    /**
     * 
     */
    static getAllStudents() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };

        let result = {succes: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + "/api/student/all", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            })
            // .then(myJson => {
            //     result.errorMessage = myJson;
            //     return result;
            // });
    };

    /**
     * 
     */
    static createStudent(data) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  
        return fetch(baseURL + '/api/student/add', requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    /**
     * 
     */
    static editStudent(data) {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  

        return fetch(baseURL + '/api/student/update', requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    /**
     * 
     */
    static deleteStudent(id) {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};
        
        return fetch(baseURL + '/api/student/delete/' + id, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true; 
                result.errorStatus = response.status;
                return response.text();
            }).then(myJson => {
                result.errorMessage = myJson;
                return result;
        });
    };

    static getStudentLessons(id) {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token')
            }
        }

        let result = {sucess: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + 'api/', requestOptions)
            .then(response => {
                if (response.ok) result.sucess = true;
                response.errorStatus = response.status;
                return response.json();
            })
            // .then(myJson => {
            //     result.errorMessage = myJson;
            // })
        ;
    };

    static verifyStudent(id) {
        let requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        let result = {sucess: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + '/api/student/verify/' + id, requestOptions)
            .then(response => {
                if (response.ok) result.sucess = true;
                else result.errorStatus = response.status;
                return response.text(); 
            })
    }

    /** ========================================================
     * TEACHERS
    ========================================================= */
    
    static getTeachers() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + "/api/teacher/all", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            });
            // // .then(myJson => {
            // //     result.errorMessage = myJson;
            // //     return result;
            // });
    };

    static createTeacher(data) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  
        return fetch(baseURL + '/api/teacher/create', requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    static editTeacher(data) {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  

        return fetch(baseURL + '/api/teacher/update', requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    static deleteTeacher(id) {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};
        
        return fetch(baseURL + '/api/teacher/delete/' + id, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true; 
                result.errorStatus = response.status;
                return response.text();
            }).then(myJson => {
                result.errorMessage = myJson;
                return result;
        });
    };

    /** ========================================================
     * LESSONS
    ========================================================= */

    static getLessons() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + "/api/lesson/all", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            });
            // .then(myJson => {
            //     result.errorMessage = myJson;
            //     return result;
            // });
    };

    getLessonTeachers(id) {
        console.log('[AdminService] getLessonTeachers. id: ' + id);
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        let result = {succes: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + '/api/lesson/teachers/' + id, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.succes = true;
                result.errorStatus = response.status;
                // return response.json();
            })
    }

    assignTeacher(idLesson, idTeacher) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }

        let result = {succes: false, errorStatus: null, errorMessage: ''};

        return fetch(baseURL + '/api/lesson/addTeacher/' + idTeacher + '/' + idLesson, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true; 
                result.errorStatus = response.status;
                return response.text();
            }).then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    }

    static createLesson(data) {
        console.log('[AdminService] createLesson');
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  
        return fetch(baseURL + '/api/lesson/create', requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    static editLesson(data) {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
            },
            body: JSON.stringify(data),
        };

        let result = {success: false, errorStatus: '', errorMessage: ''};  

        return fetch(baseURL + '/api/lesson/update', requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    };

    static deleteLesson(id) {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        
        let result = {success: false, errorStatus: null, errorMessage: ''};
        
        return fetch(baseURL + '/api/lesson/delete/' + id, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) result.success = true; 
                result.errorStatus = response.status;
                return response.text();
            }).then(myJson => {
                result.errorMessage = myJson;
                return result;
        });
    };
}

export default AdminService;
