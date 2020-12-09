# ma-swipe-left
Add a specific component for https://materializecss.com

## Quick start

## Example

	Download project and click on index.html
	
### Requirements

	HTML page need Jquery and materialize with the CSS

```html
	<script src="js/jquery.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Angular project

```sh   
	npm install ..\..\git\ma-swipe-left\dist-ts
```

	Add in angular.json

```json	
			"styles": [
              "src/styles.css",
              "node_modules/materialize-css/dist/css/materialize.css",
              "node_modules/ma-swipe-left/ma-swipe-left.css"
            ],
            "scripts": [
			  "node_modules/jquery/dist/jquery.min.js",
              "node_modules/materialize-css/dist/js/materialize.min.js"
		    ]
```       
	in component page Add 

```ts
	import { MA, SwipeLeftOption } from 'ma-swipe-left/ma-swipe-left';

	export class UserComponent implements OnInit {

		ngOnInit(): void {

			let conf: SwipeLeftOption = {
				rightWidth: 242, // width on the right side 
				// where component is opened
				//  Option: callbacks
				onOpen: function (elem) {
					console.log('onOpen elem', elem);
				},
				onClose: function (elem) {
					console.log('onClose elem', elem);
				},
				onChange: function (elem, state) {
					console.log('CHANGE elem', elem);
					console.log('CHANGE state', state);
				}
			}
			MA.SwipeLeft.init(conf);
		}
  	}
```

## JQuery Projet

### Add css/javascript for ma-style

	In the HTML page add reference to swipe-left.css file

```html
	<link href="css/swipe-left.css" rel="stylesheet">
	<script src="js/swipe-left.js"></script>
```

### Add javascript for initialization

	In the HTML page execute on starting
	 
```js
	// Execute following code for initialisation   
	$('.collection-swipe').collection_swipe({
		rightWidth : 240, // width on the right side 
						// where component is opened
		//  Option: callbacks
		onOpen : function(elem, state) {
			console.log('onOpen elem', elem);
		},
		onClose : function(elem, state) {
			console.log('onClose elem', elem);
		},
		onChange : function(elem, state) {
			console.log('CHANGE elem', elem);
			console.log('CHANGE state', state);
		}
	});
```

## Run project

	Launch commands:
	
### Installation des modules
```sh 
	npm install
```

### Build JS /dist
```sh 
	gulp build
```
# Start browser 
```sh 
	gulp
```