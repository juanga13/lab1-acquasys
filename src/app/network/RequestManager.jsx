//const baseUrl = "http://172.22.44.128:8080";
 const baseUrl = "http://127.0.0.1:8080";
class RequestManager {
    static baseUrl = "http://localhost:8080";


    static getUserInfo(token) {
        return fetch(baseUrl + "/oauth/check_token?token=" + token,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            }).then(results => {
            return results.json()
        });
    }
}

export default RequestManager;
