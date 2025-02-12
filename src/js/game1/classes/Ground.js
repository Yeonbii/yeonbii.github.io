class Ground {
    constructor(image, width, height, speed) {
        this.image = new Image();
        this.image.src = image;
        this.position = {
            x: 0,
            y: 0
        };
        this.height = height;

        this.image.onload = () => {
            this.width = this.image.naturalWidth;
            if (this.width < width) {
                this.width = width;
            }
        };

        this.speed = speed;
        console.log('ground siap dibuat');
    }

    create() {
        board.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        board.drawImage(this.image, this.position.x + this.width, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x -= this.speed;

        // reset gambar
        if (this.position.x <= -this.width) {
            this.position.x = 0;
        }
    }
}
