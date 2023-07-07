const { createBar, checkBarBeats } = require("./utils/rhythm/rhythm-functions");
const { subdivideCompoundTernaryNote } = require("./utils/rhythm/rhythm-subdivision");

for (let i = 0; i < 1; i++) {
    try {
        const group = createBar([7, 8], "minim", "semiquaver");
        console.log(group)
    } catch (e) {
        console.log("ERROR");
        console.log(e);
    }
}