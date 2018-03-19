$("#googleFontsList").keyup(function (e) {
	if (e.keyCode === 13) {
		$("#googleFontsList").hide();
	}
});
$("#FontName").keyup(function (e) {
	log("Hello:" + e.keyCode);
	$("#googleFontsList").show();

	switch (e.keyCode) {
		case 40:
			var index = $("#googleFontsList > option").slice($("#googleFontsList")[0].selectedIndex + 1).not("[disabled]").first().index();
			$("#googleFontsList")[0].selectedIndex = index;
			$("#googleFontsList").focus();
			return;
			break;
		case 38:
			var index = $("#googleFontsList > option").slice(0, $("#googleFontsList")[0].selectedIndex - 1).not("[disabled]").last().index();
			$("#googleFontsList")[0].selectedIndex = index;
			$("#googleFontsList").focus();
			return;
			break;
		case 13:
			$("#" + ConfigurationModel.FontName).val($("#googleFontsList").val());
			$("#googleFontsList").hide();
			return;
		default:
	}
	$("#googleFontsList > option").attr("style", "display:none").prop("disabled", true);
	$("#googleFontsList > option[value*='" + $("#FontName").val() + "']").removeAttr("style").prop("disabled", false);
});
document.getElementById('googleFontsList').onchange = function () {

	document.getElementById(ConfigurationModel.FontName).value = this.value;

	loadPreview();

};

