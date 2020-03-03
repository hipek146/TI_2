<div class="flexCenter">
<div class="tlo"><h1>Rejestracja</h1></div>


<?php
    if(isset($_SESSION['error'])) {
        echo "<div class='blad'>" . $_SESSION['error'] . "</div>";
    }
    if(isset($_GET['status']) && $_GET['status'] == "ok") {
        header("Location: logowanie&registred=true");
        exit;
    } else if(isset($_GET['status']) && $_GET['status'] == "error") {
        $_SESSION['tmp_login'] = null;
        $_SESSION['tmp_haslo'] = null;
        if(isset($_GET['message'])) {
            $_SESSION['error'] = $_GET['message'];
        } else {
            $_SESSION['error'] = 'Błąd podczas rejestracji';
        }
        header("Location: rejestracja");
        exit;
    } else if(isset($_GET['status']) && $_GET['status'] == "connect_error") {
        $_SESSION['tmp_login'] = null;
        $_SESSION['tmp_haslo'] = null;
        $_SESSION['error'] = 'Błąd połączenia';
        header("Location: rejestracja");
        exit;
    } else {
        $_SESSION['error'] = null;
    }

    if(isset($_POST['login']) && isset($_POST['haslo'])) {
        echo '<script src="js/rejestracja.js"></script>';
        echo '<script>
            rejestracja("'. $_POST['login'] .'", "'. $_POST['haslo'] .'"
                )
            </script>';
        $_SESSION['tmp_login'] = $_POST['login'];
        $_SESSION['tmp_haslo'] = $_POST['haslo'];
        echo '<h1>Rejestracja...</h1>';
        exit;
    } 
?>

    <form method="POST" action="" class='formularz formularzLogowanie'>
        Login: <input name="login" id="login"/>
        Hasło: <input type="password" name="haslo" id="haslo" />
        <button type="submit" class="button" >Zarejestruj się</button>
    </form>
    <a href="logowanie"><button type="button" class="button" >Zaloguj się</button></a>
</div>