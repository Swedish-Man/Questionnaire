const prompt = require('prompt-sync')({ sigint: true })

const PromptSync = require('prompt-sync');
// Hämtar in JSON-fil och spara den i vår data-variabel
const data = require('./questions.json')
//const data2 = require('./spara-till.json')


// fs ger oss möjligheten att skriva till filer
const fs = require('fs')

let points = [0, 0, 0, 0];
let asd = 0;
const date = new Date();
console.log(date);
for (let i = 0; i < 15; i++) {
  console.log(data[i].question);

  let jaNejSvar = prompt("svar: ").trim().toLocaleLowerCase();
  if (jaNejSvar == 'ja') {
    points[0] += data[i].ja[0];
    points[1] += data[i].ja[1];
    points[2] += data[i].ja[2];
    points[3] += data[i].ja[3];
  }
  else if (jaNejSvar == 'nej') {
    points[0] += data[i].nej[0];
    points[1] += data[i].nej[1];
    points[2] += data[i].nej[2];
    points[3] += data[i].nej[3];
  } else {
    console.log("Valet finns inte. Därför hoppas frågan över!")
  }
  console.log(points);
}
let namn = prompt("Vad heter du?: ");

let totalPoints = points[0] + points[1] + points[2] + points[3]

let catPoints = points[0] / totalPoints * 100;
let dogPoints = points[1] / totalPoints * 100;
let rabbitPoints = points[2] / totalPoints * 100;
let fishPoints = points[3] / totalPoints * 100;

let procentResultat = [
  { animal: 'cat', point: catPoints },
  { animal: 'dog', point: dogPoints },
  { animal: 'rabbit', point: rabbitPoints },
  { animal: 'fish', point: fishPoints }
];

procentResultat.sort((a, b) => b.point - a.point);

console.log(procentResultat);

const resultat = {
  datum: date,
  namn: namn,
  point: procentResultat
}
console.log(resultat);

fs.writeFile('./spara-till.json', JSON.stringify(resultat, null, 2), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});