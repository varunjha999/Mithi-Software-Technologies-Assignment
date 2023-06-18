const fs = require('fs');
const path = require('path');

const wordCounts = {};
const fileNames = ["Page1.txt", "Page2.txt", "Page3.txt"];
const excludeWordsFile = "exclude-words.txt";

const excludeWordData = fs.readFileSync(path.join(__dirname, excludeWordsFile), { encoding: 'utf-8' });
const excludeWords = new Set(excludeWordData.split(/\s+/g));

for (let i = 0; i < fileNames.length; i++) {
  const wordData = fs.readFileSync(path.join(__dirname, fileNames[i]), { encoding: 'utf-8' });
  const words = wordData.split(/\s+/g);

  for (const itrWord of words) {
    const word = itrWord.toLowerCase().replace(/[^a-zA-Z']/g, '');

    if (word.length === 0 || excludeWords.has(word)) {
      continue;
    }

    if (wordCounts[word]) {
      if (!wordCounts[word].includes(i + 1)) {
        wordCounts[word].push(i + 1);
      }
    } else {
      wordCounts[word] = [i + 1];
    }
  }
}

const sortedWords = Object.keys(wordCounts).sort();

const outputFile = "output.txt";
const outputData = ["Word : Page Numbers", "-------------------"];

for (const itrWord of sortedWords) {
  const counts = wordCounts[itrWord];
  outputData.push(`${itrWord} : ${counts.join(',')}`);
}

fs.writeFileSync(path.join(__dirname, outputFile), outputData.join('\n'));

console.log("Output file generated successfully");