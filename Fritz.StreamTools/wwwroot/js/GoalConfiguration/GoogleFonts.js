
$("#googleFontsList").keyup(function (e) {
	// If the user presses enter on the font list, hide it.

	if (e.keyCode === 13) {
		$("#googleFontsList").hide();
	}
}).change(function () {
	// When the selection changes, set the fontName and preview the goal

	$("#" + ConfigurationModel.FontName).val($("#googleFontsList").val());
	loadPreview();
});

$("#FontName").keyup(function (e) {
	// When the user types backspace/delete or a printable character, show the list

	if (e.keyCode === 8 || e.keyCode === 46 || (e.keyCode >= 32 && e.keyCode <= 126)) {
		$("#googleFontsList").show().width($("#" + ConfigurationModel.FontName).width());
	} else if (e.keyCode !== 13)
	{
		return;
	}

	// Handle the user pressing up/down enter in the fontname field.
	switch (e.keyCode) {
		case 40: //down key
			// find the index of the next active option and set it as selected

			var index = $("#googleFontsList > option").slice($("#googleFontsList")[0].selectedIndex + 1).not("[disabled]").first().index();
			$("#googleFontsList")[0].selectedIndex = index;

			return;
			break;

		case 38: //up key
			// find the index of the previous active option and set it as selected

			var index = $("#googleFontsList > option").slice(0, $("#googleFontsList")[0].selectedIndex - 1).not("[disabled]").last().index();
			$("#googleFontsList")[0].selectedIndex = index;

			return;
			break;
		case 13: //enter key
			// load the selected font name and preview
			if ($("#googleFontsList").val() != "") {
				$("#" + ConfigurationModel.FontName).val($("#googleFontsList").val());
				$("#googleFontsList").hide();
				loadPreview();
			}
			return;
		default:
	}

	// filter the available options by disabling them all, then enable the ones that match the typed value

	$("#googleFontsList > option").css("display","none").prop("disabled", true);
	$("#googleFontsList > option[value*='" + $("#FontName").val() + "' i]").css("display","block").prop("disabled", false);
});

// hide the font list when focus moves elsewhere
$("input").focusin(function (e) {
	switch (e.target.id) {
		case ConfigurationModel.FontName:
			break;
		case "googleFontsList":
			break;
		default:
			$("#googleFontsList").hide();
	}
});
