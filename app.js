var math = require('mathjs');
var fs    = require("fs");
var csv = require('fast-csv');
var ols = require('./ols.js');
var _ = require('underscore');
var request = require('request');
var fs = require('fs');



var rawTotal = [[]];


//Start server but we only be grabbing some endpoints for now


fs.readFile('/home/gcgibson/Desktop/formConfig.json','utf-8', function(err,formData){




fs.readFile('./dates.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var rows = data.split("\n");
    var dateMatrix = [[]];
    for(i = 0; i <rows.length; i++){
      dateMatrix.push( rows[i].split(","));
  }
  dateMatrix.shift();

    var workborkOptions = {
          url: 'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/reportview.do?method=addViewToWorkbook',
          qs: {method:'addViewToWorkbook'},
          form:'tabIndex=%2D1&viewId=default&reportURI=report%3A%2Fchannelsummary%2Fchannelsummary%2Eftl&workbookId=373711'
    };

    var options = {
        url: 'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/welcome.do',
        form: JSON.parse(formData)
    };


    request.post(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            //make workspace visible request 




            var cookie = res.headers['set-cookie'];
            //console.log(cookie);
            //
            var dateArray = dateMatrix;
            //console.log(dateArray);
          

         // request.post(workborkOptions, function (err, res, body) {

                //  if(err){
                 //   console.log(err);
                //  }

                //  else{
                  
                  
                  var matrixOfMatrices = [[[]]];
                  var count = 0;
           


                    for(i =0; i< dateArray.length;i++){
     
                      generateMatrix(dateArray[i],cookie, function(matrix){

                        matrixOfMatrices.push(matrix);
                        count +=1;
                      if(count  === dateArray.length){
                           pareMatrixOfMatrices(matrixOfMatrices);

                        }

                      });
                    }
               
                   // }


                   // });
          }
    });


});
});
function generateMatrix(date,cookie,callback){




            var options2 = {
              url:'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/reportdata.do?method=getReportDataAsync',
              qs: {method:'getReportDataAsync'},
              headers: {Cookie: cookie},
              form: 'data=%7B%22periodA%22%3A%7B%22endDateId%22%3A'+date[1]+'%2C%22periodType%22%3A%22'+date[2]+'%22%2C%22startDateId%22%3A'+date[0]+'%7D%2C%22reportUri%22%3A%22%2Fchannelsummary%2Fchannelsummary%2Eftl%22%2C%22rowCount%22%3A10000%2C%22startRow%22%3A1%2C%22viewID%22%3A%22default%22%7D'
              };
            
                request.post(options2, function (err, res, body) {
                    //console.log(JSON.parse(body).timeout);
                  

                  if(JSON.parse(body).timeout === true){
                    //console.log("ITS TRUE");
                    setTimeout(function(){

                      var optionsforCheck = {
                            url: 'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/reportdata.do?method=checkAsyncResult&resultId=8851904384045687904',
                          headers: {Cookie: cookie},
                          qs: {method:'checkAsyncResult',
                              resultId: JSON.parse(body).resultId}
                      };

                       request.post(optionsforCheck, function (err, res, body) {
                            console.log(body);
                              if(err){
                            console.log(err);
                            }
                        else{
                              var totalMatrix = JSON.parse(body).reportData[0].total;
                            var sendMatrix = parseRawData(JSON.parse(body).reportData);
                 
                            for(i =0; i< totalMatrix.length; i ++){
                              sendMatrix.push(totalMatrix[i]);
                             }
          
                              callback(sendMatrix);
                              }


                       });








                  }






                      , 5000);



                  }



                  else{
                             if(err){
                            console.log(err);
                            }
                        else{
                              var totalMatrix = JSON.parse(body).reportData[0].total;
                            var sendMatrix = parseRawData(JSON.parse(body).reportData);
                 
                            for(i =0; i< totalMatrix.length; i ++){
                              sendMatrix.push(totalMatrix[i]);
                             }
          
                              callback(sendMatrix);
                    }
                
                    }
                });
      }




function parseRawData(matrix){
        var newMatrix = [[]];
         var innerDataString = matrix[0].rows[0]; 
         var rows = innerDataString.split("\n");

         for (i = 0; i < rows.length; i++){
          newMatrix.push(rows[i].split("\t"));
    
         }  
  
         //console.log("-SUB--",newMatrix.length,"---");
         return newMatrix;


}


function pareMatrixOfMatrices(metaMatrix){
 
    //console.log(rawTotal);
    //console.log("--FULL--",metaMatrix,"----");
    var condensedMatrix = [[]];
    for (i=0;i<metaMatrix.length; i ++){
        for(j =0; j <metaMatrix[i].length; j++){
          condensedMatrix.push(metaMatrix[i][j]);
        }
    }
    //console.log("--CONDENSED--",condensedMatrix,"----");
    finishedData(condensedMatrix);

}

function finishedData(useMatrix){

    var newMatrix1 = useMatrix;
    //console.log(useMatrix);
   // console.log(useMatrix);

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
    console.log(finalParse(finalMatrixOne));
    console.log("-----finalMatrixOne-------");
    */


  ols.ols(finalParse(finalMatrixOne),finalMarketingChannels(marketingChannels));

  } 
function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

function finalMarketingChannels(marketingChannels){
  var newMatrix = [];
  for(i = 0; i < marketingChannels.length; i++){
     if(!(marketingChannels[i]===undefined)){
          newMatrix.push(marketingChannels[i]);
     }
  }
  newMatrix.shift();
  return uniq(newMatrix);

}
function finalParse(matrix){
  var newMatrix = [[]];
  for(i = 0; i < matrix.length; i++){
     if(!(matrix[i][0]===undefined || matrix[i].length < 3)){
          newMatrix.push(matrix[i]);
     }
  }
  newMatrix.shift();
  return newMatrix;

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
