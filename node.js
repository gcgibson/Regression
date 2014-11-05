



function createNode(name){
	var node = {
	name:name,
	probabilityMatrix:null
	}
	return node;
}

function setProbabilityMatrix(node,mat){
	node.probabilityMatrix = mat;
	return node;

}

module.exports.createNode = createNode;
module.exports.setProbabilityMatrix = setProbabilityMatrix;