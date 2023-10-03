# Rhythm Utils and Functions

## rhythm-utils.js

This files contains the following data structures:

- **values**, an object containing relevant rhythm values, where the key is the name of the value and the value is the length expressed in beats.

- **timeSignatureTopValues**, an array containing all possible top values of a time signature, including simple, compound and irregular metres.

- **timeSignatureBottomValues**, an array containing all possible bottom values of a time signature, including minim, crotchet, quaver and semiquaver beats.

## rhythm-functions.js

This files contains the following functions:

- **findMetre**: (time signature as array, e.g. [3, 4]) => assess the top value of the time signature (first element of the array) and return "duple", "triple", "quadruple" or undefined.

- **isCompound**: (time signature as array, e.g. [3, 4]) => assess the top value of the time signature (first element of the array) and return true or false.

- **isIrregular**: (time signature as array, e.g. [3, 4]) => assess the top value of the time signature (first element of the array) and return true or false.

- **calculateTimeSignatureBeats**: (time signature as array, e.g. [3, 4]) => calculate ratio top/bottom of key signature and then multiply by four to obtain the total value of the bar expressed in crotchets, e.g. [6, 8] => 3, [5, 2] => 10.

