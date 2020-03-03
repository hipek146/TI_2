<div class="flexCenter">
<div class="tlo"><h1>Notatki</h1></div>

<?php

    if(isset($_SESSION['error'])) {
        echo "<div class='blad'>" . $_SESSION['error'] . "</div>";
    } else if(isset($_GET['registred'])) {
        echo "<div class='pomyslnie'>Rejestracja przebiegła pomyślnie</div>";
    }
    if(isset($_GET['status']) && $_GET['status'] == "ok") {
        $_SESSION['login'] = $_SESSION['tmp_login'];
        $_SESSION['haslo'] = $_SESSION['tmp_haslo'];
        header("Location: wyswietlanie");
        exit;
    } else if(isset($_GET['status']) && $_GET['status'] == "error") {
        $_SESSION['tmp_login'] = null;
        $_SESSION['tmp_haslo'] = null;
        if(isset($_GET['message'])) {
            $_SESSION['error'] = $_GET['message'];
        } else {
            $_SESSION['error'] = 'Nieprawidłowy login lub hasło';
        }
        header("Location: logowanie");
        exit;
    } else if(isset($_GET['status']) && $_GET['status'] == "connect_error") {
        $_SESSION['tmp_login'] = null;
        $_SESSION['tmp_haslo'] = null;
        $_SESSION['error'] = 'Błąd połączenia';
        header("Location: logowanie");
        exit;
    } else {
        $_SESSION['error'] = null;
    }

    if(isset($_POST['login']) && isset($_POST['haslo'])) {
        echo '<script src="js/logowanie.js"></script>';
        echo '<script>
                logowanie("'. $_POST['login'] .'", "'. $_POST['haslo'] .'"
                )
            </script>';
        $_SESSION['tmp_login'] = $_POST['login'];
        $_SESSION['tmp_haslo'] = $_POST['haslo'];
        echo '<h1>Logowanie...</h1>';
        exit;
    } 

?>
    <div style="margin: 10px; text-align: center;">
    Przykładowe dane<br/>
    login: <b>admin</b> hasło: <b>admin01</b>
    </div>
    <form method="POST" action="" class='formularz formularzLogowanie'>
        Login: <input name="login" id="login"/>
        Hasło: <input type="password" name="haslo" id="haslo" />
        <button type="submit" class="button" >Zaloguj</button>
    </form>
    <a href="rejestracja"><button type="button" class="button" >Zarejestruj się</button></a>
</div>