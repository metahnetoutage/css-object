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
							style[prop_Val[0]] = prop_Val[1];
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
}

//Testing selector parsing

let testCSS = new CSSStyling(`@mixin transform($property) {
																							-webkit-transform: $property;
																							-ms-transform: $property;
																							transform: $property;
																						}
																						.box {
																							@include transform(rotate(30deg));
																						}`);
console.log(testCSS.parseStyle());