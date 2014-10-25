var x =angular.module("MyDopeAssApp",[]);

x.controller("hello", ["$scope", "$http", function($scope, $http) {
		$http.get('http://localhost:5000/data.json').
        		success(function(data) {
        			$http.get('http://localhost:5000/marketingChannels.json').
        		success(function(channels) {


            		$scope.greeting = data;
            		var keys = Object.keys(data);
            		$scope.length = keys.length;
            		$scope.channels =channels;

            		//build equation display
            		var prefix = "Sales=";
            	var equationString= prefix.concat(recursiveConcat("",channels, data, 0, keys.length));

            		$scope.equationString =equationString;
        	       







            		});
        

        	});
        


        }
  ]);
	


function recursiveConcat(x,channels,data,counter, length){
    if(counter ==length){
        return x;
    }
    else{
        var channel = channels[counter];
        var coefficient = data[counter].toString().concat("    *     ");
        var appendString = coefficient.concat(channel).concat("      +      ");
       // console.log(appendString);
        return appendString.concat(recursiveConcat(x,channels,data,counter+1,length));
    }
}

