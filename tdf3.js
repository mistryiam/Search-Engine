var txt = [];

var keys = [];

var tot = 1020; // assign the num of files
const keyword_extractor = require("keyword-extractor");
var fs = require("fs");

var files = [];

for (var i = 0; i < tot; i++) {
  files.push("./problems/problem" + (i + 1) + ".txt");
}

var words = [];
var ind = new Map();
var ind_num = 0;

var unique_words = [];

// create the file

for (var i = 0; i < tot; i++) {
    //console.log(i);
  var text = fs.readFileSync(files[i], "utf8");
  text = text.toString();
  var tt = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: false,
  });
  var newString = tt;
  var count =new Map();
  var cnt = 0;
  for (var j = 0; j < newString.length; j++) {
    if (count.has(newString[j]) == false) {
      count.set(newString[j], 1); 
    } else {
      count.set(newString[j], count.get(newString[j]) + 1); 
    }
    if (ind.has(newString[j]) == false) {
      ind.set(newString[j],ind_num);// = ind_num;
      unique_words.push(newString[j]);
      ind_num=ind_num+1;
    }
  }
}

unique_words.sort();
//console.log(unique_words.length);

for (var i = 0; i < unique_words.length; i++) {
   // console.log(i);
  if (i != 0) {
    fs.appendFile("keywords.txt", `${unique_words[i]}\n`, (err) => {
      if (err) throw err;
    });
  } else {
    fs.writeFile("keywords.txt", `${unique_words[i]}\n`, (err) => {
      if (err) throw err;
    });
  }
}
// All the Unique words are written to the file keywords.txt

//Calculate the IDF values for each word
