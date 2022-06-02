var txt = [];

var keys = [];

var tot = 1020; // assign the num of files
const keyword_extractor = require("keyword-extractor");
var fs = require("fs");

var files = [];

for (var i = 0; i < tot; i++) {
  files.push("./problems/problem" + (i + 1) + ".txt");
}

var iidd = fs.readFileSync("./keywords.txt", "utf8");
iidd = iidd.toString();
iidd = iidd.split("\n");
//console.log(iidd.length);
for (var i = 0; i < iidd.length-1; i++) {
  var curw = iidd[i];
  var cnt = 0;
  for (var j = 0; j < tot; j++) {
    var curf = fs.readFileSync(files[j], "utf8");
    curf = curf.toString();
    curf = keyword_extractor.extract(curf, {
      language: "english",
      remove_digits: false,
      return_changed_case: true,
      remove_duplicates: false,
    });
    if (curf.indexOf(curw) != -1) {
      cnt = cnt + 1;
    }
  }
  var temp=tot/cnt;
  var val = 1 + (Math.log(temp) / Math.log(10));
  //console.log(val,cnt);
  if (i != 0) {
    fs.appendFile("idf.txt", `${val}\n`, (err) => {
      if (err) throw err;
    });
  } else {
    fs.writeFile("idf.txt", `${val}\n`, (err) => {
      if (err) throw err;
    });
  }
}
