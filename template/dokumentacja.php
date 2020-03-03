<h1>Dokumentacja projektu</h1>
<div class="dokumentacja">
    Tematem aplikacji jest prosty program do tworzenia notatek.
    <br/>
    W trybie offline (bez połączenia z serwerem) dane przechowywanie są w lokalnej bazie danych. Po wznowieniu połączenia dane automatycznie przesyłane są do bazy danych na serwerze. Aplikacja umożliwia dodatkowo rejestrację i analizę danych (wykres ilości notatek dla każdego typu). Dane dodawane, wyświetlane i analizowane są w odrębie jednego użytkownika.<br/>
    <br/>
    Do komunikacji z bazą na serwerze wykorzystano styl RESTful API:<br />
    System autoryzacji:<br/>
    Nagłówek: Authorization: "Basic: login:hasło" zakodowany w formacje Base64<br/>
    Wszystkie zapytania wymagają autoryzacji<br/>
    <br/>
    <b>Polecenia:</b></br>
    <ul>
        <li>GET: http://pascal.fis.agh.edu.pl:11277/notki - Pobieranie notek z bazy danych </li>
        <li>POST: http://pascal.fis.agh.edu.pl:11277/notka - Dodawanie notek do bazy danych, body: [tablica notek w formacie JSON]</li>
        <li>POST: http://pascal.fis.agh.edu.pl:11277/rejestracjaka - Rejestracja użytkownika, dane w nagłówku autoryzacji</li>
        <li>POST: http://pascal.fis.agh.edu.pl:11277/ - Logowanie (pozwala stwierdzić czy jest sens tworzenia sesji)</li>
    </ul>
    <br/>
    Serwer API zwraca obiekt JSON zawierający:<br/>
    <ul>
        <li>status: 'successful' jeżeli zapytanie przebiegło pomyślnie, 'failure' w przeciwnym wypadku</li>
        <li>type: 'validate' dla nieudanego statusu, gdy wynikiem błędu było nieprzejście danych przez walidację</li>
        <li>data: dane w formacie JSON dla zapytania o pobranie danych lub ciąg znaków przekazujący komunikat</li>
    </ul>
    <br/>
    Aplikacja tworzy sesję przy użyciu technologii PHP</br>
    <br>
    Aplikacja waliduje dane po stronie klienta oraz serwera - notka musi mieć treść, oraz dozwolony typ, a jeżeli ma datę lub/i godzinę to muszą być one prawidłowe. Login i hasło muszą zawierać przynajmniej 5 znaków.</br>
    <br>
    <b>Wykorzystane technologie:</b><br/>
        <ul>
            <li>Node.js oraz Express.js (Serwer API)</li>
            <li>MongoDB (baza danych NoSQL na serwerze pascal), IndexDDB (baza danych NoSQL po stronie klienta)</li>
            <li>PHP (sesje, szablony, routing)</li>
            <li>HTML, CSS, JavaScript</li>
        </ul>
</div>
