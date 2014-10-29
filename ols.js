var _ = require('underscore');
var math = require('mathjs');
var numeric = require('numeric');
var plotly = require('plotly')('casey.gibson','ccamapj4tx');
var Hapi = require('hapi');
var Path = require('path');


var rawData = [ [ 'rah_Ariel33',
    '17262',
    '16555',
    '15978',
    '14833',
    '14833',
    '1212312',
    '523523',
    '134134' ],
  [ 'DMO5997_20140829050412',
    '9041',
    '8609',
    '8330',
    '65756',
    '34634',
    '746746',
    '346346',
    '346346' ],
  [ 'automation test channel',
    '2265',
    '2179',
    '2061',
    '1940',
    '4264',
    '1545',
    '86336',
    '563456' ],
  [ 'PawanTest', '-', '-', '-', '-', '-', '-', '-', '-' ],
  [ 'test1', '-', '-', '-', '-', '-', '-', '-', '-' ],
  [ 'All Other MMC Vendors',
    '55731',
    '52660',
    '51803',
    '47461',
    '573573',
    '2462246',
    '25425',
    '37757' ],
  [ 'Natural Search Activity',
    '26752',
    '26124',
    '25388',
    '23534',
    '2462426',
    '245245',
    '2624626',
    '246246' ],
  [ 'Referring Sites Activity',
    '125032',
    '118679',
    '121135',
    '115125',
    '246246',
    '5135',
    '76543',
    '16467' ],
  [ 'Direct Load Activity',
    '8151',
    '4620',
    '4397',
    '4781',
    '9767',
    '74575',
    '25645',
    '77257' ],
  [ 'Sales',
    '192778',
    '182131',
    '182951',
    '173454',
    '26456',
    '342346',
    '7573457',
    '24564' ] ];




var ols = function(datamatrix,marketingChannels){
	datamatrix = datamatrix;
	var datamatrixy = datamatrix;
	//console.log(datamatrix);
//   (X_tX)^-1X'y  all the important matrices
	var X = prepareX(datamatrix);	

	var Y = rowToColumn(prepareY(datamatrixy));

	
//Just testing regression logic
 	//process.exit();
	//var Y = [[1],[2],[1.3],[3.75],[2.25]]; 
	//var X = [[1,1],[1,2],[1,3],[1,4],[1,5]];

	var X_t = numeric.transpose(X);
	console.log('-------X-----');
	console.log(X);

	console.log("\n");
		console.log('-----Y------');

	console.log(Y);
	console.log("\n");
	//once we have calculated those we can calculate standard error



	var b1 = [];
	if (numeric.dim(X).length > 1){ 
		var b1 = numeric.dotMMbig(X_t,X);
	
	}else{
		var b1 = numeric.dotVV(X_t,X);
	}



	//b1 = stripWhifsdgdsgsteSpace(b1);

	
	try{
	var b2 = math.inv(b1);
	}
	catch(err){
		console.log(err);
	}


	if (numeric.dim(X).length > 1){ 
	var b3 = numeric.dotMMbig(b2,X_t);
	}
	else {

		var b3 = numeric.dot(b2,X_t);
	}



	var Y_new = 	fixYFormat(Y);

		console.log('-----Beta Hat Vector-------');

	var b = numeric.dotMV(b3,Y);
	console.log(b);

console.log("\n");
	



	var json = {}

	for (var i = 0; i < b.length; i++) {
    	json[i] = b[i];
	}
    
    var Y_hat = numeric.dotMV(X,b);

	var MSE  = calculateStandardError(Y_hat,Y);
	
	var Y_bar = calculateYBar(Y);
	var sumOfSquares = totalSumOfSquares(Y,Y_bar);

	var R = 1-MSE/sumOfSquares;
	
	console.log("-------R----------")
	console.log(R + " %");

	server_options = {
    	files: {
        	relativeTo: Path.join(__dirname, 'public')
    	},
	};

	var server = new Hapi.Server('localhost', 8665, server_options);
 

	server.route({
    method: 'GET',
    path: '/hello.js',
    handler: function (request, reply) {
        reply.file('hello.js');
    }
	});

	server.route({
    method: 'GET',
    path: '/index.html',
    handler: function (request, reply) {
        reply.file('index.html');
    }
	});

	server.route({
    method: 'GET',
    path: '/data.json',
    handler: function (request, reply) {
        reply(json);
    }
	});

	server.route({
    method: 'GET',
    path: '/marketingChannels.json',
    handler: function (request, reply) {
    	
        reply(marketingChannels);
    }
	});

server.start();


};

function calculateStandardError(Y_hat,Y){

	var sum = 0;
	for(i =0; i < Y.length; i ++){
		sum += (Y_hat[i] - Y[i])*(Y_hat[i] - Y[i]);
	}
	return sum/Y.length;
}

function calculateYBar(Y){
	var sum =0;
	for(i=0; i < Y.length;i++){
		sum = parseInt(Y[i],10);
	
	
	}

	return sum/Y.length;
}

function totalSumOfSquares(Y,Y_bar){
	var sum  =0 ;
	//console.log(Y, "   +    ",Y_bar);
	for (i = 0; i <Y.length;i++){
		sum += Y[i] - Y_bar;
	}
	return sum/Y.length;

}

function rowToColumn(vector){
	var column = [[]];
	for(i =0; i<vector.length; i++ ){
		column.push([vector[i]]);

	}
	column.shift();
	return column;
}




function fixYFormat(column){
	var newY =[[]];
	
	for(i =0; i <column.length; i++){
		newY.push([column[i]]);
	}

	return newY;
}
function stripWhiteSpace(matrix){

	for(i = 0; i < matrix.length; i++){
		for(j=0;j<matrix[i].length; j++){
			//matrix[i][j] = Math.random(); 
		}
	}
	return matrix;

}

function prepareX(datamatrix1){
	
	_.map(datamatrix1, function(entry){ 

		return entry.shift();

	});
	
	var noNull = _(datamatrix1).filter(function (x) { return x[0]!=='-';});
	//console.log(noNull);
	noNull.pop();
	
	//console.log(noNull);
	var returnMatrix = _.map(noNull,function(entry){
		var tmp = entry;
		//
		return(['1'].concat(entry));
	});

	 return returnMatrix;
	
}


function prepareY(datamatrix1){
	
	_.map(datamatrix1, function(entry){ 

		//return entry.shift();

	});
	_.map(datamatrix1, function(entry){
		return _.map(entry, function(val){
			//console.log(val);
			return [parseInt(val,8)];
		});

	});
	
	var noNull = _(datamatrix1).filter(function (x) { return x[0]!=='-';});

	return noNull[noNull.length-1];
}









module.exports.ols = ols;