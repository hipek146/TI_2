<script src="restApi/walidacja.js"></script>
<script src="js/fetchApi.js"></script>
<?php 
    if (isset($_SESSION['login']) && isset($_SESSION['haslo'])) {
        echo '<script>
        const session_login = "'. $_SESSION['login'] . '";
        const session_haslo = "'. $_SESSION['haslo'] . '"
        </script>' ;
    }
?>