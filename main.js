const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this.field = field;
    }
    print() {
        for (let row of this.field){
            console.log(row.join(' '));
        }
      }
}

const myField = new Field([
      ['*', '░', 'O'],
      ['░', 'O', '░'],
      ['░', '^', '░'],
    ]);

myField.print();
const name = prompt('What is your name ');
console.log(name)