function Car() {
}
Car.prototype.drive = () => null
Car.prototype.breakDown = () => null

function Truck() {}

function VehicleFactory() {}
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.getVehicle = function (options) {
  return new this.vehicleClass(options);
};

const carFactory = new VehicleFactory();

const car = carFactory.getVehicle({ color: "yellow", turbo: true });

console.log(car instanceof Car);

// approach #1: Modify a VehicleFactory instance to use the Truck class
carFactory.vehicleClass = Truck;

var mover = carFactory.getVehicle({ enclosedCargo: true, length: 26 });
console.log(mover instanceof Truck);

// approach #2: Subclass VehicleFactory to create a factory class that // builds Trucks
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var bigfoot = truckFactory.getVehicle({ monster: true, cylinders: 12 });
console.log(bigfoot instanceof Truck);

// Abstract Factory
const AbstractVehicleFactory = (function() {
  const types = {}

  return {
    getVehicle: function(type, customizations) {
      const Vehicle = types[type]

      if (Vehicle) {
        return new Vehicle(customizations)
      }
    },
    registerVehicle: function(type, Vehicle) {
      const proto = Vehicle.prototype

      // Only register vehicles which meet the contract

      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle
      } else {
        console.error(`${type} not registered`)
      }
      return AbstractVehicleFactory
    }
  }
})()

AbstractVehicleFactory.registerVehicle('car', Car)
// NOT registered
AbstractVehicleFactory.registerVehicle('truck', Truck)
