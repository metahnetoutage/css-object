/**
 * Provides a dynamic way to style any DOM element and show difference of styles if one exists
 * 
 * * @author Dmitri Dimov brought by CreativeOutage.com
 */
class CSSStyling {	
	constructor(chowsenStyle) {
		//finalStyles is the end point for storing dynamic styles that will be saved
		this.finalStyles = this.parseStyle(chowsenStyle);
	}

	/**
	 * Parses CSS string into a list of objects that can be dynamically edited
	 * @param {*} chowsenStyle is a string containing css data to be parsed 
	*/
	parseStyle(chowsenStyle) {
		if ((typeof chowsenStyle == "string" && chowsenStyle != "") ||
			(typeof chowsenStyle == "object" && chowsenStyle != null) ||
			chowsenStyle != undefined) {
			
			this.listOfStyles = [];
			this.providedStyle = chowsenStyle.replaceAll("\t","  ").replaceAll("  "," ").trim();
			
			if (typeof this.providedStyle == "string" && this.providedStyle != "" && this.listOfStyles != undefined) {
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
								if(prop_Val[1].slice(0,3).toLowerCase() != "rgb"){
									prop_s = prop_Val[1].split(',');
									for(let prop = 0; prop < prop_s.length; prop++){
										prop_s[prop] = prop_s[prop].trim();
										style[prop_Val[0]] = prop_s;
									}
								}
								else {
									prop_s = prop_Val[1];
									style[prop_Val[0]] = [ prop_s ];
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
		}
		return this.listOfStyles;
	}

	/**
	 * 
	 * @param {*} obj is a JSON string that is converted to regular string
	 * @returns string that parseStyle can understand
	 */
	JSONtoString(obj){
		let objToProps = obj.slice(1,-1);
		let start = 0;
		let result = "";
		for(let i = 0; i < objToProps.length; i++){
		 	if(objToProps[i] == ',' && (i - 1 > 0 && (objToProps[i - 1] == '%' || objToProps[i - 1] >= '0' && objToProps[i - 1] <= '9'))||
			   (objToProps[i] >= '0' && objToProps[i] <= '9' && (i - 1 > 0 && objToProps[i - 1] == ','))){
			}
			else if(objToProps[i] == ',' || i == objToProps.length - 1){
				if(start == 0){
					result += `\t${ objToProps.slice(start, i).replaceAll("\"","") };`;
				}
				else {
					result += `\n\t${ objToProps.slice(start + 1, i).replaceAll("\"","") };`;
				}
				start = i;
			}
		}
		return `{\n${ result }\n}`;
	}

	/**
	 * 
	 * @param {*} name is the name of selector or group of selectors that must display json object 
	 * @returns JSON object corresponding to name
	 */
	showStyle(name){
		if(typeof name === "string" && this.finalStyles != undefined){
			for(let i in this.finalStyles){
				if(name == this.finalStyles[i].selector.join(', ')){
					return this.finalStyles[i];
				}
			}
		}
		return;
	}

	
	/**
	 * 
	 * @param {*} obj1 JSON style object to change 
	 * @param {*} obj2 JSON style object to change to
	 * @returns JSON object which specifies if difference has been made
	 */
	displayDifference(obj1, obj2){
		let showDifference = "\n\t";
		if(typeof obj1 != "undefined" && typeof obj2 != "undefined" && obj1 != undefined && obj2 != undefined && obj1 != null && obj2 != null){
			if(Object.keys(obj1).length >= Object.keys(obj2[0].selector_style).length){
				let showDifference = "\n\t";
				for(let i in obj1){
					for(let j in obj2[0].selector_style){
						if(i == j){
							if(obj1[i].length == obj2[0].selector_style[j].length){
								if(obj1[i].length == 1){
									if(obj1[i][0] != obj2[0].selector_style[j][0]){
										showDifference += `${ i }:${ obj1[i] } -> ${ j }:${ obj2[0].selector_style[j] }\n\t`;
									}
								}
								else if(obj1[i].length > 1){
									for(let k in obj2[0].selector_style[j]){
										if(obj1[i][k] != obj2[0].selector_style[j][k])
										{
											showDifference += `${ i }:${ obj1[i][k] } -> ${ j }:${ obj2[0].selector_style[j][k] }\n\t`;
										}
									}
								}
							}
							else if(obj1[i].length < obj2[0].selector_style[j].length ||
									obj1[i].length > obj2[0].selector_style[j].length){
										showDifference += `${ i }:${ obj1[i][k] } -> ${ j }:${ obj2[0].selector_style[j][k] }\n\t`;
							}
						}
					}
				}
				return { isDiff: (showDifference == "\n\t")?false:true, styleDiff:showDifference };
			}
			else if(Object.keys(obj1).length < Object.keys(obj2[0].selector_style).length){
				let showDifference = "\n\t";
				for(let i in obj2[0].selector_style){
					for(let j in obj1){
						if(i == j){
							if(obj2[i].length == obj1[0].selector_style[j].length){
								if(obj2[i].length == 1){
									if(obj2[i][0] != obj1[0].selector_style[j][0]){
										showDifference += `${ i }:${ obj2[i] } -> ${ j }:${ obj1[0].selector_style[j] }\n\t`;
									}
								}
								else if(obj2[i].length > 1){
									for(let k in obj1[0].selector_style[j]){
										if(obj2[i][k] != obj1[0].selector_style[j][k])
										{
											showDifference += `${ i }:${ obj2[i][k] } -> ${ j }:${ obj1[0].selector_style[j][k] }\n\t`;
										}
									}
								}
							}
							else if(obj2[i].length < obj1[0].selector_style[j].length ||
									obj2[i].length > obj1[0].selector_style[j].length){
										showDifference += `${ i }:${ obj2[i][k] } -> ${ j }:${ obj1[0].selector_style[j][k] }\n\t`;
							}
						}
					}
				}
				return { isDiff: (showDifference == "\n\t")?false:true, styleDiff:showDifference };
			}
		}
		return { isDiff: false, styleDiff:"nothing done!" };
	}

	/**
	 * 
	 * @param {*} name name of selector or group of selectors 
	 * @param {*} obj json object to update to given selector name
	 * @param {*} showMessage console log shows success message, default is true, may be set to false
	 * @param {*} showDiff console log shows difference and is set to true by default, may be set to false
	 * @returns nothing
	 */
	 updateSelector(name, obj, showMessage = true, showDiff = true){
		if(typeof name === "string" && obj != null && typeof obj == "string" && this.finalStyles != undefined){
			let message = "";
			let objReceived = this.parseStyle(`${ name } ${ this.JSONtoString(obj) }`);
			
			for(let i = 0; i < this.finalStyles.length; i++){
				let foundSelector = this.finalStyles[i].selector.join(', ');
				if(name == foundSelector){
					if(typeof showDiff == "boolean" && showDiff == true){
						console.log(this.displayDifference(this.finalStyles[i].selector_style, objReceived).styleDiff);
					}
					this.finalStyles.splice(i, 1, { selector: [ name ], selector_style:objReceived[0].selector_style });
					message = `\nSuccessfully applied Styling to ${ foundSelector }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed applying Styling, ${ name } could not be found!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * 
	 * @param {*} name Name of css selector to update 
	 * @param {*} obj JSON style object to update JSON object under name
	 * @param {*} showMessage console log message for successful update
	 * @param {*} showDiff console log message showing difference before update was made 
	 * @returns no value is returned
	 */
	updatePartOfSelector(name, obj, showMessage = true, showDiff = true){
		if(typeof name === "string" && obj != null && typeof obj == "string" && this.finalStyles != undefined){
			let message = "";
			let objReceived = this.parseStyle(`${ name } ${ this.JSONtoString(obj) }`);
			
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector.includes(name) && selector.length > 1){
					if(typeof showDiff == "boolean" && showDiff == true){
						console.log(this.displayDifference(this.finalStyles[i].selector_style, objReceived).styleDiff);
					}
					this.finalStyles[i].selector.splice(this.finalStyles[i].selector.indexOf(name), 1);
					this.finalStyles.splice(i, 0, { selector: [ name ], selector_style:objReceived[0].selector_style });
					message = `\nSuccessfully added ${ name } by applied Styling to ${ selector }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed applying Styling, ${ name } could not be found!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * 
	 * @param {*} name name of selector or part of it
	 * @param {*} obj string representing property to change
	 * @param {*} showMessage optionally lets hide the message, defaults to showing success message
	 * @returns nothing is returned
	 */
	updateSelectorRule(name, obj, showMessage = true){
		if(typeof name === "string" && obj != null && typeof obj == "string" && this.finalStyles != undefined){
			let message = "";
			let objReceived = this.JSONtoString(obj).slice(1,-1).split(';');
			for(let i = 0; i < objReceived.length; i++){
				if(objReceived[i] == '\n' || objReceived[i] == '\t' || objReceived[i] == '\r' || objReceived[i] == ''){
					objReceived.splice(i,1);
					i--;
				}
			}
			if(objReceived.length == 1){
				objReceived[0] = objReceived[0].replaceAll('\n','').replaceAll('\t','').replaceAll('\r','');
				objReceived = objReceived[0].split(':');
			}
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector.includes(name) || selector == name){		
					this.finalStyles[i].selector_style[objReceived[0]] = objReceived[1];
					message = `\nSuccessfully updated property ${ objReceived[0] } for ${ name }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed applying property ${ objReceived[0] } for ${ name }!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * 
	 * @param {*} name name of selector or part of it
	 * @param {*} propName string representing property to remove
	 * @param {*} showMessage optionally lets hide the message, defaults to showing success message
	 * @returns nothing is returned
	 */
	 removeSelectorRule(name, propName, showMessage = true){
		if(typeof name === "string" && propName != null && typeof propName == "string" && this.finalStyles != undefined){
			let message = "";
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector.includes(name) || selector == name){
					if(this.finalStyles[i].selector_style[propName] != undefined){		
						delete this.finalStyles[i].selector_style[propName];
					}
					message = `\nSuccessfully removed property ${ propName } from ${ name }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed to remove property ${ propName } from ${ name }!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * 
	 * @param {*} name name of selector or part of it
	 * @param {*} obj string representing property to add
	 * @param {*} showMessage optionally lets hide the message, defaults to showing success message
	 * @returns nothing is returned
	 */
	 addSelectorRule(name, obj, showMessage = true){
		if(typeof name === "string" && obj != null && typeof obj == "string" && this.finalStyles != undefined){
			let message = "";
			let objReceived = this.JSONtoString(obj).slice(1,-1).split(';');
			for(let i = 0; i < objReceived.length; i++){
				if(objReceived[i] == '\n' || objReceived[i] == '\t' || objReceived[i] == '\r' || objReceived[i] == ''){
					objReceived.splice(i,1);
					i--;
				}
			}
			if(objReceived.length == 1){
				objReceived[0] = objReceived[0].replaceAll('\n','').replaceAll('\t','').replaceAll('\r','');
				objReceived = objReceived[0].split(':');
			}
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector.includes(name) || selector == name){
					if(this.finalStyles[i].selector_style[objReceived[0]] == undefined){		
						this.finalStyles[i].selector_style[objReceived[0]] = objReceived[1];
					}
					message = `\nSuccessfully property property ${ objReceived[0] } for ${ name }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed to add property ${ objReceived[0] } for ${ name }!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * @param {*} name name of selector object to add
	 * @param {*} obj string representing selector data to add
	 * @param {*} showMessage optionally lets hide the message, defaults to showing success message
	 * @returns nothing is returned
	 */
	 addSelectorObject(name, obj, showMessage = true){
		if(typeof name === "string" && obj != null && typeof obj == "string" && this.finalStyles != undefined){
			let message = "";
			let objReceived = this.parseStyle(`${ name } ${ this.JSONtoString(obj) }`);
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector.includes(name) || selector == name){
					message = `\nFailed to add selector object ${ name }!\n`;
					return;
				}
			}
			this.finalStyles.push(objReceived[0]);
			message = `\nSuccessfully added selector object ${ name }\n`;
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
	 * 
	 * @param {*} name name of selector object to remove
	 * @param {*} showMessage optionally lets hide the message, defaults to showing success message
	 * @returns nothing is returned
	 */
	 removeSelectorObject(name, showMessage = true){
		if(typeof name === "string" && this.finalStyles != undefined){
			let message = "";
			for(let i = 0; i < this.finalStyles.length; i++){
				let selector = this.finalStyles[i].selector.join(', ');
				if(selector == name){		
					this.finalStyles.splice(i,1);
					message = `\nSuccessfully removed selector style for ${ name }\n`;
				}
			}
			if(message == ""){
				message = `\nFailed removing selector object ${ name }!\n`;
			}
			if(typeof showMessage == "boolean" && showMessage == true){
				console.log(message);
			}
		}
		return;
	}

	/**
		Prints a professional string of CSS
		This method takes no parameters and returns a string for entire css file.
		@param {*} finalStyles is the parameter that determines smooth work.
		@returns No value returned if finalStyles is undefined
	*/
	toString(){
		let final = "\t";
		if(this.finalStyles != undefined){
			let r = this.finalStyles;
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
							final += `\n\t\t${ s }:${ r[i].selector_style[s] };\t`;
						}
						else if(s == "o"){
							final += `\n\t\t${ r[i].selector_style[s] };\t`;
						}
					}
					else if(Array.isArray(style_s)){
						final += `\n\t\t${ s }:${ r[i].selector_style[s].join(', ') };\t`;
					}
				}
				final += '\n\t}\n\t\n\t';
			}
			return final;
		}
		return;
	}
}

export { CSSStyling };