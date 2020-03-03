walidacja = (dane, typ) => {
    if(typ === 'notka') {
        const klucze = ['tresc', 'data', 'godzina', 'typ'];
        const typy = ['Święto', 'Spotkanie', 'Przyjęcie', 'Zdrowie', 'Inne'];
        if(Object.keys(dane).filter(key => !klucze.includes(key)).length) return "Nierozpoznany typ danych";
        if(!typy.includes(dane.typ)) return "Nierozpoznany typ notatki";
        if(!dane.tresc || !dane.tresc.length) return "Brak treści";
        if(dane.data) {
            const reg = new RegExp("^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$");
            if(reg.test(dane.data)) return "Nieprawidłowa data";
        }
        if(dane.godzina) {
            const reg = new RegExp("^(([01]\d|2[0-3]):([0-5]\d))$");
            if(reg.test(dane.data)) return "Nieprawidłowa godzina";
        }
    } else if (typ === 'rejestracja') {
        if(dane.login.length < 5) return "Login musi składać się z przynajmniej 5 znaków";
        if(dane.haslo.length < 5) return "Hasło musi składać się z przynajmniej 5 znaków";
    }
    return "ok";
}

try {
    module.exports = walidacja;
} catch(err) {

}
