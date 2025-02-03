class Player {
    constructor(props) {
        this.width = props.width;
        this.height = props.height;
        this.color = props.color;
        this.position = {
            x: props.position.x,
            y: props.position.y
        };
        this.heightJump = props.heightJump;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.gravity = 0.5;
        this.play = props.play;       

        console.log('player siap dibuat', props);
    }
    

    // kinematic eequation physic
    // heightjump = vi^2 / (2 * gravity)
    // vi = sqrt(2 * gravity * heightjump)

    movement(direction) {
        // console.log({direction});
        if (direction == "ArrowUp" || direction == "Space" || direction == "Touch") {
            console.log('loncat');
            this.velocity.y = -Math.sqrt(2 * this.gravity * this.heightJump);
            this.play = true;
        }
    }

    update() {
        const ground = canvas.height - this.height;

        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;

        if(player.position.y > ground) {
            this.position.y = ground;
            this.velocity.y = 0;
            // this.play = false;
        } else if (player.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            // this.play = false;
        }
    }

    create() {
        board.fillStyle = this.color;
        board.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}