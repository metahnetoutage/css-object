class CSSStyling {	
	constructor(chowsenStyle) {
		if ((typeof chowsenStyle == "string" && chowsenStyle != "") ||
			(typeof chowsenStyle == "object" && chowsenStyle != null) ||
			chowsenStyle != undefined) {
			this.providedStyle = chowsenStyle.replaceAll("\t","  ").replaceAll("  "," ").trim();
		}
	}

	parseStyle() {
		this.listOfStyles = [];
		if (typeof this.providedStyle == "string" && this.providedStyle != "") {
			let i = 0;
			let style = {};
			while(this.providedStyle.length > 0){
				let startIndex = this.providedStyle.indexOf('{');
				let selectorPart = this.providedStyle.slice(0, startIndex).trim();
				let endIndex = this.providedStyle.indexOf('}');
				let styleBody = this.providedStyle.slice(startIndex + 1, endIndex - 1);
				let stylePrefs = styleBody.split(';');
				
				let selector_s = [];
				let selector_sList = selectorPart.split(',');
				for(let selectorS in selector_sList){
						selector_s.push(selector_sList[selectorS].trim());
				}
				for(let stylePref in stylePrefs){
					if(stylePrefs[stylePref] != " "){
						let prop_Val = stylePrefs[stylePref].split(':');
						prop_Val[0] = prop_Val[0].trim();
						if(prop_Val.length == 2){
							prop_Val[1] = prop_Val[1].trim();
							let prop_s = prop_Val[1].split(',');
							if(prop_s.length == 1){
								style[prop_Val[0]] = prop_s[0].trim();
							}
							else if(prop_s.length > 1){
								for(let prop = 0; prop < prop_s.length; prop++){
									prop_s[prop] = prop_s[prop].trim();
								}
								style[prop_Val[0]] = prop_s;
							}
						}
						else if(prop_Val.length == 1 && prop_Val[0] != "") {
							style['o'] = prop_Val[0];
						}
					}
				}
				this.listOfStyles.push({ selector: selector_s, selector_style:style });
				this.providedStyle = this.providedStyle.slice(endIndex + 1, this.providedStyle.length);
				i++;
			}
		}
		return this.listOfStyles;
	}

	toString(){
		let final = "";
		let r = this.listOfStyles;
		for(let i = 0; i < r.length; i++){
			if(r[i].selector.length == 1){
				final += r[i].selector[0];
			}
			else if(r[i].selector.length > 1){
				final += r[i].selector.join(', ');
			}
			final += '{';
			for(let s in r[i].selector_style){
				let style_s = r[i].selector_style[s];
				if(typeof style_s == "string"){
					final += `\n\t${ s }:${ r[i].selector_style[s] };\n\t`;
				}
				else if(Array.isArray(style_s)){
					final += `\n\t${ s }:${ r[i].selector_style[s].join(', ') };\n\t`;
				}
			}
			final += '}\n\t';
		}
		return final;
	}
}

//Testing selector parsing

let testCSS = new CSSStyling(`body {
	background: #f3f3f3;
	color: #252525;
	line-height: 1.5;
	font-family: Georgia, serif;
	padding: 2rem;
	}

	h1,
	h2,
	h3 {
	font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue,
		helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
	line-height: 1.1;
	font-weight: 900;
	}`);
	
testCSS.parseStyle();
console.log(testCSS.toString());

/*
  Output:
  "body{ background:#f3f3f3; color:#252525; line-height:1.1; font-family:-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif; padding:2rem; font-weight:900; } h1, h2, h3{ background:#f3f3f3; color:#252525; line-height:1.1; font-family:-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif; padding:2rem; font-weight:900; } "
*/