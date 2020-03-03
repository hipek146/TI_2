
onError = (error) => {
    console.log(error);
}

window.onload = () => {
    fetchAPI(
        "http://pascal.fis.agh.edu.pl:11277/notki",
        {login: session_login, haslo: session_haslo, method: "GET"}, 
        {successful: show, failure: onError, error: onError}
    );
}