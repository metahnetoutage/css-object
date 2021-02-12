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
			while(this.providedStyle.length > 0){
				let style = {};
				let startIndex = this.providedStyle.indexOf('{');
				let selectorPart = this.providedStyle.slice(0, startIndex).trim();
				let endIndex = this.providedStyle.indexOf('}');
				let styleBody = this.providedStyle.slice(startIndex + 1, endIndex - 1).trim();
				let stylePrefs = styleBody.split(';');
				let selector_sList = selectorPart.split(',');
				let selector_s = [];
				for(let selectorS in selector_sList){
					selector_s.push(selector_sList[selectorS].trim());
				}
				for(let stylePref = 0; stylePref < stylePrefs.length; stylePref++){
					stylePrefs[stylePref] = stylePrefs[stylePref].trim();
					if(stylePrefs[stylePref] != ""){
						let prop_Val = stylePrefs[stylePref].split(':');
						let prop_s = "";
						prop_Val[0] = prop_Val[0].trim();
						if(prop_Val.length == 2){
							prop_Val[1] = prop_Val[1].trim();
							prop_s = prop_Val[1].split(',');
							for(let prop = 0; prop < prop_s.length; prop++){
								prop_s[prop] = prop_s[prop].trim();
								style[prop_Val[0]] = prop_s;
							}
						}
						else if(prop_Val.length == 1) {
							style['o'] = prop_Val[0];
						}
					}
				}
				this.listOfStyles.push({ selector: selector_s, selector_style:style });
				this.providedStyle = this.providedStyle.slice(endIndex + 1, this.providedStyle.length);
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
				if(typeof style_s == "string" && s != "o"){
					if(s != "o"){
						final += `\n\t${ s }:${ r[i].selector_style[s] };\n\t`;
					}
					else if(s == "o"){
						final += `\n\t${ r[i].selector_style[s] };\n\t`;
					}
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