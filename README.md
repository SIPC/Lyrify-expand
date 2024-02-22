<h1 align="center">Lyrify expand - 翻译节点</h1>

### 特性
- 聚合多种逆向翻译服务：如 Google, Microsoft, Transmart, Youdao, Deeplx 等

### Docker 部署

```docker
docker run -d --restart=always --name lyrify-expand -p 3001:3000 sipcink/lyrify-expand
```

### 使用
```shell
curl --location -g --request POST 'http://localhost:3000/{{model}}/translate' \
--header 'Content-Type: application/json' \
--data '{
    "text": "你好",
    "from": "zh-cn",
    "to": "en"
    }'
```