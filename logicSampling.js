var node = require('./node.js');
var edge = require('./edge.js');
var async = require('async');
var numeric = require('numeric');

/*

TODO : FIX EVEN AND ODS FUNCTION TO RETURN FOR PARENT LENGTHS > 2
*/

//Initial marginal probability nodes 
var Raining = node.createNode('Raining');
node.setProbabilityMatrix(Raining,
{
	'unconditional':{'true':[.2,0],'false':[.8,0]}}



);

var Sprinkler = node.createNode('Sprinkler');
node.setProbabilityMatrix(Sprinkler,
{
	'unconditional':{'true':[.1,0],'false':[.9,0]}}


);


var Holmes = node.createNode('Holmes');
node.setProbabilityMatrix(Holmes,
{

	'R=T & S=T':{'true':[.5,0],'false':[.5,1]},
	'R=F & S=T':{'true':[.9,0],'false':[.1,1]},
	'R=T & S=F':{'true':[.5,0],'false':[.5,0]},
	'R=F & S=F':{'true':[.5,1],'false':[.5,0]}



});

var Watson = node.createNode('Watson');
node.setProbabilityMatrix(Watson,
{

	'R=T':{'true':[.5,0],'false':[.5,0]},
	'R=F':{'true':[.2,0],'false':[.8,0]}



});


var nodes= [];
nodes.push(Raining);
nodes.push(Sprinkler);
nodes.push(Holmes);
nodes.push(Watson);



//Populate edges
var edge1 = edge.createEdge('Raining','Watson');
var edge2 = edge.createEdge('Raining','Holmes');
var edge3 = edge.createEdge('Sprinkler','Holmes');

var edges= [];
edges.push(edge1);
edges.push(edge2);
edges.push(edge3);


var counte = 0;

var choicePathMatrix = [];
   

for(trials = 0; trials<1000000; trials++){
	var choicePath = {};
	for (i =0 ; i < nodes.length; i++){
		if(nodes[i].probabilityMatrix.unconditional){
			//console.log(nodes[i].probabilityMatrix.unconditional.true[0]);
			if(Math.random() > nodes[i].probabilityMatrix.unconditional.true[0]){
				choicePath[nodes[i].name] = false;
				for(j =0; j < edges.length; j ++){
					if(edges[j].from === nodes[i].name){
						var tmpName= edges[j].to;
						for(k = 0; k < nodes.length; k++){
							
							//need tp find the children witht eh right values
							

							if(nodes[k].name === tmpName){	
								//console.log(nodes[k].probabilityMatrix);

								for(key in nodes[k].probabilityMatrix){
									var findString  = nodes[i].name[0]+'=F';
								
									if(key.indexOf(findString) > -1){
										//	console.log(findString+ " - " + key);
										//console.log(nodes[k].probabilityMatrix[key]);
										if(Math.random() > nodes[k].probabilityMatrix[key].true[0]){
											
											choicePath[nodes[k].name] = false;
										}
										else{
											choicePath[nodes[k].name] = true;
										}
									}
								}
								
						}

					}
				}

			}
		}
			else{
				choicePath[nodes[i].name] = true;
			}
		}
	}
	//console.log(choicePath);
	choicePathMatrix.push(choicePath);
}


//console.log(choicePathMatrix.length);
//Lets say we want to find if it was raining given that holmes saw his lawn wet
var success= 0;
var total = 0;
for(i=0;i < choicePathMatrix.length; i++){
	//console.log('hello');
	//for(key in choicePathMatrix[i]){
	
		if(choicePathMatrix[i]['Raining'] === true && choicePathMatrix[i]['Holmes'] === true){
			console.log('WE GOT ONE');
			success+=1;

		}
		total +=1;
//	}
}

console.log(success/total);




