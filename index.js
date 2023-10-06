const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const data = require('./questions.json');
const { v4: uuidv4 } = require('uuid');

let allResults = [];

try {
  const rawData = fs.readFileSync('./spara-till.json', 'utf8');
  if (rawData.trim() !== '') {
    allResults = JSON.parse(rawData);
  }
} catch (error) {
  console.error("Error loading previous results:", error);
}

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
    console.log("valet finns inte! därför hoppas frågan över");
  }
  console.log(points);
}

let userName = prompt("Vad heter du?: ");

const userId = generateUniqueUserId();

let totalPoints = points[0] + points[1] + points[2] + points[3];
let catPoints = (points[0] / totalPoints) * 100;
let dogPoints = (points[1] / totalPoints) * 100;
let rabbitPoints = (points[2] / totalPoints) * 100;
let fishPoints = (points[3] / totalPoints) * 100;

let procentResultat = [
  { animal: 'cat', percent: catPoints },
  { animal: 'dog', percent: dogPoints },
  { animal: 'rabbit', percent: rabbitPoints },
  { animal: 'fish', percent: fishPoints },
];

procentResultat.sort((a, b) => b.percent - a.percent);

const resultat = {
  datum: date,
  userId: userId,
  namn: userName,
  score: procentResultat,
};

console.log(resultat);

const existingResult = allResults.find((result) => result.userId === userId);

if (existingResult) {
  existingResult.scores = procentResultat;
  existingResult.date = new Date().toLocaleString();
} else {
  allResults.push(resultat);
}

fs.writeFileSync('./spara-till.json', JSON.stringify(allResults, null, 2));

console.log("Dina resultat har sparats!");

function generateUniqueUserId() {
  return uuidv4();
}
