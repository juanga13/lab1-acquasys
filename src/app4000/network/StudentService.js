const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080';
//const baseURL = 'http://localhost:8080';

class StudentService {
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

    };

    static getMyself() {
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

        return fetch(baseURL + "/api/student/myself", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            })
    }

    static unroll(student, lesson) {
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

        return fetch(baseURL + "/api/lesson/unroll/"+student+"/"+lesson, requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            })
    }
    static enroll(student, lesson) {
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

        return fetch(baseURL + "/api/lesson/enroll/"+student+"/"+lesson, requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            })
    }
}

export default StudentService;
