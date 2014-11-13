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
	'unconditional':{'true':.2,'false':.8}}



);

var Sprinkler = node.createNode('Sprinkler');
node.setProbabilityMatrix(Sprinkler,
{
	'unconditional':{'true':.1,'false':.9}}


);


var Holmes = node.createNode('Holmes');
node.setProbabilityMatrix(Holmes,
{

	'R=Y & S=Y':{'true':1,'false':0},
	'R=N & S=Y':{'true':.9,'false':.1},
	'R=Y & S=N':{'true':1,'false':0},
	'R=N & S=N':{'true':0,'false':1}



});

var Watson = node.createNode('Watson');
node.setProbabilityMatrix(Watson,
{

	'R=T':{'true':1,'false':0},
	'R=F':{'true':.2,'false':.8}



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



var beliefMatrix = {};
repeater(0);


//Calculate initial belief matrix
function constructProbabilityMatrix(node,callback){

	var nodeName = node.name;
	
	
	
	var nodeJson = {};
	//if we are starting at an nconditional node 
	if(node.probabilityMatrix.unconditional){
		//beliefMatrix[nodeName] = {belief_x:[nodes[i].probabilityMatrix.unconditional.true,nodes[i].probabilityMatrix.unconditional.false],pie_x:[nodes[i].probabilityMatrix.unconditional.true,nodes[i].probabilityMatrix.unconditional.false],lambda_x:[1,1]};
	}

	else{
		//console.log('calling pie x on' + node.name);
			pie_x(node);
		//beliefMatrix[nodeName] = {belief_x:null,pie_x:null,lambda_x:[1,1]};


	
	}
	

	callback();
		
}

function repeater(i) {

  if( i < nodes.length ) {
  	//console.log(i + ',' + nodes.length);
     constructProbabilityMatrix( nodes[i],function(){
       repeater( i + 1 )
     })
  }
}




function lambda_x(node){
	for(i = 0; i < edges.length; i++){
		if(node.name === edges[i].from){
			beliefMatrix[node.name] *= beliefMatrix[edges[i].from];
		}
	}
}

function pie_x(node){
	
	
		var prob = node.probabilityMatrix; 


			var parents = [];

			for(i = 0; i <edges.length; i++){
				if(edges[i].to === node.name){
					var nodeOfFromNode = edges[i].from;
					for(j = 0; j<nodes.length; j++){
						if(nodes[j].name ===nodeOfFromNode){
							parents.push(nodes[j]);
						}
					}
				}
			}
				
			
			
					
			

					var parentConditionalVector = [];
					for (i = 0; i < parents.length; i++){
						for (key in parents[i].probabilityMatrix.unconditional){
							parentConditionalVector.push(parents[i].probabilityMatrix.unconditional[key]);
						}
					}

					var childConditionalVector = [];
					for (key in node.probabilityMatrix){
						for(condition in node.probabilityMatrix[key]){
							childConditionalVector.push(node.probabilityMatrix[key][condition]);
						}

					}
					
					var updatedPi = customDotProduct(childConditionalVector,parentConditionalVector,parents.length,node);
					


				



				
	


			
			
		
	


}



updatePriors();
console.log();
console.log();
console.log('--Original Probability Matrix --');

console.log();
console.log(beliefMatrix);
console.log('----');
console.log();
console.log();



console.log();
console.log();
console.log();
console.log();
console.log('------Supose one morning when Homes leaves his house, he realises that his grass is wet-----');

beliefMatrix.Holmes.lambda_x = [1,0];
beliefMatrix.Holmes.pie_x = [0.272, 0.728];
beliefMatrix.Holmes.belief_x = [1,0];

console.log();
console.log(beliefMatrix);
console.log('----');
console.log();
console.log();
updateLambda(nodes[2]);

//To calculate the update of \lambda a node N

function updateLambda(node){
	var nodeName = node.name;
	var nodeBeliefMatrix =beliefMatrix[nodeName];
	var updatedLambdaVector = nodeBeliefMatrix.lambda_x;
	
	var parents = [];
	for(i = 0; i < edges.length; i++){
		var possibleNodeName= edges[i].from;
		for(j = 0; j<nodes.length; j++){
			if(nodes[j].name ===possibleNodeName){
				parents.push(nodes[j]);
			}
		}

	}
	parents.shift();
	var parentsLength = parents.length;


	var priorVector = [];
	for (var key in node.probabilityMatrix) {
		for (var secondKey in node.probabilityMatrix[key]){
			priorVector.push(node.probabilityMatrix[key][secondKey]);
		}
  		
	}

	var total = [[]];
	var priorVectorEvens = [];
	var priorVectorOdds = [];
	for(i =0; i < priorVector.length; i+=2){
		priorVectorEvens.push(priorVector[i]);
		priorVectorOdds.push(priorVector[i+1]);

	}

	total.push(priorVectorEvens);
	total.push(priorVectorOdds);
	total.shift();
	//Just one parent
	var parentBeliefMatrix = beliefMatrix[parents[1].name];

	var priorBeliefVector = parentBeliefMatrix.pie_x;


	for(i =0; i<total.length; i++){
			var tmpLength = total[i].length;
			console.log(updatedLambdaVector);
			var priorVectorEvens = [];
			//console.log(total[i]);
		var vectorOdds = [];
		var vectorEvens = [];

		for(j =0; j < tmpLength; j+=2){

			vectorEvens.push(total[i][j]);
			vectorOdds.push(total[i][j+1]);

		}
		var evenResult = 0;

		for (i =0; i<updatedLambdaVector.length; i++){
			for(j=0; j<vectorEvens.length;j++){
				for(k = 0;k<priorBeliefVector.length;k++){
					//console.log(updatedLambdaVector[i] + " " + vectorEvens[j] + " " + priorBeliefVector[k]);
					if(j===k){
					evenResult += updatedLambdaVector[i]*vectorEvens[j]*priorBeliefVector[k];
					}
				}
			}
		}
		var oddResult = 0;

		for (i =0; i<updatedLambdaVector.length; i++){
			for(j=0; j<vectorEvens.length;j++){
				for(k = 0;k<priorBeliefVector.length;k++){
					
											//console.log(updatedLambdaVector[i] + " " + vectorOdds[j] + " " + priorBeliefVector[k]);
					if(j===k){
					oddResult += updatedLambdaVector[i]*vectorOdds[j]*priorBeliefVector[k];
					}
				}
			}
		}

		console.log();
		var firstResultVector = [evenResult,oddResult];
	

		console.log();

		var otherParentBeliefMatrix = beliefMatrix[parents[0].name];
		var otherPriorBeliefVector = otherParentBeliefMatrix.pie_x;

	
		//console.log(total);
		var first = total[0];
		var second = total[1];
	
		var firstHalfOfFirst = [];
		var secondHalfOfFirst = [];
		var firstHalfOfSecond = [];
		var secondHalfOfSecond = [];

		for(i = 0; i<2; i++){
			firstHalfOfFirst.push(first[i]);
		}

		for(i = 0; i<2; i++){
			secondHalfOfFirst.push(second[i]);
		}
		for(i = 2; i<4; i++){
			firstHalfOfSecond.push(first[i]);
		}
		for(i = 2; i<4; i++){
			secondHalfOfSecond.push(second[i]);
		}

		var firstHalf = firstHalfOfFirst.concat(secondHalfOfFirst);
		var secondHalf = firstHalfOfSecond.concat(secondHalfOfSecond);
	

		var resultVector= [];
		var sum1 = 0;
		for(i=0;i<updatedLambdaVector.length;i++ ){
			for(j=0;j<firstHalf.length; j++){
				for(k=0;k<otherPriorBeliefVector.length;k++){
					if(j===k){
						sum1+=updatedLambdaVector[i]*firstHalf[j]*otherPriorBeliefVector[k];
					}
				}
			}
		}
		resultVector.push(sum1);

		var sum2 = 0;
		for(i=0;i<updatedLambdaVector.length;i++ ){
			for(j=0;j<secondHalf.length; j++){
				for(k=0;k<otherPriorBeliefVector.length;k++){
					if(j===k){
						sum2+=updatedLambdaVector[i]*secondHalf[j]*otherPriorBeliefVector[k];
					}
				}
			}
		}
		resultVector.push(sum2);
		//updated lambdas

	
		 var resultMatrix= [[]];
		 resultMatrix.push(firstResultVector);
		 resultMatrix.push(resultVector);
		 console.log(beliefMatrix);
		var tmpBeliefMatrix = {};
		for(j= 0; j <nodes.length; j++){

				tmpBeliefMatrix[nodes[j].name] = {};

				for(i = 0; i < edges.length; i++){

					if(nodes[j].name === edges[i].to){
						if(nodes[j].name === node.name){
							var val = resultMatrix[j];
							//console.log("this is my edges froms" + edges[i].from + "with node " + nodes[j].name);
							//get conditional probability matrix 

							tmpBeliefMatrix[nodes[j].name][edges[i].from]={lambda_x:val,pie_x:beliefMatrix[edges[i].from].pie_x}; 
						}
						else{
						tmpBeliefMatrix[nodes[j].name][edges[i].from]={lambda_x:[1,1],pie_x:beliefMatrix[edges[i].from].pie_x}; 
						}

					}
					else{
						//tmpBeliefMatrix[nodes[j].name] = null;

					}
				}
		}
		
		var normalizingConstant = 1;
		//console.log(tmpBeliefMatrix);
		//Now we have temporary bleief matrix so we can go back and calculate pie_x values according to 
		//

		//compute alpha
	//console.log(beliefMatrix);
		//blief = alpha*pie*lambd
	
		var alphaBeliefVector = beliefMatrix[node.name].belief_x;
		var alphaBeliefVal = alphaBeliefVector[0];

		var alphaPieVector = beliefMatrix[node.name].pie_x;
		var alphaPieVal = alphaPieVector[0];

		var alphaLambdaVector = beliefMatrix[node.name].lambda_x;
		var alphaLambdaVal = alphaLambdaVector[0];

		var alpha = alphaBeliefVal/(alphaPieVal*alphaLambdaVal);
		

				
		
		console.log('"----------------------"');
		//update parentless nodes
		for(var key in tmpBeliefMatrix){
			if(key === 'Holmes'){
				for(var subkey in tmpBeliefMatrix[key] ){
					//console.log("WHAT THE ACTUAL FUCK ");
					//console.log(tmpBeliefMatrix[key]);
					

						tmpBeliefMatrix[key].Raining.lambda_x= firstResultVector;


					


				}
			}
		}
		
		//not sure how this function should actually work
		
		


	
		//this right here needs to be abstracted but it won't be easy
		tmpBeliefMatrix['Watson']['Raining'].lambda_x[0]=  alpha*tmpBeliefMatrix['Holmes']['Raining'].lambda_x[0]*tmpBeliefMatrix['Holmes']['Raining'].pie_x[0];
		tmpBeliefMatrix['Watson']['Raining'].lambda_x[1]=  alpha*tmpBeliefMatrix['Holmes']['Raining'].lambda_x[1]*tmpBeliefMatrix['Holmes']['Raining'].pie_x[1];

		

		//finally update Watsons belief value by taking the onditional versus 
		console.log("---------------------");
		var vectorMatrix = [[]];
		for(var key in nodes){
			if(nodes[key].name === 'Watson'){
				console.log(nodes[key].probabilityMatrix);
				for(var subkey in nodes[key].probabilityMatrix){
					var array= [];
					for(var subsubkey in  nodes[key].probabilityMatrix[subkey]){
						array.push(nodes[key].probabilityMatrix[subkey][subsubkey]);
					}
					vectorMatrix.push(array);

				}
			}
		}
		vectorMatrix.shift();
		
		//final computation is to get the fold of the conditional probabilities and the updated pie

		var tmpVect =  tmpBeliefMatrix['Watson']['Raining'].lambda_x;

		console.log(numeric.transpose(vectorMatrix));
		console.log(tmpVect);
		var resultVector2 = [];
		for(i=0; i < numeric.transpose(vectorMatrix).length; i++){
			var tmp1 = 0;
			for(j=0; j < numeric.transpose(vectorMatrix)[i].length; j++){
				console.log(tmpVect[j] +  "    " + numeric.transpose(vectorMatrix)[i][j]);
				tmp1+=tmpVect[j]*numeric.transpose(vectorMatrix)[i][j];
			
			}	
			//console.log(tmp1);

			resultVector2.push(tmp1);
		}
			

			beliefMatrix['Watson'].belief_x = resultVector2;
			beliefMatrix['Watson'].pie_x = resultVector2;
				beliefMatrix['Raining'].belief_x = tmpVect;

			beliefMatrix['Holmes'].belief_x = beliefMatrix['Holmes'].lambda_x;


			console.log(beliefMatrix);







			


	}



}


function updatePriors(){
	for(i=0; i< nodes.length; i++){
		if(nodes[i].probabilityMatrix.unconditional){
			var priorVector = [];
			for (var key in nodes[i].probabilityMatrix.unconditional) {
  				if (nodes[i].probabilityMatrix.unconditional.hasOwnProperty(key)) {
    			priorVector.push(nodes[i].probabilityMatrix.unconditional[key]);
  				}
			}
			beliefMatrix[nodes[i].name] = {belief_x:priorVector,pie_x:priorVector,lambda_x:[1,1]}

		}
	}

}
 function customDotProduct(a,b,parentsLength,node) {
	
	
	//console.log(a);
	
	var aEvens = [];
	var aOdds = [];
	for(i =0; i < a.length; i+=2){
		aEvens.push(a[i]);
		aOdds.push(a[i+1]);

	}

	
	var total = [[]];
	total.push(aEvens);
	total.push(aOdds);
	total.shift();

	
	var priorMatrix = [[]];
	for(i=0; i < b.length; i+=parentsLength){
		priorMatrix.push(b.slice(i,i+parentsLength));

	}
	priorMatrix.shift();


	//console.log(total);
	//console.log(priorMatrix);

	if(parentsLength ===2){
		var resultVector = [];
		for(iter=0;iter<total.length;iter++){
			var product1 = 0;
			var count = 0;
			for(i =0 ; i < priorMatrix.length; i +=2){
				var first = priorMatrix[i];
				var second = priorMatrix[i+1];
				
				for (j = 0; j < first.length; j++){
					for(k=0; k < second.length; k ++){
						//console.log(first[k] + "  " +  second[j] + "  " + total[iter][count] );
						product1 = first[k]*second[j]*total[iter][count] +product1;
						count +=1;
					}
				}

			}
			resultVector.push(product1);

		
		}
	}
	if(parentsLength ===1){
		var resultVector = [];
		// console.log("Watson--------");
		// console.log(total);
		// console.log(priorMatrix);

		for(i = 0; i < priorMatrix.length; i++){
			var product1 = 0;
			for(j=0; j < total[i].length; j++){
				//console.log(priorMatrix[i][0]+ " "+total[i][j]);
				product1 = priorMatrix[j][0]*total[i][j]+product1;
			}
			resultVector.push(product1);
		}
		
		
	}
	
	beliefMatrix[node.name] = {belief_x:resultVector,pie_x:resultVector,lambda_x:[1,1]}

	//process.exit();



 }




//console.log(firstNode.probabilityMatrix);