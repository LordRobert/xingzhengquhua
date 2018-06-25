var fs = require('fs');
var province = require('./province.json');
var city = require('./city.json');
var area = require('./area.json');

let data = [];
province.forEach((p) => {
	let pvn = {};
	pvn.value = p.code;
	pvn.label = p.name;
	pvn.children = [];
	city.forEach((c) => {
		if(c.parent_code == pvn.value) {
			let cty = {};
			cty.value = c.code;
			cty.label = c.name;
			cty.children = [];
			area.forEach((a) => {
				if(a.parent_code == cty.value) {
					let ara = {};
					ara.value = a.code;
					ara.label = a.name;
					cty.children.push(ara);
				}
			});
			pvn.children.push(cty);
		}
	});
	data.push(pvn);
});



fs.writeFile(__dirname + "/data.json", JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});


// console.log(process.execPath)
// console.log(__dirname)
// console.log(process.cwd())