
<?php
/* sending JSON object */
$_POST = json_decode(file_get_contents("php://input"), true);
/* sending FormData object*/
echo var_dump($_POST);