/*
var supportedFonts = [];

function InitGoogleFonts() {
    if (supportedFonts.length === 0){

        googleFontsAdapter(setSupportedFontsFromApi);
    }

}

function googleFontsAdapter(setter) {
	//Reference for the HTTP in vanilla JS https://www.sitepoint.com/guide-vanilla-ajax-without-jquery
	let api = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + GoogleFontsApiKey;

	if (!GoogleFontsApiKey) {
		setter([{
			'family': 'Abel'
		}, {
			'family': 'Abril Fatface'
		}, {
			'family': 'Acme'
		}, {
			'family': 'Alegreya'
		}, {
			'family': 'Alex Brush'
		}, {
			'family': 'Amaranth'
		}, {
			'family': 'Amatic SC'
		}, {
			'family': 'Anton'
		}, {
			'family': 'Arbutus Slab'
		}, {
			'family': 'Architects Daughter'
		}, {
			'family': 'Archivo'
		}, {
			'family': 'Archivo Black'
		}, {
			'family': 'Arima Madurai'
		}, {
			'family': 'Asap'
		}, {
			'family': 'Bad Script'
		}, {
			'family': 'Baloo Bhaina'
		}, {
			'family': 'Bangers'
		}, {
			'family': 'Berkshire Swash'
		}, {
			'family': 'Bitter'
		}, {
			'family': 'Boogaloo'
		}, {
			'family': 'Bree Serif'
		}, {
			'family': 'Bungee Shade'
		}, {
			'family': 'Cantata One'
		}, {
			'family': 'Catamaran'
		}, {
			'family': 'Caveat'
		}, {
			'family': 'Caveat Brush'
		}, {
			'family': 'Ceviche One'
		}, {
			'family': 'Chewy'
		}, {
			'family': 'Contrail One'
		}, {
			'family': 'Crete Round'
		}, {
			'family': 'Dancing Script'
		}, {
			'family': 'Exo 2'
		}, {
			'family': 'Fascinate'
		}, {
			'family': 'Francois One'
		}, {
			'family': 'Freckle Face'
		}, {
			'family': 'Fredoka One'
		}, {
			'family': 'Gloria Hallelujah'
		}, {
			'family': 'Gochi Hand'
		}, {
			'family': 'Great Vibes'
		}, {
			'family': 'Handlee'
		}, {
			'family': 'Inconsolata'
		}, {
			'family': 'Indie Flower'
		}, {
			'family': 'Kaushan Script'
		}, {
			'family': 'Lalezar'
		}, {
			'family': 'Lato'
		}, {
			'family': 'Libre Baskerville'
		}, {
			'family': 'Life Savers'
		}, {
			'family': 'Lobster'
		}, {
			'family': 'Lora'
		}, {
			'family': 'Luckiest Guy'
		}, {
			'family': 'Marcellus SC'
		}, {
			'family': 'Merriweather'
		}, {
			'family': 'Merriweather Sans'
		}, {
			'family': 'Monoton'
		}, {
			'family': 'Montserrat'
		}, {
			'family': 'News Cycle'
		}, {
			'family': 'Nothing You Could Do'
		}, {
			'family': 'Noto Serif'
		}, {
			'family': 'Oleo Script Swash Caps'
		}, {
			'family': 'Open Sans'
		}, {
			'family': 'Open Sans Condensed'
		}, {
			'family': 'Oranienbaum'
		}, {
			'family': 'Oswald'
		}, {
			'family': 'PT Sans'
		}, {
			'family': 'PT Sans Narrow'
		}, {
			'family': 'PT Serif'
		}, {
			'family': 'Pacifico'
		}, {
			'family': 'Patrick Hand'
		}, {
			'family': 'Peralta'
		}, {
			'family': 'Permanent Marker'
		}, {
			'family': 'Philosopher'
		}, {
			'family': 'Play'
		}, {
			'family': 'Playfair Display'
		}, {
			'family': 'Playfair Display SC'
		}, {
			'family': 'Poiret One'
		}, {
			'family': 'Press Start 2P'
		}, {
			'family': 'Prosto One'
		}, {
			'family': 'Quattrocento'
		}, {
			'family': 'Questrial'
		}, {
			'family': 'Quicksand'
		}, {
			'family': 'Raleway'
		}, {
			'family': 'Rancho'
		}, {
			'family': 'Righteous'
		}, {
			'family': 'Roboto'
		}, {
			'family': 'Roboto Condensed'
		}, {
			'family': 'Roboto Slab'
		}, {
			'family': 'Rubik'
		}, {
			'family': 'Rye'
		}, {
			'family': 'Satisfy'
		}, {
			'family': 'Shadows Into Light'
		}, {
			'family': 'Shojumaru'
		}, {
			'family': 'Sigmar One'
		}, {
			'family': 'Skranji'
		}, {
			'family': 'Slabo 27px'
		}, {
			'family': 'Special Elite'
		}, {
			'family': 'Tinos'
		}, {
			'family': 'Ultra'
		}, {
			'family': 'UnifrakturMaguntia'
		}, {
			'family': 'VT323'
		}, {
			'family': 'Yanone Kaffeesatz'
		}]);
		return;
	}

	let xhr = new XMLHttpRequest();
	xhr.open('GET', api);
	xhr.send(null);

	log('Calling google fonts api');

	xhr.onreadystatechange = function () {
		let DONE = 4; // readyState 4 means the request is done.
		let OK = 200; // status 200 is a successful return.
		if (xhr.readyState === DONE) {
			if (xhr.status === OK)
				setter(JSON.parse(xhr.responseText).items); // 'This is the returned text.'
			else
				log('Error: ' + xhr.status); // An error occurred during the request.
		}
	}
}

function setSupportedFonts(fonts) {
	localStorage.setItem('supportedFonts', JSON.stringify(fonts));
	updateFontList(filterFontList(fonts));
}

function setSupportedFontsFromApi(fonts) {
	supportedFonts = fonts.map((v) => v.family);
	setSupportedFonts(supportedFonts);
}

function filterExactMatchOperation(currentItem, searchValue) {
	return !searchValue || currentItem === searchValue;
}

function filterPartialMatchOperation(currentItem, searchValue) {
	return !searchValue || currentItem.indexOf(searchValue) > -1;
}

function filterFontList(fonts, searchValue, searchOperation = filterPartialMatchOperation) {
	return fonts.filter(function (currentItem) {
		return searchOperation(currentItem, searchValue);
	});
}

function createCssLinkTag(encoded) {

	if (document.getElementById(`font-${encoded}`))
		return;

	const l = document.createElement('link');
	l.type = 'text/css';
	l.rel = 'stylesheet';
	l.id = `font-${encoded}`;
	l.href = `https://fonts.googleapis.com/css?family=${encoded}`;

	document.getElementsByTagName('head')[0].appendChild(l);

}

function createFontOption(fontFamily) {

	const option = document.createElement("option");
	option.style.fontFamily = fontFamily;
	option.text = fontFamily;
	return option;

}

function updateFontList(fonts) {

	const control = document.getElementById('fontNames');
	control.innerHTML = '';

	for (let current of fonts) {
		const encoded = encodeURI(current);

		createCssLinkTag(encoded);

		control.add(createFontOption(current));
	}

}

document.getElementById(ConfigurationModel.FontName).onkeyup = function (d) {

	// UP: 38,  DOWN: 40
	const keyCodeTab = 9;
	const keyCodeEnter = 13;

	if (d.keyCode === keyCodeEnter || d.keyCode === keyCodeTab) {
		log("Selecting the current font..");
		document.getElementById('fontsPanel').style.display = 'none';
		loadPreview();
		return;

	}

	// log(d.keyCode);
	if (
		d.keyCode !== 8 &&
		d.keyCode !== 32 &&
		d.keyCode !== 46 &&
		(
			d.keyCode < 65 ||
			d.keyCode > 90)
	)
		return;
	document.getElementById('fontsPanel').style.display = '';
	updateFontList(filterFontList(supportedFonts, this.value));

};

document.getElementById('fontNames').onchange = function () {

	document.getElementById('fontsPanel').style.display = 'none';
	document.getElementById('FontName').value = this.value;

	loadPreview();

};
*/
