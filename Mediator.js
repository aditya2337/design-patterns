const mediator = (function() {
  const channels = {}

  const subscribe = function(channel, fn) {
    if (!channels[channel]) {
      channels[channel] = []
    }

    channels[channel].push({ context: this, callback: fn })
    return this
  }

  const publish = function(channel, ...args) {
    if (!channels[channel]) {
      return false
    }

    
    channels[channel].forEach(subscriber => {
      subscriber.callback.apply(subscriber.context, args)
    })

    return this
  }

  return {
    publish,
    subscribe,
    installTo: (obj) => {
      obj.subscribe = subscribe
      obj.publish = publish
    }
  }
})() 

const person = "GV"

mediator.subscribe('nameChange', (args) => {
  console.log(args)
})

mediator.publish('nameChange', 'Aditya')
