# Music Theory

## Objectives

The aim of this program is to provide music theory students with infinite exercises, in order to practise concepts from grade 1 to 5 (ABRSM).

## Development

The development of this program is at the earliest stage, which entails gathering requirements, define main topics and exercises, and write basic functionalities to evaluate main music theory concepts.

## Content

The directory contains a "./utils" and a "./exercises" folder, which cointain the logic of the program.

### Utils

This folder is organised in the following subfolders:
- "./chords"
- "./intervals"
- "./keys"
- "./melody"
- "./notes"
- "./rhythm"
- "./terms"

#### Notes

- *"./notes-utils.js"* contains data structs that define notes and accidentals.

- *"./notes-functions.js"* contains functions to sort notes and get random notes.

- *"./note.js"* contains the class Note, which is initialised with a string containing letter name, accidental and octave number (e.g.: "C#4", "B3", "Fb5").

#### Intervals

- *"./intervals-utils.js"* contains data structs that define interval numbers, qualities and relationship between these and the number of semitones.

- *"./intervals-functions.js"* contains functions to calculate intervals between two notes, or find a new note from a starting note and an interval.

- *"./interval.js"* contains the class Interval, which is initialised with a string containing quality and distance (as a number) of the interval (e.g.: "minor 2", "major 10", "perfect 8").

#### Chords

- *"./chord-functions.js"* cointains functions that return different kind of chords and key triads.

#### Keys

- *"./keys-utils.js"* contains data structs that define key signatures and degree names.

- *"./keys-functions.js"* contains functions that return the key signature from a key name.

- *"./scales-functions.js"* contains functions that create key scales and chromatic scales.

- *"./key.js"* contains the class Key, which is initialised with a string containing the key name (e.g.: "D minor", "F# major").

#### Melody

- *"./melody-utils.js"* contains data structs that define melody costruction criteria.

- *"./melody-functions.js"* contains a function that returns a random melody.

#### Rhythm

- *"./rhythm-utils.js"* contains data structs that define note values, lengths and time signatures.

- *"./rhythm-subdivision.js"* contains functions that are combined recursively to subdivide a longer note into random smaller notes.

- *"./rhythm-functions.js"* contains functions that interact with bars and key signatures, as well as create random rhythmic patterns.

#### Terms

- *"./terms-and-signs.js"* contains data structs that define terms required in exercises.

## Concepts

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
    - **Recognise all major and minor scales**
    - **Degrees of a scale and their names**
    - Tones and Semitones
    - Chromatic scale 
- Intervals:
    - **Calculating simple and compound intervals**
    - **Classifying perfect, minor, major, diminished and augmented intervals**
- Chords:
    - **Tonic triads in major and minor keys**
    - Primary chords and primary triads
    - Root position, inversions
    - Cadences
    - Choosing suitable chords for melodies
    - All chords of scales 
    - 7th chords 
- Terms and signs in Italian, French and German
- Ornaments
- Instruments and voice types


## Exercises

### Rhythm

- Grade One:
    - Quiz
    - Musical sum
    - Mark beat number
    - Time signature true/false
    - Complete time signature
    - Add note to complete bar
    - Add missing bar lines
    - Check grouping
    - Ties: write length
    - Musical sum with ties
    - Musical sum with dots
    - Add dot to one note to match time signature
- Grade Two:
    - Minim beat and quaver beat
    - Triplets
    - Dotted rests
    - Grouping rests
    - Quiz
    - Complete time signature
    - Add note to complete bar and write beats
    - Add bar lines
    - Rewrite rhythm in different metre
    - Check grouping
- Grade Three:
    - Demisemiquaver
    - Upbeat
    - Duple, Triple, Quadruple time
    - Simple and Compound time
    - Quiz
    - Complete time signature
    - Add note to complete bar and write beats
    - Add bar lines
    - Rewrite rhythm in different metre
    - Check grouping
- Grade Four:
    - Breve
    - Double dots
    - Duplets in compound
    - 4/8
    - Compound time signatures in 4 and 16
    - Quiz
    - Complete time signature
    - Add note to complete bar and write beats
    - Add bar lines
    - Rewrite rhythm in different metre
    - Check grouping
