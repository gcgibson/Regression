var math = require('mathjs');
var fs    = require("fs");
var csv = require('fast-csv');
var ols = require('./ols.js');
var _ = require('underscore');

var stream1 = fs.createReadStream("30000001_Marketing Channels_Default View_20140301_20140331.csv");
var stream2 = fs.createReadStream("30000001_Marketing Channels_Default View_20140401_20140430.csv");
var stream3 = fs.createReadStream("30000001_Marketing Channels_Default View_20140501_20140531.csv");
var stream4 = fs.createReadStream("30000001_Marketing Channels_Default View_20140601_1.csv");
var stream5 = fs.createReadStream("30000001_Marketing Channels_Default View_20140601_2.csv");
var stream6 = fs.createReadStream("30000001_Marketing Channels_Default View_20140601_3.csv");
var stream7 = fs.createReadStream("30000001_Marketing Channels_Default View_20140601_4.csv");
var stream8 = fs.createReadStream("30000001_Marketing Channels_Default View_20140601_5.csv");


var rawData = [];
var newMatrix1 = [[]];
var newMatrix2 = [[]];
var newMatrix3 = [[]];
var newMatrix4 = [[]];
var newMatrix5 = [[]];
var newMatrix6 = [[]];
var newMatrix7 = [[]];
var newMatrix8 = [[]];




//Start server but we only be grabbing some endpoints for now

var server = new Hapi.Server('localhost', 5000, { files: { relativeTo: Path.join(__dirname, 'public') } });


var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(1);
    });

stream1.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(2);
    });

stream2.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(3);
    });

stream3.pipe(csvStream);
var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(4);
    });

stream4.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(5);
    });

stream5.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(6);
    });

stream6.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(7);
    });

stream7.pipe(csvStream);

var csvStream = csv()
    .on("data", function(data){
         parseData(data);
    })
    .on("end", function(){
         finishedData(8);
    });

stream8.pipe(csvStream);





function parseData(data){
	rawData.push(data);
}

function finishedData(ver){
//console.log(rawData);
  if(ver === 1){
  for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix1.push(row);
  }
  //var matrix = math.matrix(newMatrix);
  //console.log(newMatrix1);
  }
  else if (ver ===2){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix2.push(row);
  }
  }
 else if (ver ===3){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix3.push(row);
  }
  }
   else if (ver ===4){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix4.push(row);
  }
  }
 else if (ver ===5){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix5.push(row);
  }
  }
  else if (ver ===6){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix6.push(row);
  }
  }
    else if (ver ===7){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix7.push(row);
  }
  }
    else if (ver ===8){
      for (i =0; i < rawData.length; i++){
    var row = [];
    for(j = 0; j< rawData[0].length; j++){
      if(j === 0 | j ===1 | j ===3){
        row.push(rawData[i][j]);
      }
    }
    newMatrix8.push(row);
  }
  //BREAK HERE CUZ EVERYTHING AFTER THIS WORKS
  //var matrix = math.matrix(newMatrix);
  //useMatrix

  var useMatrix = newMatrix8;
    //console.log(useMatrix);
    console.log(useMatrix);

    parseSales(useMatrix);
 
    var marketingChannels  =getMarketingChannels(newMatrix1);
    var finalMatrixOne = getMarketingChannelsArray(newMatrix1);
  
  // console.log(newMatrix2);
 
    for(i = 0; i <useMatrix.length; i++){
        
        //if marketing channel is in matrix
        if(useMatrix[i][0] !== 'Total' | useMatrix[i][0] !== 'Sales'){
          var index =marketingChannels.indexOf(useMatrix[i][0]);
       
        if(index>-1){
          if(finalMatrixOne[index]){

          finalMatrixOne[index].push(useMatrix[i][1]);
        }
        }
      }
      if(useMatrix[i][0]=== 'Total'){
       
        for(k =0; k <finalMatrixOne.length; k++){
         
          if(finalMatrixOne[k][0] === 'Sales'){
            finalMatrixOne[k].push(useMatrix[i][1]);
          }
        }
      }
 
    }
    /*
    console.log("-----finalMatrixOne-------");
    console.log(finalMatrixOne);
    console.log("-----finalMatrixOne-------");
    */
    //ols.ols(finalMatrixOne,marketingChannels);

  } 
}

function parseSales(matrix){
  for (i =0; i < matrix.length; i++){
    if (matrix[i][0] === 'Total'){

    }
    else{
      matrix[i].pop();
    }
  }
}

function getMarketingChannels(matrix){
  var mc = [];
   for (i =0; i < matrix.length; i++){
      if(matrix[i][0] === 'Marketing Channel'){

      }
      else if(matrix[i][0] === 'Total'){

      }
      else{
        mc.push(matrix[i][0]);
      }

   }
   mc.splice(0,1);
   mc.push('Sales');
   return mc;
}
function getMarketingChannelsArray(matrix){
  var mc = [];
   for (i =0; i < matrix.length; i++){
      if(matrix[i][0] === 'Marketing Channel'){

      }
      else if(matrix[i][0] === 'Total'){

      }
      else{
        mc.push([matrix[i][0]]);
      }

   }
   mc.splice(0,1);
   mc.push(['Sales']);
   return mc;
}


module.exports.server = server;