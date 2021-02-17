<?php
$to = 'sivikmail@gmail.com';
$subject = '=?utf-8?B?'.base64_encode('Тут тема').'?=';
$headers .= "From: От кого письмо <from@example.com>\r\n";
$headers .= 'Return-path: <' . $email . ">\r\n";
$headers .= 'Content-type: text/plain; charset=utf-8' . "\r\n";
$headers .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
$message = "Тут сообщение";
$mail = mail($to, $subject, $message, $headers);
?>