- Grade Five:
    - Irregular time signatures
    - Quintuplets, sextuplets
    - Quiz
    - Complete time signature
    - Add note to complete bar and write beats
    - Add bar lines
    - Rewrite rhythm in different metre
    - Check grouping


### **Pitch**

- **Grade One:**
    - *Name note in treble and bass clef (with/out acc)*
    - **Find the higher note of two (with/out acc)**
    - *Spell words with notes*
    - *Add clef to note and note name*
    - **Find semitones and tones**
    - **Add accidental to make semitones or tones**
- **Grade Two:**
    - *Name note with ledger line (up to two)*
    - **Find the higher note of two**
    - *Spell words with notes*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
- **Grade Three:**
    - *Name note with ledger line (up to three)*
    - **Find the higher note of two**
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - **Transpose one octave higher/lower**
- **Grade Four:**
    - *Name note in alto clef*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - *Double sharp and double flat*
    - **Find enharmonic equivalent**
    - **Enharmonic equivalente true/false**
    - **Transpose one octave higher/lower**
- **Grade Five:**
    - *Name note in tenor clef*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - **Find enharmonic equivalent**
    - **Enharmonic equivalente true/false**
    - **Transpose one octave higher/lower**
    - **Transpose a major 2nd, minor 3rd, perfect 5th**
    - **Find new key signature**
    - **Transposing instruments**

### Keys & Scales

- Grade One:
    - **Keys: C, G, D, F major**
    - **Add notes to complete scale**
    - **Find degrees of a scale**
    - Find tones and semitones in a scale
    - **Recognise scales**
    - **Add accidentals to scales**
    - **Given a key signature, find the major key**
    - **Select correct key signature for scales**
    - *Recognise accidentals*
    - **Given a melody with accidentals, recognise the key**
    - **Select notes that need accidental to create melody in given key**
- Grade Two:
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Recognise key signatures**
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Find degrees of scales**
    - Find tones / semitones of scales
    - **Find key of given melody**
    - **Find relative minors**
    - **Harmonic scales**
- Grade Three:
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **Add accidentals to scales**
    - **Find degrees of scales**
    - **Recognise key signatures**
    - **Add accidentals to melodies**
    - **Melodic scales**
    - **Find relative minors**
    - **Recognise scales**
    - Select accidentals that aren't needed
- **Grade Four:**
    - **Keys: Db, B major and G#, Bb minor**
    - **Technical names for the degrees**
    - *Choose correct clef for key signature*
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Recognise key of melody**
    - **Chromatic scale - find incorrect notes**
    - **Name major and minor keys for key signature**
    - **Recognise scales**
- **Grade Five:**
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Find the correct key signature for a key**
    - *Choose correct clef for key signature*
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Find degrees of scales**
    - **Complete scales**

### **Intervals**

- **Grade One:**
    - **Keys: C, G, D, F major**
    - **Calculate ascending intervals (number only) from the tonic**
    - **Given the tonic and an ascending interval, find the second note**
- **Grade Two:**
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Calculate ascending intervals (number only) from the tonic**
    - **Given the tonic and an ascending or descending interval, find the second note**
- **Grade Three:**
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **Calculate ascending simple intervals (perfect / minor / major) from the tonic**
    - **Given the tonic and a simple interval, find the second note**
- **Grade Four:**
    - **Keys: Db, B major and G#, Bb minor**
    - **Calculate intervals from any note**
    - **Given a note and an interval, find the second note**
    - **Count semitones in intervals**
- **Grade Five:**
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Calculate chromatic and compound intervals from any note**
    - **Given a note and a chromatic / compound interval, find the second note**
    - **Count semitones in intervals**

### Chords

- **Grade One**:
    - **Keys: C, G, D, F major**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
- **Grade Two**:
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
- **Grade Three:**
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **True / False**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
    - **Add accidental to complete triad**
- Grade Four:
    - **Keys: Db, B major and G#, Bb minor**
    - **Primary triads**
    - **Name the key of triads (3, 2, 1)**
    - **Recognise triad degree**
    - **Write triad in root position**
    - Recognise primary chords
- Grade Five:
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Recognise triad degree**
    - **Add note to complete triad**
    - Recognise cadences
    - Choose suitable chord for melody
    - Choose chords, then name cadences
    - Recognise Inversions in triads and chords

