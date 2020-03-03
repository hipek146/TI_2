<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    session_start();
    if(!isset($_GET['page'])) {
        header("Location: logowanie");
        exit;
    }

    if($_GET['page'] == "wyloguj") {
        $_SESSION = array();

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        header("Location: logowanie");
        exit;
    }
    if (!isset($_SESSION['login']) || !isset($_SESSION['haslo'])) {
        if(strtolower($_GET['page']) != "logowanie" && strtolower($_GET['page']) != "rejestracja" && strtolower($_GET['page']) != "dokumentacja") {
            header("Location: logowanie");
            exit;
        }
        $CURRENT_PAGE = strtolower($_GET["page"]);
    } else if(strtolower($_GET["page"]) == "logowanie") {
        header("Location: wyswietlanie");
        exit;
    } else {
        $CURRENT_PAGE = strtolower($_GET["page"]);
    }

	switch ($CURRENT_PAGE) {
		case "dodawanie":
			$PAGE_TITLE = "Dodawanie";
            break;
        case "wyswietlanie":
            $PAGE_TITLE = "Wyświetlanie";
            break;
        case "analiza":
            $PAGE_TITLE = "Analiza";
            break;
        case "rejestracja":
            $PAGE_TITLE = "Rejestracja";
            break;
        case "dokumentacja":
            $PAGE_TITLE = "Dokumentacja";
            break;
        default:
            $PAGE_TITLE = "Logowanie";
            $CURRENT_PAGE = "logowanie";
    }
?>
