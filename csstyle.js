class CSSStyling {	
	constructor(chowsenStyle) {
		if ((typeof chowsenStyle == "string" && chowsenStyle != "") ||
			(typeof chowsenStyle == "object" && chowsenStyle != null) ||
			chowsenStyle != undefined) {
			this.providedStyle = chowsenStyle;
		}
	}
	parseStyle() {
		this.listOfStyles = [];
		if (typeof this.providedStyle == "string" && this.providedStyle != "") {
			//Use an object using template below to save in the list Of Styles above
			//each selector is a key, corresponds to value which directly uses selector_style index, which stores objects
			//each such object has key for property, and value, this way, making changes to the Style object is easy
			//It is then possible to easily update <style></style> element anywhere
			//this.styleObject = { selector_s: {}, selector_style: [] };
			//Parsing style, using  { as start parsing token and } as the end parsing token
			let i = 0;
			while(this.providedStyle.length > 0){
				let startIndex = this.providedStyle.indexOf('{');
				let selectorPart = this.providedStyle.slice(0, startIndex).trim();
				let endIndex = this.providedStyle.indexOf('}');
				let styleBody = this.providedStyle.slice(startIndex + 1, endIndex - 1);
				let stylePrefs = styleBody.split(';');
				let style = [];
				let selector_s = { text_s:[], index: 0 };
				let selector_sList = selectorPart.split(',');
				
				for(let selectorS in selector_sList){
						selector_s.text_s.push(selector_sList[selectorS].trim());
				}
				selector_s.index = i;
				for(let stylePref in stylePrefs){
					let prop_Val = stylePrefs[stylePref].split(':');
					style.push({ prop:prop_Val[0], value:prop_Val[1] });
				}
				let selectors_per_style = { styleSelectors: selector_s, selector_style: [] };
				selectors_per_style.selector_style.push(style);
				this.listOfStyles.push(selectors_per_style);
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