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
//var ind = {};
//var ind_num = 0;

var unique_words = [];

// create the file

var arr = new Array(2000); // create an empty array of length 2000
for (var i = 0; i < 2000; i++) {
  arr[i] = new Array(4000); // make each element an array
}

var iidd = fs.readFileSync("./keywords.txt", "utf8");
iidd = iidd.toString();
iidd = iidd.split("\n");












for (var i = 0; i < tot; i++) {
  var text = fs.readFileSync(files[i], "utf8");
  text = text.toString();
  var tt = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: false,
  });
  var newString = tt;
  var count = new Map();
  var cnt = 0;
  for (var j = 0; j < newString.length; j++) {
    if (count.has(newString[j]) == false) {
      count.set(newString[j], 1); // = 1;
    } else {
      count.set(newString[j], count.get(newString[j]) + 1); // = ;
    }
  }
  newString = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: true,
  });
  var sr = 0;
  for (var j = 0; j < newString.length; j++) {
    var x = count.get(newString[j]);
    var cal = x / newString.length;
    console.log("Running");
    sr = sr + x * x;
  }
  sr = Math.sqrt(sr);
  fs.appendFile("mod.txt", `${sr}\n`, (err) => {
    if (err) throw err;
  });
}

//unique_words.sort();

// All the Unique words are written to the file keywords.txt
