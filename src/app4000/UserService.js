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
        let result = {success: false, error: false, errorMessage: ''};
        //TODO do requests and return responses
        return result;
    };

    static getAdminData() { 
        console.log("getting data for admin");
        // TODO get students, teachers and lessons
        const dataTest = {name: 'TestName', surname: 'TestSurname'};
        return dataTest;
    };

    static getTeacherData() {
        console.log("teacher data");
        // TODO get classes with students
        return "teacher data!";
    };
    
    static getStudentData() {
        console.log("student data");
        // TODO get classes with teacher
        const testData = {
            student1: {name: 'Fafundo', surname: 'Fonfalez', dni: '11111111'},
            student2: {name: 'Juan Jajriel', surname: 'Jicci', dni: '22222222'},
            student3: {name: 'Araielq', surname: 'Arairra', dni: '33333333'},
            student4: {name: 'Mamuel', surname: 'Muedrozo', dni: '44444444'},
            student5: {name: 'Toto', surname: 'Africa', dni: '55555555'},
            student6: {name: 'Wawey', surname: 'Wewez Wowina', dni: '66666666'},
            student7: {name: 'uwu', surname: 'owo', dni: '77777777'},
            student8: {name: 'Ezequiel', surname: 'Normalq', dni: '88888888'},
            student9: {name: 'Lancelot', surname: 'Lancelet', dni: '99999999'},
            student10: {name: 'Gawain', surname: 'Gawanet', dni: '11112222'},
            student11: {name: 'Geraint', surname: 'Geranet', dni: '33334444'},
            student12: {name: 'Percival', surname: 'Percivet', dni: '55556666'},
            student13: {name: 'Bors', surname: 'Boret', dni: '77778888'},
            student14: {name: 'Lamorak', surname: 'Lmao', dni: '11223344'},
            student15: {name: 'Kay', surname: 'Okay', dni: '55667788'},
            student16: {name: 'Gareth', surname: 'Tyu', dni: '99775533'},
            student17: {name: 'Bedivere', surname: 'Bedivettex', dni: '123456778'},
            student18: {name: 'Gaheris', surname: 'Gatheret', dni: '23456789'},
            student19: {name: 'Tristan', surname: 'Triste', dni: '12398755'},
            student20: {name: 'Palamedes', surname: 'Palidez', dni: '24682468'},
        };
        return testData;
    };
}

export default UserService;