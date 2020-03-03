function fetchAPI(url, opcje = {}, callbacks = {}) {
    fetch(url, {
        method: opcje.method ? opcje.method : 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ window.btoa(opcje.login + ':' + opcje.haslo)
        },
        referrerPolicy: 'no-referrer',
        body: opcje.method === 'GET' ? undefined : JSON.stringify(opcje.data ? opcje.data : {}) 
    })
    .then((response) => {return response.json()})
    .then(json => {
        if(json.status === 'successful') {
            callbacks.successful && callbacks.successful(json);
        } else {
            callbacks.failure && callbacks.failure(json);
        }
        return json;
    })
    .catch((error) => {
        console.log(error);
        callbacks.error && callbacks.error(error);
    });
}
