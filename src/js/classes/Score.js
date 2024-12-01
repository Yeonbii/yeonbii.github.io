class Score {
    constructor(props) {
        this.font = props.fontSize + 'px' + ' ' + props.fontType;
        this.color = props.color;
        this.position = {
            x: props.position.x,
            y: props.position.y,
        };
        this.currentScore = 0;
        this.lastUpdateTime = Date.now(); // Waktu terakhir skor diperbarui
    }    

    create() {
        board.fillStyle = this.color;
        board.font = this.font;

        let currentScore = this.currentScore.toString().padStart(3, '0');

        const textWidth = board.measureText(currentScore).width;
        let x = this.position.x;

        if (x == "Tengah") {
            x = (canvas.width - textWidth) / 2;
        } else if (x == "Kanan") {
            x = (canvas.width - textWidth) - 10;
        } else if (x == "Kiri") {
            x = 10;
        }

        board.fillText(currentScore, x, this.position.y);
    }

    update() {
        const now = Date.now();
        const elapsed = now - this.lastUpdateTime; // Waktu yang telah berlalu sejak pembaruan terakhir
    
        if (elapsed >= 1000) { // Jika sudah 1 detik (1000 ms)
            this.currentScore += 1;
            this.lastUpdateTime = now;
        }
    }
    

}