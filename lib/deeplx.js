const deeplx = require("@ifyour/deeplx")

async function translate(from, to, text) {
    const params = {
        "source_lang": from,
        "target_lang": to,
        "text": text
    }
    return await deeplx.query(params);
}
module.exports = translate