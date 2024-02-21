const express = require("express");
const bodyParser = require("body-parser");
const youdao_translate = require("./lib/youdao");
const deeplx_translate = require("./lib/deeplx");
const transmart_translate = require("./lib/transmart");
const microsoft_translate = require("./lib/microsoft");
const google_translate = require("./lib/google");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    code: 200,
    message:
      "Lyrify-expand, Developed by sipc.ink, https://github.com/SIPC/Lyrify-expand",
  });
});

app.post("/:model/translate", async (req, res) => {
  const model = req.params.model;
  const text = req.body.text;
  const from = req.body.from;
  const to = req.body.to;
  res.json(await translate(model, from, to, text));
});

async function translate(model, from, to, text) {
  switch (model) {
    case "youdao":
      try {
        return JSON.parse(await youdao_translate(from, to, text));
      } catch (error) {
        return { code: 500, message: `Youdao translation failed: ${error}` };
      }
    case "deeplx":
      try {
        return await deeplx_translate(from, to, text);
      } catch (error) {
        return { code: 500, message: `Deeplx translation failed: ${error}` };
      }
    case "transmart":
      try {
        return await transmart_translate(from, to, text);
      } catch (error) {
        return { code: 500, message: `Transmart translation failed: ${error}` };
      }
    case "microsoft":
      try {
        return await microsoft_translate(from, to, text);
      } catch (error) {
        return { code: 500, message: `Microsoft translation failed: ${error}` };
      }
    case "google":
      try {
        return await google_translate(from, to, text);
      } catch (error) {
        return { code: 500, message: `Google translation failed: ${error}` };
      }
    default:
      return { code: 500, message: "The model does not exist." };
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: 500, message: err.message });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
