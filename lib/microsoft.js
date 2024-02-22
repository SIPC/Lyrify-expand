const axios = require("axios");
const jwt = require("jsonwebtoken");

var token;

async function TestToken() {
  if (!token || jwt.decode(token).exp <= Date.now() / 1000) {
    const auth = await axios.get("https://edge.microsoft.com/translate/auth");
    token = auth.data;
  }
}

async function translate(from, to, text) {
  try {
    await TestToken();
    const apiUrl = `https://api.cognitive.microsofttranslator.com/translate?from=${from}&to=${to}&api-version=3.0&includeSentenceLength=true`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const textObject = [{ text: text }];
    const response = await axios.post(apiUrl, textObject, { headers });
    response.data.code = response.status
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = translate;
