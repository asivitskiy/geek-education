<?php
$to  = "<sivikmail@gmail.com>, " ;
/*$to .= "mail2@example.com>";*/

$subject = "Тест";

$message = ' <p>Текст письма</p> </br> <b>1-ая строчка </b> </br><i>2-ая строчка </i> </br>';

$headers  = "Content-type: text/html; charset=windows-1251 \r\n";
$headers .= "From: От кого письмо <info@tetradka.pro>\r\n";
/*$headers .= "Reply-To: reply-to@example.com\r\n";*/

mail($to, $subject, $message, $headers);
?>
