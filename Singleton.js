const Singleton = (function() {
  let initiated

  function init(params) {
    return {
      params
    }
  }


  function getInstance() {
    if (!initiated) {
      initiated = init()
    }

    return initiated
  }

  return {
    getInstance
  }
})()


console.log(Singleton.getInstance())
console.log(Singleton.getInstance())
