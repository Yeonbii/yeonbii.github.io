class Notification {
    constructor(props) {
        this.text = props.text;
        this.font = props.font;
        this.color = props.color;
        this.position = {
            x: props.position.x,
            y: props.position.y,
        };

        console.log('notofication siap dibuat', props);
    }

    create() {
        board.fillStyle = this.color;
        board.font = this.font;
        
        const textWidth = board.measureText(this.text).width;
        let x = 0;
        if (this.position.x == "Tengah") {
            x = (canvas.width - textWidth) / 2;
        } else if (this.position.x == "Kanan") {
            x = (canvas.width - textWidth);
        }

        board.fillText(this.text, x, this.position.y); 
    }

}