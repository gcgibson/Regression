var math = require('mathjs');
var fs    = require("fs");
var csv = require('fast-csv');
var ols = require('./ols.js');
var _ = require('underscore');
var request = require('request');

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

form_data = {
        clientid: 30000001,
        j_username: 'SoftServe',
        j_password: 'pw41t34m',
    };

    var options = {
        url: 'http://10.111.31.27:8080/analyticswebapp/jsp/login.jsp',
        form: form_data
    };

    request.post(options, function (err, res, body) {
        if (err) {
            callbackFunction(err);
        } else {
          //console.log(res.headers['set-cookie']);

            cookie= res.headers['set-cookie'];
            console.log(res.headers);
         my_data = {data:{"reportPeriodType":1,"reportName":"30000001_Marketing Channels","attachmentType":"EXCEL","subject":"30000001_Marketing Channels - Daily","currentView":{"keyColumns":[{"datatype":"TEXT","columnId":"CHANNEL_NAME","isVisible":true,"compareable":true,"title":"Marketing Channel","avgChars":24,"filterable":true,"isKey":true,"isMain":false,"fieldPos":"0","trendable":true,"isSortable":true,"format":"NONE"}],"metrics":[{"datatype":"INTEGER","axisFormatter":{"isAbbrevSignToRight":true,"decimalSeparatorTo":".","thousandsSeparatorTo":",","error":null,"precision":1},"columnId":"UNIQUE_VISITORS","showCdrSummedMsg":true,"isVisible":true,"format":"INTEGER","comparisonSpecifier":"A","compareable":true,"mx_internal_uid":"EC45F419-B2A8-68F6-C5A0-536259C27A98","noSameSessionDisplay":true,"trendable":true,"filterable":true,"label":"Unique Visitors","isKey":false,"categories":["Visitor Metrics","Popular Metrics"],"formatter":{"actualFormatter":{"decimalSeparatorTo":".","thousandsSeparatorTo":",","error":null,"precision":0},"error":null},"isMain":false,"title":"Unique Visitors","fieldPos":"1","maxVal":4034,"isSortable":true,"id":"UNIQUE_VISITORS"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"BUYERS_PER_VISITOR","isVisible":true,"format":"PERCENT","comparisonSpecifier":"A","compareable":true,"noSameSessionDisplay":true,"trendable":true,"filterable":true,"label":"Buyer / Visitor","isKey":false,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"isMain":false,"title":"Buyer / Visitor","fieldPos":"2","maxVal":0.0235,"isSortable":true,"categories":["Commerce Metrics","Popular Metrics"],"id":"BUYERS_PER_VISITOR"},{"datatype":"DECIMAL","axisFormatter":{"alignSymbol":-1,"abbrevSpacer":"","error":null,"decimalSeparatorTo":".","currencySymbol":"$","thousandsSeparatorTo":",","abbrevPlacement":4,"precision":2},"columnId":"SALES","isVisible":true,"format":"CURRENCY","comparisonSpecifier":"A","compareable":true,"noSameSessionDisplay":true,"trendable":true,"filterable":true,"label":"Sales","isKey":false,"categories":["Commerce Metrics","Popular Metrics"],"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"alignSymbol":-1,"currencySymbol":"$","thousandsSeparatorTo":","},"error":null},"isMain":false,"title":"Sales","fieldPos":"3","maxVal":120632.23,"isSortable":true,"id":"SALES"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"BOUNCE_RATE","isVisible":true,"title":"Bounce Rate","comparisonSpecifier":"A","compareable":true,"noSameSessionDisplay":true,"trendable":true,"filterable":true,"label":"Bounce Rate","isKey":false,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"isMain":false,"lowValuesGood":true,"fieldPos":"4","maxVal":0.595,"isSortable":true,"categories":["Activity Metrics","Popular Metrics"],"format":"PERCENT","id":"BOUNCE_RATE"},{"datatype":"DECIMAL","axisFormatter":{"decimalSeparatorTo":".","abbrevSpacer":"","percentSign":"%","precision":0,"isPercentSignToRight":true,"thousandsSeparatorTo":",","abbrevPlacement":4,"error":null},"columnId":"NEW_VISITOR_PCT","isVisible":true,"format":"PERCENT","comparisonSpecifier":"A","compareable":true,"noSameSessionDisplay":true,"trendable":true,"filterable":true,"label":"New Visitor %","isKey":false,"noCumulativeTrend":true,"formatter":{"actualFormatter":{"decimalSeparatorTo":".","error":null,"precision":2,"isPercentSignToRight":true,"thousandsSeparatorTo":",","percentSign":"%"},"error":null},"isMain":false,"title":"New Visitor %","fieldPos":"5","maxVal":0.8239,"isSortable":true,"categories":["Visitor Metrics","Acquisition Metrics"],"id":"NEW_VISITOR_PCT"},{"fieldPos":"6","columnId":"__ROW_KEY__"},{"fieldPos":"7","columnId":"__ROW_ACTION_AVAILABILITY__"}],"isAutomatic":true,"compares":[{"calculations":["B"],"columnId":"UNIQUE_VISITORS"},{"calculations":["B"],"columnId":"BUYERS_PER_VISITOR"},{"calculations":["B"],"columnId":"SALES"},{"calculations":["B"],"columnId":"BOUNCE_RATE"},{"calculations":["B"],"columnId":"NEW_VISITOR_PCT"},{"calculations":["B"],"columnId":"__ROW_KEY__"},{"calculations":["B"],"columnId":"__ROW_ACTION_AVAILABILITY__"}],"type":"FLAT","sorts":[{"comparisonSpecifier":"A","columnId":"UNIQUE_VISITORS","sortDirection":"DESC"}],"customAttributes":{"origViewId":"default","cboMetrics1":"UNIQUE_VISITORS","chartsAreaHeight":"50","cboMetrics3":"UNIQUE_VISITORS"},"viewName":"Default View","visibleColumns":["CHANNEL_NAME","UNIQUE_VISITORS","BUYERS_PER_VISITOR","SALES","BOUNCE_RATE","NEW_VISITOR_PCT","__ROW_KEY__","__ROW_ACTION_AVAILABILITY__"],"filter":[]},"reportURI":"/channelsummary/channelsummary.ftl","reportRequestType":"NORMAL","body":"Please find the attached report/dashboard view.\r\rThank you,\rIBM Digital Analytics\rwww.coremetrics.com","emailFrequency":"O","startDate":20141026,"to":"roofhus@mgail.com\r","fileName":"30000001_Marketing_Channels","endDate":20141026}};
      var my_data_encoded = 'data=%7B%22reportUri%22%3A%22%2Fchannelsummary%2Fchannelsummary.ftl%22%2C%22reportTitle%22%3A%22Marketing%20Channels%22%2C%22viewID%22%3A%2214007139%22%2C%22periodA%22%3A%7B%22endDateId%22%3A20141026%2C%22periodType%22%3A%22DAILY%22%2C%22startDateId%22%3A20141026%7D%2C%22startRow%22%3A1%2C%22rowCount%22%3A10000%2C%22currentView%22%3A%7B%22isAutomatic%22%3Atrue%2C%22compares%22%3A%5B%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22UNIQUE_VISITORS%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22BUYERS_PER_VISITOR%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22SALES%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22BOUNCE_RATE%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22NEW_VISITOR_PCT%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22__ROW_KEY__%22%7D%2C%7B%22calculations%22%3A%5B%22B%22%5D%2C%22columnId%22%3A%22__ROW_ACTION_AVAILABILITY__%22%7D%5D%2C%22type%22%3A%22FLAT%22%2C%22sorts%22%3A%5B%7B%22comparisonSpecifier%22%3A%22A%22%2C%22columnId%22%3A%22UNIQUE_VISITORS%22%2C%22sortDirection%22%3A%22DESC%22%7D%5D%2C%22customAttributes%22%3A%7B%22origViewId%22%3A%22default%22%2C%22cboMetrics1%22%3A%22UNIQUE_VISITORS%22%2C%22chartsAreaHeight%22%3A%2250%22%2C%22cboMetrics3%22%3A%22UNIQUE_VISITORS%22%7D%2C%22viewName%22%3A%22Default%20View%22%2C%22visibleColumns%22%3A%5B%22CHANNEL_NAME%22%2C%22UNIQUE_VISITORS%22%2C%22BUYERS_PER_VISITOR%22%2C%22SALES%22%2C%22BOUNCE_RATE%22%2C%22NEW_VISITOR_PCT%22%2C%22__ROW_KEY__%22%2C%22__ROW_ACTION_AVAILABILITY__%22%5D%2C%22filter%22%3A%5B%5D%7D%7D';            
        var options2 = { headers: {Cookie: 'JSESSIONID=32F1FF65A08DECA4F9FD4320B74492BA; app_attrs=30000001-_-SoftServe-_-false-_-en_US-_-US; cmTPSet=Y'
                            , },
                url :'http://10.111.31.27:8080/analyticswebapp/reportdata.do/30000001_Marketing%20Channels_Default%20View_20141026_20141026.csv?method=downloadReportData&format=csv&protocol=http:',
                form: my_data_encoded,
                   qs: {method: 'downloadReportData',
                        format: 'csv',
                        protocol: 'http:'}

            };
            request.post(options2,function(err,res,body ){

                    var options3 = {
                          headers: {Cookie: 'JSESSIONID=32F1FF65A08DECA4F9FD4320B74492BA; app_attrs=30000001-_-SoftServe-_-false-_-en_US-_-US; cmTPSet=Y'}
                          , url: 'http://10.111.31.27:8080/analyticswebapp/reportdata.do/30000001_Marketing%20Channels_Default%20View_20141026_20141026.csv?method=checkDownloadAsyncResult&resultId=1490154574298'
                          , qs: {method : 'checkDownloadAsyncResult',
                                resultId: 1490154574298134508,
                                protocol: 'http:'}
                    };

                    request.get(options3,function(err,res,body){
                          console.log(body);
                    });
            });



        }
    });


function finishedData(ver){

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

