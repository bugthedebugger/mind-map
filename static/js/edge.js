class Edge{
    constructor(x1, y1, x2, y2, parent, child){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.parent = parent;
        this.child = child;
    }

    show(){
        line(this.x1, this.y1, this.x2, this.y2);
    }

    dispose(node){
        if( this.parent == node || this.child == node )
            return true;
        else
            return false;
    }
}