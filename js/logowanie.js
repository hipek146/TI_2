function logowanie(login, haslo) {
    const sprawdz = walidacja({login: login, haslo: haslo}, "rejestracja");
    if( sprawdz !== "ok") {
        window.location.href = "logowanie&status=error&message=" + encodeURIComponent(sprawdz);
        return;
    }
    fetchAPI(
        "http://pascal.fis.agh.edu.pl:11277",
        {login: login, haslo: haslo}, 
        {
            successful: () => window.location.href = "logowanie&status=ok",
            failure: () => window.location.href = "logowanie&status=error",
            error: () => window.location.href = "logowanie&status=connect_error"
        }
    );
}