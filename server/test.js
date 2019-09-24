var Classifier = require('wink-naive-bayes-text-classifier');
var fs = require('fs');
// Instantiate
var nbc = Classifier();
// Load NLP utilities
var nlp = require('wink-nlp-utils');
// Configure preparation tasks
nbc.definePrepTasks([
    // Simple tokenizer
    nlp.string.tokenize0,
    // Common Stop Words Remover
    nlp.tokens.removeWords,
    // Stemmer to obtain base word
    nlp.tokens.stem,
]);
// Configure behavior
nbc.defineConfig({considerOnlyPresence: true, smoothingFactor: 0.5});
var files = fs.readFileSync('./model.json');
nbc.importJSON(files);
nbc.consolidate();

console.log(nbc.predict('can you tell name of your father'));
