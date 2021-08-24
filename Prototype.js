const someCar = {
  drive: () => {},
  name: "Mazda",
};

const newCar = Object.create(someCar, { name: { value: "Nexon" } });

console.log(someCar.name, newCar.name);



// Another pattern for prototype
const vehiclePrototype = {
  init: function(carModel) {
    this.model = carModel
  },
  getModel: function() {
    console.log(`The model of this vehicle is ${this.model}`)
  }
}

function vehicle(model) {
  function F() {}
  F.prototype = vehiclePrototype

  var f = new F()

  f.init(model)

  return f
}

const car = vehicle('Nexon')
car.getModel()
