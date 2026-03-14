const pdf = require('pdf-parse');
const fs = require('fs');
const buf = fs.readFileSync('c:/Favaz.DevXtra/8 Month Program/Phase 2/launchingsoon/public/AHMD CV.pdf');
pdf(buf).then(d => {
  console.log(d.text);
}).catch(e => console.error(e.message));
