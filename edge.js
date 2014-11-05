

function createEdge(node1,node2){
	var edge = {
		from:node1,
		to:node2
	};
	return edge;
}

module.exports.createEdge = createEdge;