 let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
 let PRICES = [100, 120, 1000, 15, 18]
 let IDS = [0, 1, 2, 3, 4]
 let products = []

 function createProductsDTO() {
     let length = IDS.length

     for (let i = 0; i < length; i++) {
         products.push(createProduct(i))
     }
 }

 function createProduct(index) {
     return {
         product_name: PRODUCTS_NAMES[index],
         price: PRICES[index],
         id_product: IDS[index]
     }
 }
