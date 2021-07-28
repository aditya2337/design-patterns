// Object literal

const myModule = {
  myProperty: "someValue",
  myConfig: {
    useCaching: true,
    language: "en",
  },
  setNewConfig: function (newConfig) {
    if (typeof newConfig === "object") {
      this.myConfig = {
        ...this.myConfig,
        ...newConfig,
      };
      console.log(this.myConfig.language);
    }
  },
  getCachingStatus: function () {
    console.log(
      "Caching is:" + this.myConfig.useCaching ? "enabled" : "disabled",
    );
  },
};

myModule.getCachingStatus();

// Module pattern

const testModule = (function () {
  let counter = 0;

  return {
    incrementCounter: () => {
      return counter++;
    },
    resetCounter: () => {
      console.log("counter value prior to reset:" + counter);
      counter = 0;
    },
  };
})();

testModule.incrementCounter()
testModule.resetCounter()
