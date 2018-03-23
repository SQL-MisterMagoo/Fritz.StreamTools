using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Webfonts.v1;
using Google.Apis.Webfonts.v1.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Html;
using Microsoft.Extensions.Configuration;
using Fritz.StreamTools.Helpers;

namespace Fritz.StreamTools.TagHelpers
{
	[HtmlTargetElement("google-fonts")]
	public class GoogleFontListTagHelper : TagHelper
	{
		private static WebfontList googleFonts;
		public string RequestType { get; set; }
		public IConfiguration Config { get; }

		public GoogleFontListTagHelper(IConfiguration configuration)
		{
			Config = configuration;
		}

		public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
		{
			await base.ProcessAsync(context, output);
			await LoadGoogleFontsAsync();
			switch(RequestType)
			{
				case "links":
					GenerateLinks(ref output);
					break;
				case "select":
				default:
					GenerateSelect(ref output);
					break;
			}
		}

		private void GenerateSelect(ref TagHelperOutput output)
		{
			output.TagName = "select";
			foreach (var item in googleFonts.Items)
			{
				output.Content.AppendHtml(DisplayHelper.GenerateGoogleFontSelectOption(item));
			}
		}

		private void GenerateLinks(ref TagHelperOutput output)
		{
			output.TagName = "";
			foreach (var item in googleFonts.Items)
			{
				output.Content.AppendHtml(DisplayHelper.GenerateGoogleFontLink(item));
			}
		}

		public async Task LoadGoogleFontsAsync()
		{
			if (googleFonts != null) return;
			var fontApi = new WebfontsService().Webfonts.List();
			fontApi.Key = Config["GoogleFontsApi:Key"];
			if (string.IsNullOrWhiteSpace(fontApi.Key))
				return;
			googleFonts = await fontApi.ExecuteAsync();

		}

	}
}
