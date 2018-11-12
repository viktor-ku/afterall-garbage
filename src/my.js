const errorVersion = false
const timeout = 1000

const fooTask = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ foo: 'bar' }), timeout)
})

const anotherTask = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ another: { thing: 'to fetch' } }), timeout)
})

const barTask = res => new Promise((resolve, reject) => {
  if (errorVersion) {
    reject(new Error('error happened'))
  } else {
    setTimeout(() => resolve({ bar: 'foo' }), timeout)
  }
})

const doneTask = res => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ done: 'yep' }), timeout)
})

async function main () {
  console.time('main')

  try {
    // Launch first two tasks at the same time
    // Since they have no dependencies
    const [{ foo }, { another }] = await Promise.all([ fooTask(), anotherTask() ])

    // Since bar task should be run after first two we wait
    const { bar } = await barTask({ foo, another })

    // Done should be run after bar
    const { done } = await doneTask({ foo, another, bar })

    console.log({ foo, another, bar, done })
    console.timeEnd('main')
  } catch (e) {
    console.error(e)
  }
}

main()
