const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const products = [{name: 'productName1', type: 'variable'}, {name: 'productName2', type: 'variable'}, {name: 'productName3', type: 'variable'}]
const variations = [{name: 'variation1', type: 'variation'},{name: 'variation1', type:'variation'}]

const variationsFunction = (name) => {
  return [{name: name, type: 'variation'},{name: name, type:'variation'}]
}

// Concat products & variations together with variations in beetween each products
const result = products.reduce((acc, product) => acc.concat(product, variationsFunction(product.name)), [])

console.log('Products & Variations concatened')
console.log(result)
let curProductName = ''
for (let i = 0; i < result.length; i++) {
  if (result[i].type === 'variable') {
    curProductName = result[i].name
  } else {
    result[i].name = curProductName
  }
}

console.log('concat transformed : ')
console.log(result)


// const arr = [
//   { name: 'productName1', type: 'variable' },
//   { name: 'variation1', type: 'variation' },
//   { name: 'variation1', type: 'variation' },
//   { name: 'productName2', type: 'variable' },
//   { name: 'variation1', type: 'variation' },
//   { name: 'variation1', type: 'variation' },
//   { name: 'productName3', type: 'variable' },
//   { name: 'variation1', type: 'variation' },
//   { name: 'variation1', type: 'variation' }
// ]

// console.log('Same arr but pasted in')
// console.log(arr)
// let currentProductName = ''
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i].type === 'variable') {
//     currentProductName = arr[i].name
//   } else {
//     arr[i].name = currentProductName
//   }
// }

// console.log('pasted in tranformed is perfect WTF', arr)
