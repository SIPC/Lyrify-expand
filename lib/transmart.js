const axios = require("axios");

function initData(from, to, text) {
    return {
      header: {
        fn: "auto_translation",
        client_key:"browser-edge-chromium-123.0.0-Windows_10-793961b6-556c-46fd-8092-8f975f2335d3-1708529948457",
      },
      type: "plain",
      model_category: "normal",
      source: {lang: from,text_list: [text]},
      target: {lang: to},
    };
}

async function translate(from, to, text){
    const post_str = JSON.stringify(initData(from, to, text));
    const response = await axios.post("https://yi.qq.com/api/imt", post_str, {
        headers: {
          "Content-Type": "application/json",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
          referer: "https://yi.qq.com/zh-CN/index",
        },
      });
    return response;
}

module.exports = translate