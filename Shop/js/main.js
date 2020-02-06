let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard', 'Loudspeakers']
let PRICES = [100, 120, 1000, 15, 18, 25]
let IDS = [0, 1, 2, 3, 4, 5]
let IMGS = ['https://electrozon.ru/upload/resize/a8/a84cdb0af9adfa544ddffa8131c631c7_300x300.png', 'https://www.profdisplays.ru/upload/iblock/fd9/fd9843ad49bffacbd3b69d82e3ee2569.png', 'https://img.freepik.com/free-vector/_1624-285.jpg?size=626&ext=jpg', 'https://s1.iconbird.com/ico/0912/CrystalBW/w256h2561348673488souris.png', 'https://avatars.mds.yandex.net/get-mpic/1855911/img_id1888610378987415809.png/9hq', 'https://gipermir.com/wa-data/public/shop/products/51/40/114051/images/92808/92808.970.png']

let products = []

/* function createProductsDTO(arr) {
      arr = []
      let length = IDS.length

      for (let i = 0; i < length; i++) {
          arr.push(createProduct(i))
      }
  }*/

function createProduct(index) {
    return {
        product_name: PRODUCTS_NAMES[index],
        price: PRICES[index],
        id_product: IDS[index],
        img: IMGS[index],
        createTemplate() {
            return `
            <div class="product" data-id="${this.id_product}">
                <img src="${this.img}" alt="${this.product_name}" class="product-img" width="200" heigh="300">
                <div class="product-inf">
                    <span class="product-name">${this.product_name}</span>
                    <span class="product-price">${this.price}</span>
                    <button class="buy-btn"
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-price="${this.price}">
                        Купить
                    </button>
                </div>
            </div>
        `
        }
    }
}

/*
return `   <div class="cart-product" data-id="${this.id_product}">
                <img src="${this.img}" alt="${thiclass="product-img" width="100" heigh="80">
                <div class="product-inf">           
                    <span class="cart-product-name">${t</span>
                    <span class="cart-product-quantity">Quantity:</span>
                    <span class="cart-each-quantity">each</span>
                    <span class="cart-price">${this.price}</span>
                    <button class="cart-btn-del">X</button>
                </div>
            </div>`
            
            */
        
let cart = {
    items: [],
    container: '.cart',
    
}


let catalog = {
    items: [],
    container: '.main',
    cart: null,

    init() {
        this._fetchItems()
        this._render()
        
        document.querySelector (this.container).addEventListener('click', (evt) => {
            if(evt.target.classList.contains ('buy-btn')) {
                let product = evt.target.dataset
                console.log (`
                Куплен ${product.name}, по цене ${+product.price}$
            `)    
            }    
            
        })
        
    },
    _fetchItems() {
        let length = IDS.length

        for (let i = 0; i < length; i++) {
            this.items.push(createProduct(i))
        }
    },

    _render() {
        let container = document.querySelector(this.container)
        let domString = ''

        this.items.forEach(item => {
            domString += item.createTemplate()
        })
        container.innerHTML = domString
    }
}

catalog.init()





