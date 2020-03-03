<?php if ($CURRENT_PAGE != "logowanie" && $CURRENT_PAGE != "rejestracja" && $CURRENT_PAGE != "dokumentacja") {?>
    <header>
        <span>Notatki</span>
        <a class=" <?php if ($CURRENT_PAGE == "dodawanie") {?>active<?php }?>" href="dodawanie">Dodawanie</a>
        <a class=" <?php if ($CURRENT_PAGE == "wyswietlanie") {?>active<?php }?>" href="wyswietlanie">Wyświetlanie</a>
        <a class=" <?php if ($CURRENT_PAGE == "analiza") {?>active<?php }?>" href="analiza">Analiza</a>
        <a class=" <?php if ($CURRENT_PAGE == "wyloguj") {?>active<?php }?>" href="wyloguj">Wyloguj</a>
</header>
<?php }?>