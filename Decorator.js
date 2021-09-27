function Vehicle(vehicleType) {
  this.vehicleType = vehicleType || 'car'
  this.model = 'default'
  this.licence = '00000-00'
}

var testInstance = new Vehicle('Car')
console.log(testInstance)

var truck = new Vehicle('truck')

// Decorating here
truck.setModel = function(modelName) {
  this.model = modelName
}

truck.setColor = function(color) {
  this.color = color
}

truck.setModel('CAT')
truck.setColor('Blue')
console.log(truck)

var secondInstance = new Vehicle('car')
console.log(secondInstance);


// MacBook example of the decorators

function MacBook() {
  this.cost = () => 997
  this.screenSize = () => 13.3
}

// Decorator 1
function Memory(macbook) {
  const v = macbook.cost()
  macbook.cost = () => v + 75
}

// Decorator 2
function Engraving(macbook) {
  const v = macbook.cost()
  macbook.cost = () => v + 200
}

// Decorator 3
function Insurance(macbook) {
  const v = macbook.cost()
  macbook.cost = () => v + 250
}

var mb = new MacBook()
Memory(mb)
Engraving(mb)
Insurance(mb)

console.log(mb.cost())
