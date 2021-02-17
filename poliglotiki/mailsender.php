<?php
$to = 'sivikmail@gmail.com';
$subject = '=?utf-8?B?'.base64_encode('Новое сообщение!').'?=';
$headers = 'From: =?UTF-8?B?' . base64_encode($name) . '?= <=?UTF-8?B?' . base64_encode($name) . "?=>\r\n";
$headers .= 'Return-path: <' . $email . ">\r\n";
$headers .= 'Content-type: text/plain; charset=utf-8' . "\r\n";
$headers .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
$message = "Новый запрос!\n\nИмя: $name\n\nEmail: $email\n\nТелефон: $tel\n\n";
$mail = mail($to, $subject, $message, $headers);
?>
