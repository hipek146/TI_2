<?php include("includes/config.php");?>
<!DOCTYPE html>
<html lang="pl">

<head>
    <?php include("includes/head.php");?>
    <?php include("includes/js.php");?>
</head>

<body>
    <?php include("includes/header.php");?>

    <main>
        <?php include("template/" . $CURRENT_PAGE . ".php");?>
    </main>

    <?php include("includes/footer.php");?>
</body>

</html>