import { CSSStyling } from './csstyle.js';

/*
    Testing or unit testing can happen below
*/

let styling = new CSSStyling(`#content_settings {
                                position: absolute;
                                width:458px;
                                height:400px;
                                margin: 8px 8px auto calc(5% - 8px);
                                border-width: 1px;
                                border-color: black;
                                border-style: solid;
                                border-radius:5px;
                            }

                            #close {
                                width:15px;
                                height:15px;
                                margin: 2px 50% 2px calc(50% + 1.5px);
                                border-width: 1px;
                                border-color: black;
                                background-color:rgb(41, 39, 39);
                                color: lightgrey;
                                border-style: solid;
                                border-radius: 100px;
                                cursor: default;
                                display:block;
                            }

                            #close:hover {
                                background-color: lightgrey;
                                color: rgb(41, 39, 39);
                            }

                            #close div {
                                width:7.5px;
                                height:12px;
                                line-height:12px;
                                margin: 1px auto auto 22%;
                                font-family: monospace;
                                font-weight: bolder;
                                font-size: 12px;
                                font-style: italic;
                            }

                            #styling {
                                position: absolute;
                                border-width: 1px;
                                border-color: rgb(44, 194, 56);
                                border-style: solid;
                                width:438px;
                                height: 359px;
                                border-radius: 5px;
                                margin: 12.5px 9px auto 9px; 
                            }

                            #styling_components {
                                position: absolute;
                                border-width: 1px;
                                border-color: rgb(196, 55, 55);
                                border-style: solid;
                                border-radius:5px;
                                width:224px;
                                height:354px;
                                margin: 2px auto auto 4px;
                                display:inline-block;
                            }

                            #title_1 {
                                position: relative;
                                border-radius:5px;
                                width:218px;
                                height:20px;
                                margin: 5px auto auto 3px;
                                background:rgb(58, 53, 53);
                                display:block;
                            }

                            #title_1 div {
                                text-align: center;
                                background-color: rgba(255,255,255,0.7);
                                height:20px;
                                border-style: none;
                            }

                            #styles {
                                position: relative;
                                border-width: 1px;
                                border-color: orange;
                                border-style: solid;
                                border-radius: 5px;
                                height: 321px;
                                width: 217px;
                                margin:4px 2px auto 2px;
                            }

                            #extras {
                                position: absolute;
                                border-width: 1px;
                                border-color: rgb(196, 55, 55);
                                border-style: solid;
                                border-radius:5px;
                                width:198px;
                                height:354px;
                                margin: 2px 4px auto 233px;
                                display:inline-block;
                            }

                            #title_2 {
                                position: relative;
                                border-radius:5px;
                                width:192px;
                                height:20px;
                                margin: 5px auto auto 3px;
                                background:rgb(58, 53, 53);
                                display:block;
                            }

                            #title_2 div {
                                text-align: center;
                                background-color: rgba(255,255,255,0.7);
                                height:20px;
                                border-style: none;
                            }

                            #units {
                                position: relative;
                                border-width: 1px;
                                border-color: orange;
                                border-style: solid;
                                border-radius: 5px;
                                height: 321px;
                                width: 191px;
                                margin:4px 2px auto 2px;
                            }

                            .options {
                                position: relative;
                                border-radius: 5px;
                                height:321px;
                                width:200px;
                                background-color: rgb(77, 75, 75);
                                display:inline-block;
                            }

                            .miniDataDiv_ {
                                position: absolute;
                                width:198px;
                                height:321px;
                                border-color:transparent;
                                border-width:1px;
                                border-style:solid;
                                border-radius:5px;
                            }

                            .miniDataDiv_2, h3 {
                                position: absolute;
                                width:172px;
                                height:319px;
                                border-color:transparent;
                                border-width:1px;
                                border-style:solid;
                                border-radius:5px;
                            }

                            .options2 {
                                position: relative;
                                border-radius: 5px;
                                height:321px;
                                width:174px;
                                background-color: rgb(77, 75, 75);
                                display:inline-block;
                            }`);


console.log(styling.toString());

console.log('\n---------------------------------------------------\n');

console.log('show style');
console.log(styling.showStyle('.miniDataDiv_2, h3')); //works well

console.log('updated .options2\n');
styling.updateSelector('.options2', JSON.stringify({
                                    'position': 'relative',
                                    'border-radius': '6px',
                                    'height':'321px',
                                    'width':'174px',
                                    'background-color': 'rgb(77, 75, 75)',
                                    'display':'inline-block'
                                    }));
console.log(styling.toString());

console.log('\n---------------------------------------------------\n');

console.log('updated h3\n');
styling.updatePartOfSelector('h3',JSON.stringify({
                                    'position': 'absolute',
                                    'width':'172px',
                                    'height':'319px',
                                    'border-color':'transparent',
                                    'border-width':'1px',
                                    'border-style':'solid',
                                    'border-radius':'6px'
                                    }));

console.log(styling.toString());

console.log('\n---------------------------------------------------\n');

console.log('updated h3\n');
styling.updateSelectorRule('h3',JSON.stringify({
                                    'width':'200px'
                                    }));

console.log(styling.toString());

styling.removeSelectorRule('h3', 'width');

console.log(styling.toString());

styling.addSelectorRule('h3', JSON.stringify({
    'width':'200px'
}));

console.log(styling.toString());

styling.removeSelectorObject('h3');

console.log(styling.toString());

styling.addSelectorObject('h3', JSON.stringify({
    'position':'absolute',	
    'height':'319px',	
    'border-color':'transparent',	
    'border-width':'1px',	
    'border-style':'solid',	
    'border-radius':'6px',	
    'width':'200px'
}));

console.log(styling.toString());