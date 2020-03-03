function rejestracja(login, haslo) {
    const sprawdz = walidacja({login: login, haslo: haslo}, "rejestracja");
    if( sprawdz !== "ok") {
        window.location.href = "rejestracja&status=error&message=" + encodeURIComponent(sprawdz);
        return;
    }
    fetchAPI(
        "http://pascal.fis.agh.edu.pl:11277/rejestracja",
        {login: login, haslo: haslo}, 
        {
            successful: () => window.location.href = "rejestracja&status=ok",
            failure: (json) => window.location.href = "rejestracja&status=error&message=" + encodeURIComponent(json.data),
            error: () => window.location.href = "rejestracja&status=connect_error"
        }
    );
}