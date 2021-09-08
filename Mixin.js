const Car = function (settings) {
  this.model = settings.model || "no model provided";
  this.colour = settings.colour || "no colour provided";
};

const Mixin = function () {};

Mixin.prototype = {
  driveForward: function () {
    console.log("drive forward");
  },
  driveBackward: function () {
    console.log("drive backward");
  },
};

// Augmentation
function augment({ receivingClass, givingClass, mixinMethods }) {
  // Only provide certain methods
  if (mixinMethods) {
    mixinMethods.forEach((method, idx) => {
      receivingClass.prototype[method] = givingClass.prototype[method];
    });
  }
  // provide all methods
  else {
    for (const methodName in givingClass.prototype) {
      if (!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] =
          givingClass.prototype[methodName];
      }
    }
  }
}

augment({
  receivingClass: Car,
  givingClass: Mixin,
  mixinMethods: ["driveForward", "driveBackward"],
});

const vehicle = new Car({ model: "TATA Nexon", colour: "white" });

vehicle.driveForward();
vehicle.driveBackward();
