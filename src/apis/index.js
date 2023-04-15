const files = import.meta.globEager('./modules/**/*.js')
const apis = {}
const nameRE = /\/*(\w+)\.js$/
Object.keys(files).forEach((key) => {
  const item = files[key]
  Object.keys(item).forEach((apiName) => {
    const [, name] = key.match(nameRE)
    if (apiName === 'default') {
        apis[name] = item[apiName]
    } else {
      if (!apis[name]) {
        apis[name] = {}
      }
      apis[name][apiName] = item[apiName]
    }
  })
})

export default apis
