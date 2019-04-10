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
    }).then(response => response.json)
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
      .then(results => {return results.json();})
      .then(data => this.setState({name : data}))
  };
}