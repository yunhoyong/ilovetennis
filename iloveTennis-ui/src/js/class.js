'use strict';

class Person {
    
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    speak(){
        console.log(`${this.name} : hello`);
    }
}

const hoyong = new Person('YunHoyong',34)

hoyong.speak();