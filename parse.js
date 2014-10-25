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

var http = require('http');
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




 var cookieString= 'JSESSIONID=A2730F9352194A3FAF2D41E8B08274F9; app_attrs=30000001-_-SoftServe-_-false-_-en_US-_-US; cmTPSet=Y; token="<Response xmlns=\"urn:oasis:names:tc:SAML:1.0:protocol\" xmlns:saml=\"urn:oasis:names:tc:SAML:1.0:assertion\" xmlns:samlp=\"urn:oasis:names:tc:SAML:1.0:protocol\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" IssueInstant=\"2014-10-24T17:29:56.101Z\" MajorVersion=\"1\" MinorVersion=\"1\" ResponseID=\"_b52b7163acd056789b5d8d852cb7a71e\"><Status><StatusCode Value=\"samlp:Success\"></StatusCode></Status><Assertion xmlns=\"urn:oasis:names:tc:SAML:1.0:assertion\" AssertionID=\"_6ee7c3aed49d8c3effd242f43bd8ef65\" IssueInstant=\"2014-10-24T17:29:56.139Z\" Issuer=\"phoenixanalytics\" MajorVersion=\"1\" MinorVersion=\"2\"><AuthenticationStatement AuthenticationInstant=\"2014-10-24T17:29:56.101Z\" AuthenticationMethod=\"urn:oasis:names:tc:SAML:1.0:am:password\"><Subject><NameIdentifier Format=\"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified\">MzAwMDAwMDFTb2Z0U2VydmU</NameIdentifier></Subject></AuthenticationStatement><AttributeStatement><Subject><NameIdentifier Format=\"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified\">MzAwMDAwMDFTb2Z0U2VydmU</NameIdentifier></Subject><Attribute AttributeName=\"secret\" AttributeNamespace=\"jbosssso:secret\"><AttributeValue>0d4223b72cc37bce29162cb327eeb9f61b3fd5279c35e8f4959ccafeb4fd994b46039e3065698f7aad67b7cdb88afdaacaa253462a6352af20c0fca85365e3499ad8aa92cbbb5e75e5701c97de26106301df9f827f5d8f4bc79a8ef72549f4e2ca65652ac6b08eb5e8c3e0b56c82fb170604deda609c237db0e4884ad0625f963c476bf663ed354e64dd7a83afef7a9fffd60e98c95f92e32a41b452f81fce18d68b4fc506648aaacbb026a30a28432779cc8cd4b191151c9b0dd83c5c4b8f60a8d5e56c65eb4a52ee2be01522b826ea7d3e96f27361c7d29f54bf28f2d04e678a80b2adc7f88fdd2fd536da57c8d8e394b66ce1a15be2b8a961093c77c1f173dc3faf9fee110cbe53dd0ca8cb417d3473e0f5310c20efc2c53f3f51e93a80419dd0227394a8d7cc37a9021f7bbd59594aacc5338c13a58ce3c998e0d5ef38d80245ff9a79963acc920f63175cb7604aee24d56e759631d6fa8951b84dc7006b47e97244f087726f6145c26f64aca66cdca6d0e516d787e2694c09f82114bb1e08ea7a25364b5a436cfe4f06b72bf353adb896823887f80867d450ca237798d58fba4f352494fa430ca62d85d8ac2d665f0305cfb4c98ca7c901fce9b772c9dbafba66ea477bb6ec02e64d497e30ad70fcb6b21c4226de005f1f16416397f86b33697f18524f0715d53014fe4678440c1795aa8acdfdc03808eaaaf3c9697f42</AttributeValue></Attribute></AttributeStatement></Assertion></Response>';
var options = {
  method: 'GET',
   url: 'https://aus01-welcome.cm.emm.local/analyticswebapp/reportdata.do/30000001_Marketing%20Channels_Default%20View_20141023_20141023.csv?method=downloadReportData&format=csv&protocol=https:',
   headers: {Cookie: cookieString},
};
console.log(options);
 require('request').get(options, function(err, res, body) {
         if(err){
          console.log(err);
         }
         else{
            console.log(res);
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

