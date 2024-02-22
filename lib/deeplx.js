const deeplx = require("@ifyour/deeplx");

async function translate(from, to, text) {
  try {
    const params = {
      source_lang: from,
      target_lang: to,
      text: text,
    };
    const response = await deeplx.query(params);
    return response
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = translate;
