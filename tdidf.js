var txt = [];

var keys = [];

var tot = 1020; // assign the num of files
const keyword_extractor = require("keyword-extractor");
var fs = require("fs");

var files = [];

//  check if the files exist
for (var i = 0; i < tot; i++) {
  files.push("./problems/problem" + (i + 1) + ".txt");
}

var words = [];
//var ind = {};
//var ind_num = 0;

var unique_words = [];

// create the file

var arr = new Array(1100); // create an empty array of length 2000
for (var i = 0; i < tot; i++) {
  arr[i] = new Array(4000); // make each element an array
}

var iidd = fs.readFileSync("./keywords.txt", "utf8");
iidd = iidd.toString();
iidd = iidd.split("\n");

var idf = fs.readFileSync("./idf.txt", "utf8");
idf = idf.toString();
idf = idf.split("\n");

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
      count.set(newString[j], 1);
    } else {
      count.set(newString[j], count.get(newString[j]) + 1);
    }
  }
  newString = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: true,
  });
  for (var j = 0; j < newString.length; j++) {
    var curw = newString[j];
    var index = iidd.indexOf(curw);
    if (index == -1) {
      console.log("Index is not found");
      continue;
    }
    var idf_st = idf[index];
    var idf_val = parseFloat(idf_st);
    arr[i][index] = idf_val * (count.get(curw) / newString.length);
  }
}

// for (var i = 0; i < 10; i++) {
//   for (var j = 0; j < 127; j++) {
//     if (arr[i][j] != undefined) {
//       console.log(i, j, arr[i][j]);
//       //console.log();
//     }
//   }
// }

for (var i = 0; i < tot; i++) {
  for (var j = 0; j < 3935; j++) {
      console.log("Running");
    if (arr[i][j] != undefined) {
      fs.appendFile("td-idf.txt", `${i} ${j} ${arr[i][j]}\n`, (err) => {
        if (err) throw err;
      });
    //   fs.appendFile("td-idf.txt", ` `, (err) => {
    //     if (err) throw err;
    //   });
    //   fs.appendFile("td-idf.txt", `${arr[i][j]}\n`, (err) => {
    //     if (err) throw err;
    //   });
    }
  }
}
