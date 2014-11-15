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

var names = [ 'James', 'Christopher'

,'Ronald'	 	 ,'Mary'	 ,'Lisa'	 ,'Michelle'
 ,'John'	 ,'Daniel'	 ,'Anthony'	 	 ,'Patricia'	 ,'Nancy'	 ,'Laura'
 ,'Robert'	 ,'Paul'	 ,'Kevin'	 	 ,'Linda'	 ,'Karen'	 ,'Sarah'
 ,'Michael'	 ,'Mark'	 ,'Jason'	 	 ,'Barbara'	 ,'Betty'	 ,'Kimberly'
 ,'William'	 ,'Donald'	 ,'Jeff'	 	 ,'Elizabeth'	 ,'Helen'	 ,'Deborah'
 ,'David'	 ,'George'	 	 	 ,'Jennifer'	 ,'Sandra'	 
 ,'Richard'	 ,'Kenneth'	 	 ,'Maria'	 ,'Donna'
 ,'Charles'	 ,'Steven'	 	 ,'Susan'	 ,'Carol'
 ,'Joseph'	 , 'Edward'	 	 , 'Margaret'	 , 'Ruth'
 , 'Thomas'	 , 'Brian'	 	 , 'Dorothy',	  'Sharon'];

 
 

 var map = {'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7,'i':8,'j':9,'k':10,'l':11,'m':12,'n':13,'o':14,'p':15,'q':16,'r':17,'s':18,'t':19,'u':20,'v':21,'w':22,'x':23,'y':24,'z':25};
 var inverse =  {0:'a',1:'b',2:'c',3:'d',4:'e',5:'f',6:'g',7:'h',8:'i',9:'j',10:'k',11:'l',12:'m',13:'n',14:'o',15:'p',16:'q',17:'r',18:'s',19:'t',20:'u',21:'v',22:'w',23:'x',24:'y',25:'z'};



var probabilityMatrix= [[]];
var state = [];
for(i =0; i < nodes.length; i ++){
	for(k =0; k < nodes.length; k++){
		nodes[k].probabilityMatrix = 0;

	probabilityMatrix.push([nodes[i],nodes[k]]);
	}
}
	probabilityMatrix.shift();
	
	var count = [[]];
	var newProbabilityMatrix = numeric.identity(26);
	for(i=0; i < newProbabilityMatrix.length; i ++){
		for(j=0; j <newProbabilityMatrix[i].length; j++){
			newProbabilityMatrix[i][j] = 0;
		}
	}
	

	for(i =0; i < names.length; i ++){
		for (j =0; j<names[i].length-1; j++){
			
			//console.log(names[i][j].toLowerCase() +  "   " +names[i][j+1].toLowerCase() );
			
			count.push([names[i][j].toLowerCase(),names[i][j+1].toLowerCase()]);
		}
	}
	//console.log(count);
	count.shift();
			
	for(k = 0; k <count.length; k++){
		var first = count[k][0];
		var second = count[k][1];
		var firstIndex = map[first];
		var secondINdex = map[second];
		//console.log(firstIndex + "  " + secondINdex);


		if(first ==='a'){
			//console.log(first + "  " + firstIndex + "  " + second + "   " + secondINdex + "  " +k);
		}
		newProbabilityMatrix[firstIndex][secondINdex] +=1;
		
		
	}

	//console.log(count);
	//console.log(newProbabilityMatrix);	




	


  prompt.start();

//console.log(probabilityMatrix);
  prompt.get(['username','numofetters'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  Give me the first letter of your name: ' + result.username + ' and the number of letter' +  result.numofetters);
      var index = map[result.username];
      state.push(index);
    for(k = 0; k <result.numofetters-1; k++){
	 
	    var max = 0;
	    console.log(newProbabilityMatrix[index]);

	    var returnIndex = 0;
	  	for(i = 0; i < newProbabilityMatrix[index].length; i++){
	  		//console.log(max);
	  		if(newProbabilityMatrix[index][i] > max){
	  			returnIndex = i;
	  			max = newProbabilityMatrix[index][i];

	  		}
	  
	  	}
	    
	    //console.log(probabilityMatrix[index]);
	    index = returnIndex;
	    state.push(returnIndex);
	}

     

     //console.log(state);
     var finalString = [];
     for(i=0; i<state.length; i++){
     	finalString.push(inverse[state[i]]);
     	//finalString.concat(inverse[state[i]]);
     }
     console.log(finalString);
     

  });

 //run ratiov







