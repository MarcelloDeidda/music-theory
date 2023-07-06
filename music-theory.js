const { createBar } = require("./utils/rhythm/rhythm-functions");

for (let i = 0; i < 1; i++) {
    const group = createBar([9, 8], "breve", "semiquaver", 5);
    group.print()
}