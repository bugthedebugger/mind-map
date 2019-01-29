class MindNode {
    constructor(startX, startY, textWidth, label, color, parent=null){
        this.startX = startX;
        this.startY = startY;
        this.endX = textWidth;
        this.endY = 40;
        this.label = label;
        this.width = this.startX + this.endX;
        this.height = this.startY + this.endY; 
        this.parent = parent;
        this.tempColor = null;
        this.color = color;
    }

    getPosition(){
        return {
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY
        }
    }

    mouseClickEvent(){
        if( mouseX >= this.startX && mouseX <= this.width && 
            mouseY >= this.startY && mouseY <= this.height)
            return true;
        else
            return false;
    }

    show(){
        fill(this.color);
        rect(this.startX, this.startY, this.endX, this.endY, 20);
        textSize(18);
        textAlign(CENTER, CENTER);
        fill("black");
        text(this.label, this.startX + this.endX/2, this.startY + 20);
    }

    isChildOf(parent){
        if( this.parent == parent )
            return true;
        else
            return false;
    }
}