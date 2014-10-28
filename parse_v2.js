var math = require('mathjs');
var fs    = require("fs");
var csv = require('fast-csv');
var ols = require('./ols.js');
var _ = require('underscore');
var request = require('request');



var rawTotal = [[]];


//Start server but we only be grabbing some endpoints for now

form_data = {
        clientid: 30000001,
        j_username: 'SoftServe',
        j_password: 'pw41t34m',
        language: 'en_US',
        loginrequest: 'true',
        test: 'false',
        testMode: 'false'
    };

    var options = {
        url: 'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/welcome.do',
        form: form_data
    };

    request.post(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {

            var cookie = res.headers['set-cookie'];
            //console.log(cookie);
            var dateArray = ["20141027","20141027"];
           var matrixOfMatrices = [[[]]];
           var count = 0;
           for(i =0; i< dateArray.length;i++){
            console.log(dateArray[i]);
          generateMatrix(dateArray[i],cookie, function(matrix){

                matrixOfMatrices.push(matrix);
                count +=1;
                if(count  === dateArray.length){
                    pareMatrixOfMatrices(matrixOfMatrices);

                }

          });
        }




          }
    });

function generateMatrix(date,cookie,callback){
  form_data2 = {
          data: {"reportPeriodType":1,"reportName":"30000001_Marketing Channels","attachmentType":"EXCEL","subject":"30000001_Marketing Channels - Daily","currentView":{"keyColumns":[{"datatype":"TEXT","columnId":"CHANNEL_NAME","isVisible":true,"title":"Marketing Channel","compareable":true,"filterable":true,"isKey":true,"avgChars":24,"isMain":false,"fieldPos":"0","trendable":true,"isSortable":true,"format":"NONE"}],"metrics":[{"datatype":"INTEGER","axisFormatter":{"isAbbrevSignToRight":true,"decimalSeparatorTo":".","thousandsSeparatorTo":",","error":null,"precision":1},"columnId":"UNIQUE_VISITORS","showCdrSummedMsg":true,"compareable":true,"format":"INTEGER","comparisonSpecifier":"A","mx_internal_uid":"B7E72808-4142-F4D6-3E6E-52F40BABC170","isMain":false,"isVisible":true,"filterable":true,"label":"Unique Visitors","isKey":false,"categories":["Visitor Metrics","Popular Metrics"],"formatter":{"actualFormatter":{"decimalSeparatorTo":".","thousandsSeparatorTo":",","error":null,"precision":0},"error":null},"noSameSessionDisplay":true,"title":"Unique Visitors","trendable":true,"fieldPos":"1","maxVal":4034,"isSortable":true,"id":"UNIQUE_VISITORS"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"BUYERS_PER_VISITOR","compareable":true,"format":"PERCENT","comparisonSpecifier":"A","isMain":false,"isVisible":true,"filterable":true,"label":"Buyer / Visitor","isKey":false,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"noSameSessionDisplay":true,"title":"Buyer / Visitor","trendable":true,"fieldPos":"2","maxVal":0.0235,"isSortable":true,"categories":["Commerce Metrics","Popular Metrics"],"id":"BUYERS_PER_VISITOR"},{"datatype":"DECIMAL","axisFormatter":{"alignSymbol":-1,"abbrevSpacer":"","error":null,"decimalSeparatorTo":".","currencySymbol":"$","thousandsSeparatorTo":",","abbrevPlacement":4,"precision":2},"columnId":"SALES","compareable":true,"format":"CURRENCY","comparisonSpecifier":"A","isMain":false,"isVisible":true,"filterable":true,"label":"Sales","isKey":false,"categories":["Commerce Metrics","Popular Metrics"],"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"alignSymbol":-1,"currencySymbol":"$","thousandsSeparatorTo":","},"error":null},"noSameSessionDisplay":true,"title":"Sales","trendable":true,"fieldPos":"3","maxVal":120632.23,"isSortable":true,"id":"SALES"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"BOUNCE_RATE","compareable":true,"title":"Bounce Rate","comparisonSpecifier":"A","isMain":false,"isVisible":true,"filterable":true,"label":"Bounce Rate","maxVal":0.595,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"noSameSessionDisplay":true,"lowValuesGood":true,"trendable":true,"fieldPos":"4","isKey":false,"isSortable":true,"categories":["Activity Metrics","Popular Metrics"],"format":"PERCENT","id":"BOUNCE_RATE"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"NEW_VISITOR_PCT","compareable":true,"format":"PERCENT","comparisonSpecifier":"A","isMain":false,"isVisible":true,"filterable":true,"label":"New Visitor %","isKey":false,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"noSameSessionDisplay":true,"title":"New Visitor %","trendable":true,"fieldPos":"5","maxVal":0.8239,"isSortable":true,"categories":["Visitor Metrics","Acquisition Metrics"],"id":"NEW_VISITOR_PCT"},{"fieldPos":"6","columnId":"__ROW_KEY__"},{"fieldPos":"7","columnId":"__ROW_ACTION_AVAILABILITY__"}],"isAutomatic":true,"compares":[{"calculations":["B"],"columnId":"UNIQUE_VISITORS"},{"calculations":["B"],"columnId":"BUYERS_PER_VISITOR"},{"calculations":["B"],"columnId":"SALES"},{"calculations":["B"],"columnId":"BOUNCE_RATE"},{"calculations":["B"],"columnId":"NEW_VISITOR_PCT"},{"calculations":["B"],"columnId":"__ROW_KEY__"},{"calculations":["B"],"columnId":"__ROW_ACTION_AVAILABILITY__"}],"type":"FLAT","sorts":[{"comparisonSpecifier":"A","columnId":"UNIQUE_VISITORS","sortDirection":"DESC"}],"customAttributes":{"chartsAreaHeight":"50","cboMetrics1":"UNIQUE_VISITORS","cboMetrics3":"UNIQUE_VISITORS","origViewId":"default"},"viewName":"Default View","visibleColumns":["CHANNEL_NAME","UNIQUE_VISITORS","BUYERS_PER_VISITOR","SALES","BOUNCE_RATE","NEW_VISITOR_PCT","__ROW_KEY__","__ROW_ACTION_AVAILABILITY__"],"filter":[]},"reportURI":"/channelsummary/channelsummary.ftl","reportRequestType":"NORMAL","body":"Please find the attached report/dashboard view.\r\rThank you,\rIBM Digital Analytics\rwww.coremetrics.com","emailFrequency":"O","startDate":20141026,"to":"roofhus@gmail.com","fileName":"30000001_Marketing_Channels","endDate":20141026}

              };
            


            var options2 = {
              url:'http://aus01-phx01.cm.emm.local:8080/analyticswebapp/reportdata.do?method=getReportDataAsync',
              qs: {method:'getReportDataAsync'},
              headers: {Cookie: cookie},
              form: 'data=%7B%22periodA%22%3A%7B%22endDateId%22%3A20141027%2C%22periodType%22%3A%22DAILY%22%2C%22startDateId%22%3A'+date+'%7D%2C%22reportUri%22%3A%22%2Fchannelsummary%2Fchannelsummary%2Eftl%22%2C%22rowCount%22%3A10000%2C%22startRow%22%3A1%2C%22viewID%22%3A%22default%22%7D'
              };

                request.post(options2, function (err, res, body) {
                     var totalMatrix = JSON.parse(body).reportData[0].total;
                   var sendMatrix = parseRawData(JSON.parse(body).reportData);
                 
                    for(i =0; i< totalMatrix.length; i ++){
                      sendMatrix.push(totalMatrix[i]);
                    }
          
                   callback(sendMatrix);

                

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

    console.log("-----MarketingChannels-------");
    console.log(finalMarketingChannels(marketingChannels));
    console.log("-----MarketingChannels-------");
    
    //ols.ols(finalParse(finalMatrixOne),finalMarketingChannels(marketingChannels);

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
