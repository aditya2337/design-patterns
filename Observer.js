const pubsub = (function () {
  const topics = {}
  let subUid = -1

  return {
    publish: function(topic, args) {
      if (!topics[topic]) {
        return false
      }
  
      topics[topic].forEach((subscriber) => subscriber.func(args))
  
      return this
    },
    subscribe: function(topic, func) {
      const token = (++subUid).toString()
  
      const newSubscriber = {
        token,
        func
      }
  
      if (!topics[topic]) {
        topics[topic] = [newSubscriber]
      } else {
        topics[topic].push(newSubscriber)
      }
  
      return token
    },
    unsubscribe: function (token) {
      for (const topic in topics) {
        if (topics[topic] && topics[topic].length) {
          topics[topic] = topics[topic].filter(subscriber => subscriber.token != token)
        }
      }

      return this
    }
  }
})()

function testHandler(args) {
  console.log(args)
}

const subscriber = pubsub.subscribe('hello', testHandler)

pubsub.publish('hello', 'world')

pubsub.unsubscribe(subscriber)

pubsub.publish('hello', 'world')
