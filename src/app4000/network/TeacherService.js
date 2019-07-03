const baseURL = 'http://ec2-3-82-218-146.compute-1.amazonaws.com:8080';
//const baseURL = 'http://localhost:8080';
class TeacherService {
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

        return fetch(baseURL + "/api/teacher/myLessons", requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            });

    };

    static getAttendances(lessonId) {
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

        return fetch(baseURL + "/api/lesson/attendance/"+ lessonId, requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.json();
            });

    };

    static setAttendance(data) {
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
        return fetch(baseURL + '/api/lesson/attendance', requestOptions)
            .then(response => {
                if (response.ok) result.success = true;
                else result.errorStatus = response.status;
                return response.text();
            })
            .then(myJson => {
                result.errorMessage = myJson;
                return result;
            });
    }
}

export default TeacherService;
