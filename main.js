var booksBody = document.getElementById('booksBody');
var nflBody = document.getElementById('nflBody');
var navLinks = document.getElementsByClassName('navLinks');
var booksRow = document.getElementsByClassName('booksRow')[0];
var nflRow = document.getElementsByClassName('nflRow')[0];
var tab = document.getElementsByTagName('table')[0];


for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click',display);
}

function display(e) {
	e.preventDefault();
	var link = this.getAttribute('href');
	var xml = new XMLHttpRequest();
	xml.open('get',link);
	xml.addEventListener('readystatechange',function () {
		if (xml.readyState == 4 && xml.status == 200) {
			createTable(xml)
		}
	})
	xml.send();
	}

	function createTable(xml) {
		var data = JSON.parse(xml.responseText);
		var first = data[0];
		var headText = `<thead><tr>`;

		for(prop in first){
			headText += `<th>${prop}</th>`;
		}


		headText += `</tr></thead>`;
		tab.innerHTML = headText;
		var texxBody = `<tbody>`;
			for (var i = 0; i < data.length; i++) {
				texxBody += `<tr>`
				for(prop in data[i]){
					texxBody += `<td>${data[i][prop]}</td>`
				}
				texxBody += `</tr>`;
			}

		texxBody += `</tbody>`;
		tab.innerHTML += texxBody;

	}