const fs = require('fs');

let buffer = fs.readFileSync('./dist/map.json');
const map = JSON.parse(buffer.toString());
console.log(map);

buffer = fs.readFileSync('./dist/index.html');
const template = buffer.toString();

let html = template.replace(/<[^<]*compile-attr="[^"]*"[^>]*>/g, (word) => {
  const attr = word.match(/compile-attr="([^"]*)"/)[1];
  const attrValue = word.match(new RegExp(`${attr}="([^"]*)"`))[1];
  const oldAttr = `${attr}="${attrValue}"`;
  const newAttr = `${attr}="${map[attrValue]}"`;
  console.log("map %s -> %s", oldAttr, newAttr);
  return word.replace(
    new RegExp(`${attr}="${attrValue.replace('.', '\\.')}"`),
    `${attr}="{% static '${map[attrValue]}' %}"`
  );
});

html = html.replace(/\s?compile-attr="[^"]*"/g, "");

fs.writeFile('./dist/index.html', '{% load staticfiles %}\n' + html, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("Success");
});
