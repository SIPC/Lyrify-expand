const google = require("google-translate-api-x");

async function translate(from, to, text){
    const response = await google.translate(text, {
        from: from,
        forceFrom: true,
        to: to,
        forceTo: true,
      });
    return response
}

module.exports = translate