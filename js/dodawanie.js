window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

var DBOpenRequest  = window.indexedDB.open("bazaOffline", 8);
var db;
var interval, timeLeft;

DBOpenRequest.onupgradeneeded = function(event) { 
    db = event.target.result;
    var objectStore = db.createObjectStore("notki", {autoIncrement: true});
}

DBOpenRequest.onerror = function(event) {
    console.log(event.target.errorCode);
};
DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    update();
    fetchAPI(
        "http://pascal.fis.agh.edu.pl:11277/",
        {login: session_login, haslo: session_haslo}, 
        {
            successful:  alert.bind(null, "Online", "successful"), 
            failure:  alert.bind(null, "Błąd autoryzacji", "error"), 
            error:  alert.bind(null, "Offline", "error")
        }
    );
};

update = (json = {}) => {

    if(json.status === 'failure' && json.type === 'validate') {
        alert(json.data + " - Serwer odrzucił dane / zwalnianie pamięci", "error");
        var transaction = db.transaction(["notki"], "readwrite")
        .objectStore("notki")
        .clear();
        update();
        return;
    }

    var transaction = db.transaction(["notki"])
    .objectStore("notki")
    .getAll();

    transaction.onsuccess = function (event) {
        if(!transaction.result.length) {
            document.getElementById("zapisane").innerHTML = "";
            return;
        }

        alert("Tryb offline", "error")

        var header = "<div class='oczekiwanie'>Dane oczekujące na wznowienie połączenia:</div>"
        timeLeft = 5;
        var timer = "<div id='timer'>Automatyczne odświeżanie za: <b>" + timeLeft + "</b></div>";
        document.getElementById("zapisane").innerHTML = header + timer + "<div id='notki'></div>";
        show({data: transaction.result});
        interval = setInterval(() => {
            --timeLeft;
            document.getElementById("timer").innerHTML = "Automatyczne odświeżanie za: <b>" + timeLeft + "</b>";
            if(timeLeft <=0) {
                send();
            }
        }, 1000)
     }; 
}

clear = () => {
    var transaction = db.transaction(["notki"], "readwrite")
    .objectStore("notki")
    .clear();

    transaction.onsuccess = function (event) {
        var header = "<div>Pomyślnie dodano notkę</div>"
        document.getElementById("tresc").value = "";
        update();
        alert("Online - Pomyślnie dodano dane", "successful");
     }; 
}

send = () => {
    clearInterval(interval);
    var transaction = db.transaction(["notki"])
    .objectStore("notki")
    .getAll();

    transaction.onsuccess = function (event) {
        fetchAPI(
            "http://pascal.fis.agh.edu.pl:11277/notka",
            {data: transaction.result, login: session_login, haslo: session_haslo}, 
            {successful: clear, failure: update, error: update}
        );
    }
}

alert = (text, mode) => {
    const info = document.getElementById("info");
    info.innerHTML = text;
    if(mode === "successful") {
        info.style.background = "rgb(209, 245, 213)";
        info.style.color = "rgb(20, 194, 14)";
    } else {
        info.style.background = "rgb(252, 211, 211)";
        info.style.color = "rgb(170, 1, 1)";
    }
    info.style.display = "block";
}


function dodawanie(dane) {
    event.preventDefault();
    var formData = new FormData(event.target)

    var record = {};

    for(let el of formData) {
        if(el[1]) record[el[0]] = el[1];
    }
    const sprawdz = walidacja ? walidacja(record, 'notka') : 'ok';
    if(sprawdz !== 'ok') {
        alert(sprawdz, 'error');
        return;
    }

    var request = db.transaction(["notki"], "readwrite")
        .objectStore("notki")
        .add(record);

    
    request.onerror = function (event) {
        console.log('Nieudało się dadać danych');
    }

    send();
    
}