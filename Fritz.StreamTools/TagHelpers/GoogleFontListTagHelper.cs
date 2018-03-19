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

namespace Fritz.StreamTools.TagHelpers
{
	[HtmlTargetElement("google-select")]
	public class GoogleFontListTagHelper : TagHelper
	{
		private static WebfontList googleFonts;

		public IConfiguration Config { get; }
		public string Id { get; set; }
		public string Size { get; set; }

		public GoogleFontListTagHelper(IConfiguration configuration)
		{
			Config = configuration;
		}
		public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
		{
			await base.ProcessAsync(context, output);
			await LoadGoogleFontsAsync();
			output.TagName = "select";
			output.Attributes.Add("id", Id ?? "googleFontsList");
			output.Attributes.Add("size", Size ?? "1");
			var copy = new TagBuilder("select");
			copy.Attributes.Add("id", $"{output.Attributes["id"].Value}_copy");
			copy.Attributes.Add("style", "display:none");
			foreach (var item in GoogleFontsSelectList(googleFonts))
			{
				output.Content.AppendHtml(item);
				copy.InnerHtml.AppendHtml(item);
			}
			output.PostElement.AppendHtml(copy);
		}

		public IEnumerable<IHtmlContent> GoogleFontsSelectList(WebfontList fonts)
		{
			if (fonts == null) yield break;

			foreach (var item in fonts.Items)
			{
				var tb = new TagBuilder("option");
				tb.MergeAttribute("value", item.Family);
				tb.InnerHtml.Append(item.Family);
				yield return tb;
			}			
		}

		public async Task LoadGoogleFontsAsync()
		{
			if (googleFonts != null) return;
			var fontApi = new WebfontsService().Webfonts.List();
			fontApi.Key = Config["GoogleFontsApi:Key"];
			googleFonts = await fontApi.ExecuteAsync();

		}

	}
}
