# Music Theory

## Objectives

The aim of this program is to provide music theory students with infinite exercises, in order to practise concepts from grade 1 to 5 (ABRSM).

## Development

The development of this program is at the earliest stage, which entails gathering requirements, define main topics and exercises, and write basic functionalities to evaluate main music theory concepts.

## Content

The directory contains a "./utils" folder, in which are stored various functions and classes.

### ./note.js

This file exports a Note class, which is constructed via a string containing the name of the note, an accidental (if applicable) and the octave number.

### ./scales.js

This file contains:

- the array "notes", which stores the names of the seven notes, from C to B;
- the array "chromaticScale", which stores all the notes of the chromatic scale, grouping enharmonic notes into sub-arrays.
- the function "createScale", which takes the name of the tonic as a parameter and returns a one-octave ascending scale.
- the function "printKeyboard", which returns an array containing all the white keys of a piano.

## Topics

- Pitch:
    - Recognise notes with multiple ledger lines
    - Recognise notes in four different keys
    - Recognise accidentals
    - Calculate semitones and tones
    - Transposing by one octave, major 2nd, minor 3rd, perfect 5th
    - Double sharps and Double flats
    - Enharmonic equivalents
- Rhythm:
    - Time values
    - Time signatures in /2, /4, /8, /16
    - Duple, triple, quadruple / simple, compound
    - Irregular time signatures
    - Rests
    - Ties and dotted notes
    - Triplets, quintuplets, sextuplets
    - Grouping notes
- Keys & Scales:
    - Recognise all major and minor scales
    - Degrees of a scale and their names
    - Tones and Semitones
    - Chromatic scale
- Intervals:
    - Calculating simple and compound intervals
    - Classifying perfect, minor, major, diminished and augmented intervals
- Chords:
    - Tonic triads in major and minor keys
    - Primary chords and primary triads
    - Root position, inversions
    - Cadences
    - Choosing suitable chords for melodies
    - All chords of scales
    - 7th chords
- Terms and signs in Italian, French and German
- Ornaments
- Instruments and voice types


## Functions

Completed:

- Calculate interval;

To complete:

- 