let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard', 'Loudspeakers']
let PRICES = [100, 120, 1000, 15, 18, 25]
let IDS = [0, 1, 2, 3, 4, 5]
let IMGS = ['https://electrozon.ru/upload/resize/a8/a84cdb0af9adfa544ddffa8131c631c7_300x300.png', 'https://www.profdisplays.ru/upload/iblock/fd9/fd9843ad49bffacbd3b69d82e3ee2569.png', 'https://img.freepik.com/free-vector/_1624-285.jpg?size=626&ext=jpg', 'https://s1.iconbird.com/ico/0912/CrystalBW/w256h2561348673488souris.png', 'https://avatars.mds.yandex.net/get-mpic/1855911/img_id1888610378987415809.png/9hq', 'https://gipermir.com/wa-data/public/shop/products/51/40/114051/images/92808/92808.970.png']

let products = []

function createProduct (index) {
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
                    <button class="buy-btn" name="buy-btn"
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

let catalog = {
    items: [],
    container: '.main',
    cart: null,

    init() {
        this.cart = cart
        this._fetchItems()
        this._render()


        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target.dataset)
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


let cart = {
    items: [],
    shown: false,
    sum: 0,
    qua: 0,
    container: '.cart-block',
    itemsContainer: '.cart-items',

    init() {
        document.querySelector('#toggle-cart').addEventListener('click', () => {
            cart.shown = !cart.shown
            cart.render()
            document.querySelector('.cart-block').classList.toggle('invisible')
        })
        
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name === 'del-btn') {
                this.removeProduct(evt.target.dataset.id)
            }
        })
    },
    render() {
        let container = document.querySelector(this.itemsContainer)
        let domString = ''

        this.items.forEach(item => {
            domString += item.createTemplate()
        })
        container.innerHTML = domString
        
        document.querySelector ('#tot-sum').innerHTML = this.sum
        document.querySelector ('#tot-qua').innerHTML = this.qua
        
        
        
    },
    addProduct(product) {
        let find = this.items.find (item => item.id_product === product.id)
        if (!find) {
           this.items.push (createCartItem (product.id, product.name, product.price)) 
        } else {
            find.quantity++    
        }
        this.checkTotal ()     
        this.render ()
    },
    removeProduct(id) {
        let find = this.items.find (item => item.id_product === id)
        if (find.quantity === 1) {
            this.items.splice (this.items.indexOf(find), 1)  
        } else {
            find.quantity--    
        }
        this.checkTotal ()
        this.render ()
    },
    checkTotal () {
        let s = 0
        let q = 0
        
        this.items.forEach (item => {
            q += item.quantity
            s += item.quantity * item.price
        })
        
        this.sum = s
        this.qua = q
    }
    
}

function createCartItem (id, name, price,) {
    return {
        id_product: id,
        price: +price,
        product_name: name,
        quantity: 1,
        img: IMGS[id],
        createTemplate() {
            return `   
        <div class="cart-item" data-id="${this.id_product}">
            <img src="${this.img}" alt="${this.product_name}" width="100" height="80">
                <div class="product-desc">
                    <p class="product-title">${this.product_name}</p>
                    <p class="product-quantity">${this.quantity}</p>
                    <p class="product-single-price">${this.price}</p>
                </div>
                <div class="right-block">
                    <p class="product-total-price">$${this.price * this.quantity}</p>
                    <button name="del-btn" class="del-btn" data-id="${this.id_product}">&times;</button>
                </div> 
        </div>
        `
        }
    }
}

cart.init()
catalog.init()
