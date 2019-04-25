const baseUrl = "http://172.22.44.128:8080";

class RequestManager {
  static postData(url: '', data= {}) {
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

    static getToken( username, password) {
        let urlen = "grant_type=password&password=" + password + "&username=" + username;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.datatype = 'json';

        xhr.open("POST", baseUrl + "/oauth/token", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0");//ClientId y clientsecret hardcodeado
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(urlen);
        return xhr.responseText
    };

    static getData(url: '') {
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