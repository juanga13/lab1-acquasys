// const baseUrl = "http://172.22.44.128:8080";
// const baseUrl = "http://127.0.0.1:8080";
const baseUrl = "http://127.0.0.1:3306";
class RequestManager {
  static postData(url, data= {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => {
        response.resolve(response.status);
      })
      .catch(error => {
        console.log("Error: " + error)
      })
  };

    static userLogin(email, password) {
        let response;
        const data = {email, password};
        // const url = "grant_type=password&password=" + password + "&username=" + email;
        fetch(baseUrl + "/oauth/token", {
            method: 'POST',
            headers: new Headers({
                // 'Authorization': 'Basic '+btoa('username:password'),
                'Authorization': "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0",
                'Content-Type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            }),
            body: JSON.stringify(data)
        })
            .then(reponse => {
                if (!reponse.ok) console.log("error: " + response);
                else console.log("response: " + response);
            })
            .then()
            .catch(error => {
                console.log("userLogin error is: " + error)
            });
    }

    static getTokenSyncIsBad(email, password) {
        let urlen = "grant_type=password&password=" + password + "&username=" + email;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.datatype = 'json';

        xhr.open("POST", baseUrl + "/oauth/token", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0");//ClientId y clientsecret hardcodeado
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(urlen);
        return JSON.parse(xhr.responseText);
    };

    static getData(url) {
        return fetch(url,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {"Content-Type": "application/json"},
                redirect: "follow",
                referrer: "no-referrer"
            })
            .then(results => {
                return results.json();
            })
            .then(data => this.setState({name: data}))
    };

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