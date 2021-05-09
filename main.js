const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
    constructor(field) {
        this.field = field || [];
    }
    print() {
        for (let row of this.field){
          console.log(row.join(' '));
        }
      }
    generateField(height, width) {
        let randomNum = Math.round(Math.random() * 10) + 2;
        for (let row = 0; row < randomNum ; row ++){
            let row = [];
            for (let column = 0; column < randomNum; column ++){
                row.push(fieldCharacter);
            }
            this.field.push(row);
        }
    }

}

const myField = new Field();

myField.generateField();

myField.print();