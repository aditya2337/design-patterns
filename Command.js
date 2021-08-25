// A normal pattern
const CarManager = {
  requestInfo: function(model, id) {
    return `The information is this ${model} with this ${id}`
  },

  buyVehicle: function( model, id ){
    return `You have successfully purchased Item ${id}, a ${model}`
  }
}

// Here it can be directly accessed as:
CarManager.requestInfo('Nexon', 'XM')

// Actual wa¥ for the Command pattern:

CarManager.execute = function(name, ...args) {
  return CarManager[name] && CarManager[name].apply(CarManager, ...args)
}

CarManager.execute("buyVehicle", "Ford Escort", "453543")
