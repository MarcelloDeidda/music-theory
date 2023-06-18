const Note = require("./utils/note");
const IntervalCalculator = require("./utils/intervals/interval-calculator");
const Interval = require("./utils/intervals/interval");

const a = new Note("B2");
const b = new Note("B#2");
const c = new Note("F2");
const d = new Note("Db2");
const e = new Note("Fb2");

const intervalCalculator = new IntervalCalculator();
const interval = new Interval("7 minor");

console.log(intervalCalculator.calculateNoteFromInterval(a, interval));
console.log(intervalCalculator.calculateInterval(a, b));
console.log(interval);