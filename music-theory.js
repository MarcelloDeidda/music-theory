const Note = require("./utils/note");
const { calculateInterval } = require("./utils/interval-calculator");

const a = new Note("B1");
const b = new Note("C2");
const c = new Note("F2");
const d = new Note("Db2");
const e = new Note("Fb2");

console.log(calculateInterval(a, b));