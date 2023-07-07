const { createBar, checkBarBeats } = require("./utils/rhythm/rhythm-functions");
const { subdivideCompoundTernaryNote } = require("./utils/rhythm/rhythm-subdivision");

for (let i = 0; i < 100; i++) {
    const group = createBar([2, 2], "minim", "demisemiquaver", 5);
    console.log(checkBarBeats(group, [2, 2]));
}