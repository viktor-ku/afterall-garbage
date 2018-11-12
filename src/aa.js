const AfterAll = require('ya-afterall')

const timeout = 1000

// Set this to true to show what happens if an error comes up while gathering resources
const errorVersion = false

AfterAll.afterAll(aa => {
  console.time('app')

  aa.gettingIt()
  setTimeout(() => {
    aa.gotIt({ foo: 'bar' })
  }, timeout)

  aa.gettingIt()
  setTimeout(() => {
    aa.gotIt({ another: { thing: 'to fetch' } })
  }, timeout)

  aa.then(resources => {
    aa.gettingIt()
    setTimeout(() => {
      if (errorVersion) {
        aa.error('error happen')
      } else {
        aa.gotIt({ bar: 'foo' })
      }
    }, timeout)

    aa.then(resources => {
      aa.gettingIt()
      setTimeout(() => {
        aa.gotIt({ done: 'yep' })
      }, timeout)
    })
  })
}, resources => {
  // This is called once all the resources are fetched.   `resources` is an object with all the data fetched above
  console.log(resources)
  console.timeEnd('app')
}, errors => {
  // Error is an array of errors. They can be anything. In this case it's just a string
  console.error(`Sadness ${errors.join(',')}`)
})
