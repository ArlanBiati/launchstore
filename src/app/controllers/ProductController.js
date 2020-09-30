const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
  async create(req, res) {
    // pegar categorias
    let results = await Category.all()
    const categories = results.rows

    return res.render('products/create', { categories })
    // PROMISSES
    // Category.all()
    //   .then(function (results) {
    //     const categories = results.rows
    //     return res.render('products/create', { categories })
    //   }).catch(function (err) {
    //     throw new Error(err)
    //   })
  },

  async post(req, res) {
    // salvar
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === "") {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    let results = await Product.create(req.body)
    const productId = results.rows[0].id

    results = await Category.all()
    const categories = results.rows

    return res.render('products/create', { productId, categories })

  }
}