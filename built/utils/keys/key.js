"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const intervals_functions_1 = require("../intervals/intervals-functions");
const chords_functions_1 = require("../chords/chords-functions");
const keys_functions_1 = require("./keys-functions");
const scales_functions_1 = require("./scales-functions");
const note_1 = __importDefault(require("../notes/note"));
const interval_1 = __importDefault(require("../intervals/interval"));
const Key = class {
    // This object is initialised with a string containing key name
    // (e.g.: "Ab major")
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getTonic() {
        let keyInfo = this.name.split(" ");
        return keyInfo[0];
    }
    getMode() {
        let keyInfo = this.name.split(" ");
        return keyInfo[1];
    }
    getRelative() {
        let mode = this.getMode();
        if (mode === "major") {
            return `${this.getDegree(6)} minor`;
        }
        else {
            return `${this.getDegree(3)} major`;
        }
    }
    getKeySignature() {
        return (0, keys_functions_1.getKeySignature)(this.name);
    }
    getAscScale(tonic) {
        if (this.getMode() === "major") {
            return (0, scales_functions_1.scaleFromKey)(tonic, this.getKeySignature());
        }
        else {
            const ascScales = {
                natural: (0, scales_functions_1.scaleFromKey)(tonic, this.getKeySignature()),
                harmonic: [],
                melodic: []
            };
            ascScales.harmonic = ascScales.natural.slice();
            ascScales.harmonic[6] = (0, intervals_functions_1.calculateNoteFromInterval)(ascScales.harmonic[6], new interval_1.default("augmented 1"));
            ascScales.melodic = ascScales.harmonic.slice();
            ascScales.melodic[5] = (0, intervals_functions_1.calculateNoteFromInterval)(ascScales.melodic[5], new interval_1.default("augmented 1"));
            return ascScales;
        }
    }
    getDescScale(tonic) {
        if (this.getMode() === "major") {
            return (0, scales_functions_1.scaleFromKey)(tonic, this.getKeySignature()).sort(() => -1);
        }
        else {
            const descScales = {
                natural: (0, scales_functions_1.scaleFromKey)(tonic, this.getKeySignature()).sort(() => -1),
                harmonic: [],
                melodic: []
            };
            descScales.harmonic = descScales.natural.slice();
            descScales.harmonic[1] = (0, intervals_functions_1.calculateNoteFromInterval)(descScales.harmonic[1], new interval_1.default("augmented 1"));
            descScales.melodic = descScales.natural.slice();
            return descScales;
        }
    }
    getDegree(degree) {
        let tonic = new note_1.default(`${this.getTonic()}3`);
        const scale = this.getAscScale(tonic);
        if ("harmonic" in scale) {
            return scale.harmonic[degree - 1].getNoteWithoutOctave();
        }
        else {
            return scale[degree - 1].getNoteWithoutOctave();
        }
    }
    getTriad(degree, tonic) {
        let triad = (0, chords_functions_1.triadFromKey)(degree, tonic, this.getKeySignature());
        if (this.getMode() === "minor") {
            let seventh = this.getDegree(7)[0];
            return triad.map(note => {
                if (note.getLetterName() === seventh) {
                    return (0, intervals_functions_1.calculateNoteFromInterval)(note, new interval_1.default("augmented 1"));
                }
                else {
                    return note;
                }
            });
        }
        return triad;
    }
};
exports.default = Key;
