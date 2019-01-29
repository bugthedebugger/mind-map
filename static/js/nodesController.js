class NodesController{
    constructor(nodes){
        this.nodes = nodes;
        this.root = nodes[0];
        this.offset = 20;
        this.click = false;
        this.newNodeFlag = false;
        this.edges = [];
    }

    addNodes(newNode){
        this.nodes.push(newNode);
    }

    addEdge(newEdge){
        this.edges.push(newEdge);
    }

    show(){
        for(var i=0; i<this.edges.length; i++){
            this.edges[i].show();
        }

        for(var i=0; i<this.nodes.length; i++){
            this.nodes[i].show();
        }
    }

    mouseClicked(label, labelFocus){
        
        // console.log(this.click);
        if( this.nodes.length == 0 )
        {
            let rootNode = new MindNode(
                                mouseX - (textWidth(label) / 2),
                                mouseY - (textWidth(label) / 2), 
                                textWidth(label) + 30,
                                label, 
                                "#ff7675");
            this.addNodes(rootNode);
            labelFocus.focus();
        }
        else
        {
            if (this.click && this.newNodeFlag){
                let newNode = new MindNode(mouseX - (this.tempNode.endX / 2),
                                    mouseY - (this.tempNode.endY / 2), 
                                    textWidth(label) + 30,
                                    label,
                                    255,
                                    this.tempNode);
                let newEdge = new Edge(mouseX,
                                    mouseY,
                                    this.tempNode.startX + this.tempNode.endX/2,
                                    this.tempNode.startY + this.tempNode.endY/2,
                                    this.tempNode,
                                    newNode);
                this.addEdge(newEdge);
                this.addNodes(newNode);
                this.click = false;
                this.newNodeFlag = false;
                this.tempNode.color = this.tempNode.tempColor;
                labelFocus.focus();
            }
            else {
                for( var i=0; i<this.nodes.length; i++ ){
                    if( this.nodes[i].mouseClickEvent()){
                        console.log("hit!");
                        this.tempNode = this.nodes[i];
                        if( this.newNodeFlag == false )
                        {
                            this.click = true;
                            this.newNodeFlag = true;
                            this.nodes[i].tempColor = this.nodes[i].color;
                            this.nodes[i].color = "#d63031";
                            console.log("inside newnode false");
                        }
                    }
                }
            }
        }     

    }

    mouseDoubleClicked(){
        let parentNode;
        for( var i=0; i<this.nodes.length; i++ ){
            if( this.nodes[i].mouseClickEvent() ){
                parentNode = this.nodes[i];
                break;
            }
        }
        for( var i=0; i<this.nodes.length; i++ ){
            // if(  )
        }
    }

    getNodes(){
        return this.nodes;
    }

    getEdges(){
        return this.edges;
    }

    getMindMap(){
        let mindNode = JSON.stringify({
            nodes: this.getNodes(),
            edges: this.getEdges()
        });

        let textFile = null,
        makeTextFile = function (text) {
            let data = new Blob([text], {type: 'text/plain'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };

        return makeTextFile(mindNode);
    }

    importMap(mapData){
        // FOR NODES
        let inNodes = mapData.nodes;
        let inEdges = mapData.edges;

        for(var i=0; i<inNodes.length; i++){
            let tempNode = new MindNode(
                inNodes[i].startX,
                inNodes[i].startY,
                inNodes[i].endX,
                inNodes[i].label,
                inNodes[i].color,
                inNodes[i].parent
            );
            this.addNodes(tempNode);
            console.log(tempNode);
        }

        for(var i=0; i<inEdges.length; i++){
            let tempEdge = new Edge(
                inEdges[i].x1,
                inEdges[i].y1,
                inEdges[i].x2,
                inEdges[i].y2,
                null,
                null
            );
            this.addEdge(tempEdge);
        }

    }

}