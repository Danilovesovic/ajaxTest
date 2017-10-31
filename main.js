var booksBody = document.getElementById('booksBody');
var nflBody = document.getElementById('nflBody');
var navLinks = document.getElementsByClassName('navLinks');
var booksRow = document.getElementsByClassName('booksRow')[0];
var nflRow = document.getElementsByClassName('nflRow')[0];



createBooks();
createNfl();


for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click',switchDisplay);
}


function switchDisplay(e) {
	e.preventDefault();
	var data = this.getAttribute('href');
	console.log(data);
	if (data === "books") {
		booksRow.style.display = 'block';
		nflRow.style.display = 'none';
	}else{
		booksRow.style.display = 'none';
		nflRow.style.display = 'block';
	}
}

function createNfl() {
	var xml = new XMLHttpRequest();
	xml.open('GET', "http://mysafeinfo.com/api/data?list=nflseasonscores2015-2016&format=json");

	xml.addEventListener('readystatechange', function() {
		if (xml.readyState == 4 && xml.status == 200) {
			displayNflData(xml);
		}
	})
	xml.send();
}

function createBooks() {
	var xml = new XMLHttpRequest();
	xml.open('GET', "http://mysafeinfo.com/api/data?list=bestnovels&format=json");

	xml.addEventListener('readystatechange', function() {
		if (xml.readyState == 4 && xml.status == 200) {
			displayData(xml);
		}
	})
	xml.send();
}


function displayData(xml) {
	var data = JSON.parse(xml.responseText);
	var text = ``;
	for (var i = 0; i < data.length; i++) {
		text += `
		<tr>
			<td>${data[i].rank}</td>
			<td>${data[i].au}</td>
			<td>${data[i].tt}</td>
			<td>${data[i].yr}</td>
		</tr>
		`
	}
	booksBody.innerHTML = text;
}

function displayNflData(xml) {
	var data = JSON.parse(xml.responseText);
	console.log(data);
	var text = ``;
	for (var i = 0; i < data.length; i++) {
		text += `
		<tr>
			<td>${data[i].yr}</td>
			<td>${data[i].dy}</td>
			<td>${data[i].vis}</td>
			<td>${data[i].hom}</td>
		</tr>
		`
	}
	nflBody.innerHTML = text;
}