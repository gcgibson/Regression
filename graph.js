var node = require('./node.js');
var edge = require('./edge.js');


//Initial marginal probability nodes 
var Pollution = node.createNode('Pollution');
node.setProbabilityMatrix(Pollution,
{
	'unconditional':{'low':.9,'high':.1}}



);

var Smoker = node.createNode('Smoker');
node.setProbabilityMatrix(Smoker,
{
	'unconditional':{'true':.3,'false':.7}}


);


var Cancer = node.createNode('Smoker');
node.setProbabilityMatrix(Smoker,
{

	'P=H & S=T':{'true':.05,'false':.95},
	'P=H & S=F':{'true':.02,'false':.98},
	'P=L & S=T':{'true':.03,'false':.97},
	'P=L & S=F':{'true':.001,'false':.999}



});

var Dysnopea = node.createNode('Dysnopea');
node.setProbabilityMatrix(Dysnopea,
{

	'C=T':{'true':.65,'false':.35},
	'C=F':{'true':.30,'false':.7}



});

var Xray = node.createNode('Xray');
node.setProbabilityMatrix(Xray,
{

	'C=T':{'true':.9,'false':.1},
	'C=F':{'true':.2,'false':.8}



});
var nodes= [];
nodes.push(Pollution);
nodes.push(Smoker);
nodes.push(Cancer);
nodes.push(Dysnopea);
nodes.push(Xray);


//Populate edges
var edge1 = edge.createEdge('Pollution','Cancer');
var edge2 = edge.createEdge('Smoker','Cancer');
var edge3 = edge.createEdge('Cancer','Xray');
var edge4 = edge.createEdge('Cancer','Dysnopea');


//Bayesian inference 

//   Belief(X=x) = \alpha P(X=x) llh(X=x)

//create pi and lambda functions matrix 
var matrix = [[]];

for(i = 0; i  <nodes.length;i++){
	
}







//console.log(firstNode.probabilityMatrix);