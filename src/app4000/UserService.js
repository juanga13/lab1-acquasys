const baseURL = 'http://localhost:8080'

class UserService {
    static login(email, password) {
        let data = {token: '', role: '', error: {}};
        
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
        }
        
        // first fetch: get token
        return fetch(baseURL + '/oauth/token', tokenRequestOptions)
            .then(response => {return response.json()})
            .then(myJson => {
                data.token = myJson.access_token;
                console.log(data.token);
                return fetch(baseURL + "/oauth/check_token?token=" + data.token, roleRequestOptions)
                    .then(response => {return response.json()})
                    .then(myJson => {
                        data.role = myJson.authorities[0];
                        console.log(data.role);
                        return data;
                    })
            }
        )
    };

    static register() {

    };

    static getAdminData() { 
        console.log("getting data for admin");
        // TODO get students, teachers and lessons
        return "admin data!";
    };

    static getTeacherData() {
        console.log("teacher data");
        // TODO get classes with students
        return "teacher data!";
    };
    
    static getStudentData() {
        console.log("student data");
        // TODO get classes with teacher
        return "student data!";
    };
}

export default UserService;