const prompt = require('prompt-sync')({ sigint: true });

class Field {
    constructor(field) {
        this.field = field || [];
    }

    print() {
        for (let row of this.field) {
            console.log(row.join(' '));
        }
    }

    generateField(difficulty) {
        // Clear field
        this.field = [];

        switch (difficulty) {
            case 'easy': difficulty = 10;
                break;
            case 'medium': difficulty = 25;
                break;
            case 'hard': difficulty = 50;
                break;
            default: {
                console.log('Invalid difficulty, please select again');
                return false;
            }
        }

        // Generate Field
        const randomNum = Math.round(Math.random() * 10) + 2;
        for (let row = 0; row < randomNum; row++) {
            let row = [];
            for (let column = 0; column < randomNum; column++) {
                row.push('░');
            }
            this.field.push(row);
        }

        // Generate holes
        const numHoles = Math.floor((this.field.length * this.field.length) / 100 * difficulty);
        for (let i = 0; i < numHoles; i++) {
            let randomX = Math.floor(Math.random() * this.field.length);
            let randomY = Math.floor(Math.random() * this.field.length);
            this.field[randomX][randomY] = 'O';
        }

        // Add hat
        const randomXHat = Math.floor(Math.random() * this.field.length);
        const randomYHat = Math.floor(Math.random() * this.field.length);
        this.field[randomXHat][randomYHat] = '^';

        // Add player
        this.field[0][0] = '*';
        if (this.field[randomXHat][randomYHat] === '*') {
            this.field[randomXHat + 1][randomYHat + 1] === '*';
        }
       return;
    }

    play() {
        let playerX, playerY = 0;
        let win = false;

        // Choose difficulty
        let valid = false;
        while (valid === false) {
            let difficulty = prompt('Please choose a difficulty. Easy, Medium, or Hard... ').toLowerCase().trim();
            // Generate field
            valid = this.generateField(difficulty);
        }

        // Play game
        while (win === false) {

            // Get player location
            playerX = this.getLocation(this.field)[0];
            playerY = this.getLocation(this.field)[1];

            // Print field to user
            console.log('\n');
            this.print();
            console.log('\n');
            
            let playerDirection = prompt('Which direction would you like to go? Up, Down, Left or Right? ').trim().toLowerCase();
            switch (playerDirection) {
                case 'up': {
                    win = Field.movePlayer(playerX, playerY, this.field, -1, 0);
                }
                    break;
                case 'down': {
                    win = Field.movePlayer(playerX, playerY, this.field, 1, 0);
                }
                    break;
                case 'right': {
                    win = Field.movePlayer(playerX, playerY, this.field, 0, +1);
                }
                    break;
                case 'left': {
                    win = Field.movePlayer(playerX, playerY, this.field, 0, -1);
                }
                    break;
                case 'exit' : {
                    return;
                }
                default : {
                    console.log('\nInvalid direction, please choose again!\n');
                    win = false;
                }
            }
        }

        if (win === true) {
            console.log('\n');
            this.print();
            console.log('\nWow, you won! My hero! :) :) :)\n');
            return;
        }
    }

    getLocation(field) {
        const rowNum = field
            .map(array => {
                return array.includes('*');
            }).indexOf(true);

        const cellNum = field[rowNum].indexOf('*');

        return [rowNum, cellNum];
    }

    static movePlayer(rowNum, cellNum, field, xDirection, yDirection) {
        let potentialX = rowNum + xDirection;
        let potentialY = cellNum + yDirection;

        if (potentialX === -1 || potentialY === -1 || field[potentialX] === undefined || field[potentialX][potentialY] === undefined) {
            console.log('\nYou left the playing area, GAME OVER SUCKER!!!\n');
            return;
        }
        if (field[potentialX][potentialY] === 'O') {
            console.log('\nYou fell in a hole! Game over, ya big dummy!\n');
            return;
        }
        if (field[potentialX][potentialY] === '░') {
            field[potentialX][potentialY] = '*';
            field[rowNum][cellNum] = '░';
            this.field = field;
            return false;
        }
        if (field[potentialX][potentialY] === '^') {
            field[potentialX][potentialY] = '*^';
            field[rowNum][cellNum] = '░';
            this.field = field;

            return true;
        }
    }
}

const myField = new Field();

myField.play();