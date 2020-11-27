# ma-swipe-left
Add a specific component for https://materializecss.com

## Quick start

## Example

	Download project and click on index.html
	
### requirements

	HTML page need Jquery and materialize with the CSS

	<script src="js/jquery.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

### Add css/javascript for ma-style

	In the HTML page add reference to swipe-left.css file

	<link href="css/swipe-left.css" rel="stylesheet">
	<script src="js/swipe-left.js"></script>

### Add javascript for initialization

	In the HTML page execute on starting
	 
~~~
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
~~~

## Run project

	Launch commands:
	
### Installation des modules
	npm install

### Build complete /dist
	gulp build

# Start browser 
	gulp