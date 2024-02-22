const google = require("google-translate-api-x");

async function translate(from, to, text){
  try {
    const response = await google.translate(text, {
        from: from,
        forceFrom: true,
        to: to,
        forceTo: true,
      });
    response.code = 200;
    return response
  } catch (error) {
    throw new Error(error);
}
}

module.exports = translate