import express from "express";
import ProductManager from "./productManager.js";

const manager = new ProductManager('products.json')
const app = express();

const PORT = 8089

const server = app.listen(PORT, () => {

console.log(`Servidor en puerto ${PORT}`)

})

server.on("error", (err) => {

console.error(`Error: ${err}`)

})

app.get('/products', (req,res)=>{
  const {limit} = req.query
  productManager.getProducts().then((products)=>{
    if(products.length===0) return res.send('Product list is empty')
    if(limit){
      return res.send(products.slice(0,limit))
    }
    res.send(products)
  }).catch(err => {
    res.send(`Failed to load. error: ${err}`)
  })
})

app.get('/products/:productId',(req,res)=>{
  const id = req.params.productId
  productManager.getProductById(id).then(product=>{
    res.send(product)
  }).catch(err => {
    res.send(`Failed to load. error: ${err}`)
  })
})


