function Car(make, color) {
  this.make = make
  this.color = color

  this.getMake = function getMake() {
    return this.make
  }
}

const maruti = new Car('Maruti', 'white')


console.log(maruti.getMake())
