 var prompt = require('prompt');
var say = require('say');
var node = require('./node.js');
var edge = require('./edge.js');
var async = require('async');
var numeric = require('numeric');

var probabilityMatrix  = [[]];
var nodes = [];
nodes.push(node.createNode('a'));
nodes.push(node.createNode('b'));
nodes.push(node.createNode('c'));
nodes.push(node.createNode('d'));
nodes.push(node.createNode('e'));
nodes.push(node.createNode('f'));
nodes.push(node.createNode('g'));
nodes.push(node.createNode('h'));
nodes.push(node.createNode('i'));
nodes.push(node.createNode('j'));
nodes.push(node.createNode('k'));
nodes.push(node.createNode('l'));
nodes.push(node.createNode('m'));
nodes.push(node.createNode('n'));
nodes.push(node.createNode('o'));
nodes.push(node.createNode('p'));
nodes.push(node.createNode('q'));
nodes.push(node.createNode('r'));
nodes.push(node.createNode('s'));
nodes.push(node.createNode('t'));
nodes.push(node.createNode('u'));
nodes.push(node.createNode('v'));
nodes.push(node.createNode('w'));
nodes.push(node.createNode('x'));
nodes.push(node.createNode('y'));
nodes.push(node.createNode('z'));

var probabilityMatrix= [[]];
var state = [];
for(i =0; i < nodes.length; i ++){
	for(k =0; k < nodes.length; k++){
		nodes[k].probabilityMatrix = .5;

	probabilityMatrix.push([nodes[i],nodes[k]]);
	}
}
	probabilityMatrix.shift();
	




  prompt.start();

//console.log(probabilityMatrix);
  prompt.get(['username','numofetters'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  Give me the first letter of your name: ' + result.username + ' and the number of letter' +  result.numofetters);
   	state.push(result.username);
    for(k = 0; k <result.numofetters; k++){
		var max = 0;
	    var index = 0;
	    for(i =0; i < probabilityMatrix.length; i++){	

	    	var tmp =probabilityMatrix[i][0];
	    	//console.log(probabilityMatrix[i]);
	    	
	    	if(tmp.name === result.username){
	    		if(probabilityMatrix[i][1] > max){
	    			max = probabilityMatrix[i][1];
	    			index = i;
	    		}

	    		
	    	}
	    	
	    }
	    
	    //console.log(probabilityMatrix[index]);
	    state.push(probabilityMatrix[index][0].name);
	}

     console.log(state);






  });





