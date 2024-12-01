class Notification {
    constructor(props) {
        this.text = props.text;
        this.font = props.fontSize + 'px' + ' ' + props.fontType;
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
        let x = this.position.x;

        if (x == "Tengah") {
            x = (canvas.width - textWidth) / 2;
        } else if (x == "Kanan") {
            x = (canvas.width - textWidth) - 10;
        } else if (x == "Kiri") {
            x = 10;
        }

        board.fillText(this.text, x, this.position.y); 
    }

}