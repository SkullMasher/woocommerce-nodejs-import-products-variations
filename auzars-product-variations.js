const fs = require('fs')
const papa = require('papaparse')

const getProducts = new Promise((resolve) => {
  const file = 'auzars-product-variations-test.csv'
  const arr = []
  const readStream = fs.createReadStream(`${__dirname}/${file}`, 'utf8')
  const csvStream = readStream.pipe(papa.parse(papa.NODE_STREAM_INPUT, {header: true}))

  csvStream.on('data', (res) => {
    arr.push(res)
  })

  csvStream.on('end', (res) => {
    resolve(arr)
  })
})

const getVariationsRectangle = new Promise((resolve) => {
  const file = 'variation-rectangle.csv'
  const arr = []
  const readStream = fs.createReadStream(`${__dirname}/${file}`, 'utf8')
  const csvStream = readStream.pipe(papa.parse(papa.NODE_STREAM_INPUT, {header: true}))

  csvStream.on('data', (res) => {
    arr.push(res)
  })

  csvStream.on('end', (res) => {
    resolve(arr)
  })
})

const getVariationsSquare = new Promise((resolve) => {
  const file = 'variation-square.csv'
  const arr = []
  const readStream = fs.createReadStream(`${__dirname}/${file}`, 'utf8')
  const csvStream = readStream.pipe(papa.parse(papa.NODE_STREAM_INPUT, {header: true}))

  csvStream.on('data', (res) => {
    arr.push(res)
  })

  csvStream.on('end', (res) => {
    resolve(arr)
  })
})

const run = async () => {
  const products = await getProducts
  const variationsRectangle = await getVariationsRectangle
  const variationsSquare = await getVariationsSquare
  const variationsLength = variationsRectangle.length
  const variations = (productUGS, productName, defaultDimension) => {
    if (defaultDimension === '24x30 cm') {
      return variationsRectangle.map((variation, index) => {
        variation['UGS'] = `${productUGS}-${index}`
        variation['Nom'] = productName
        variation['Parent'] = productUGS

        return variation
      })
    } else {
      return variationsSquare.map((variation, index) => {
        variation['UGS'] = `${productUGS}-${index}`
        variation['Nom'] = productName
        variation['Parent'] = productUGS

        return variation
      })
    }
    return [{name: name, type: 'variation'},{name: name, type:'variation'}]
  }

  let finalCSV = []

  // Concat products & variations together with variations in beetween each products
  finalCSV = products.reduce((acc, product) => {
    return acc.concat(
      product,
      variations(product['UGS'], product['Nom'], product['Attribut 1 par défaut'])
    )
  }, [])

  // Create Final CSV file
  finalCSV = papa.unparse(finalCSV)
  fs.writeFile('import-this.csv', finalCSV, function (err) {
    if (err) throw err
    console.log('File Created !')
  })
}

run()
