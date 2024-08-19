document.addEventListener('DOMContentLoaded',()=>{
    const dropDownMen = document.getElementById('dropDownMen')
    const menList = document.getElementById('menList')
    const dropUpMen = document.getElementById('dropUpMen')
    const men = document.getElementById('men')
    const dropDownWomen = document.getElementById('dropDownWomen')
    const dropUpWomen = document.getElementById('dropUpWomen')
    const womenList = document.getElementById('womenList')
    const women = document.getElementById('women')
    men.addEventListener('click', () => {
        if (menList.style.opacity === '0') {
            dropDownMen.style.opacity = 1
            dropUpMen.style.opacity = 0
            menList.style.opacity = 1
            menList.style.transform = 'translateY(0)'
        } else {
            dropDownMen.style.opacity = 0
            dropUpMen.style.opacity = 1
            menList.style.opacity = 0
            menList.style.transform = 'translateY(20px)'
        }
        dropDownWomen.style.opacity = 0
        dropUpWomen.style.opacity = 1
        womenList.style.opacity = 0
        womenList.style.transform = 'translateY(20px)'
    })
    women.addEventListener('click', () => {
        if (womenList.style.opacity === '0') {
            dropDownWomen.style.opacity = 1
            dropUpWomen.style.opacity = 0
            womenList.style.opacity = 1
            womenList.style.transform = 'translateY(0)'
        } else {
            dropDownWomen.style.opacity = 0
            dropUpWomen.style.opacity = 1
            womenList.style.opacity = 0
            womenList.style.transform = 'translateY(20px)'
        }
        dropDownMen.style.opacity = 0
        dropUpMen.style.opacity = 1
        menList.style.opacity = 0
        menList.style.transform = 'translateY(20px)'
    })

    const navigation = document.getElementById('navigation')
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navigation.style.top = '-50px'
        }
        else {
            navigation.style.top = '0px'
        }
    })

    
    const closeIconForShipping = document.getElementById('closeIconForShipping')
    const shippingBarButton = document.getElementById('shippingBarButton')
    const shippingBarSection = document.querySelector('.shippingBarSection')
    const emptyCartIndicatorText = document.querySelector('.emptyCartIndicatorText')
    let loadingControl = document.querySelector('.loadingControl')
    let numberOfCartItem = document.querySelector('.numberOfCartItem')
    const shippingBarSectionForBackgroundBlur = document.querySelector('.shippingBarSectionForBackgroundBlur')
    let shoppingCartFooter = document.querySelector('.shoppingCartFooter')
    let shoppingCartProductContainer = document.querySelector('.shoppingCartProductContainer')
    let shopAndCartButtons = document.querySelectorAll('.shopAndCartButtons')
    const totalPriceInFooter = document.querySelector('.totalPriceInFooter')
    const shoppingCartProduct = document.querySelector('.shoppingCartProduct')
    let cartItemsCounter = numberOfCartItem.innerHTML
    let translateValue = 0
    let sumOfPrice = 0

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    function updateCartCount() {
        let cart = loadCart()
        numberOfCartItem.textContent = cart.length;
    }
    const loadCart = () => {
        const cart = localStorage.getItem('cart');
        return (cart ? (() => {
            try {
                return JSON.parse(cart);
            } catch {
                return [];
            }
        })() : []);
    };
    const addToCart = (product) => {
        let cart = loadCart();
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }
        updateCartCount()
        saveCart(cart);
        displayCart();
    };
    function deleteFromCart(cart_item_id) {
        let cart = loadCart();
        cart = cart.filter(item => item.id !== cart_item_id);
        saveCart(cart);
        displayCart();
    };
    const displayCart = () => {
        const cart = loadCart();
        shoppingCartProductContainer.innerHTML = ''; // Clear previous contents

        if (cart.length === 0) {
            shoppingCartProductContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('shoppingCartProduct');
                cartItem.setAttribute('cart_item_id', `${item.id}`);
                cartItem.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name} Image">
          <div class="rightSideOfCartList">
            <h3 class="item_name">${item.name}</h3>
            <div class="quantityAndDeleteButtonInCart">
              <button class="quantity_product_cart" >${item.quantity}</button>
              <button class="delete_product_button">
                <img src="../icons/trash.png" alt="icon">
              </button>
            </div>
            <p class="product_size_cart">${item.size}</p>
            <p class="product_price_cart">${item.price}</p>
          </div>
        `;
                shoppingCartProductContainer.appendChild(cartItem);
            });
            let delete_product_button = document.querySelectorAll('.delete_product_button');
            let quantity_product_cart = document.querySelectorAll('.quantity_product_cart');
            let product_price_cart = document.querySelectorAll('.product_price_cart');
            for(let i = 0;i<delete_product_button.length;i++){
                delete_product_button[i].addEventListener('click', (event) => {
                    let parentElement = event.target.closest('.shoppingCartProduct');
                    let cart_item_id = parseInt(parentElement.getAttribute('cart_item_id'));
                    deleteFromCart(cart_item_id);
                    decreasePrice()
                    updateCartCount()
                    let modelProductPrice = product_price_cart[i].innerHTML
                    let modelProductPrice1 = modelProductPrice.split('Rs.').join('')
                    let modelProductPrice2 = modelProductPrice1.split(',').join('')
                    let modelProductPrice3 = parseInt(modelProductPrice2.split('.00').join(''))
                    let quantityOfProductInModel = parseInt(quantity_product_cart[i].innerHTML)
                    sumOfPrice = sumOfPrice - (quantityOfProductInModel * modelProductPrice3)
                    let totalPrice = sumOfPrice
                    savePrice(totalPrice)
                    displayTotalPrice()
                });
            }
        }
    };
    shopAndCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.modalImagesContainerHavingPadding');
            const product = {
                id: parseInt(productElement.getAttribute('product_id')),
                name: productElement.getAttribute('product_name'),
                quantity: parseInt(productElement.getAttribute('product_quantity')),
                price: productElement.getAttribute('product_price'),
                imageUrl: productElement.getAttribute('product_img'),
                size: productElement.getAttribute('product_size'),
            };
            shippingBarSection.style.transform = 'translateX(0)';
            modalImagesContainer.style.display = 'none';
            shippingBarSectionForBackgroundBlur.style.opacity = 1;
            shippingBarSectionForBackgroundBlur.style.zIndex = 15;
            addToCart(product);
            updateCartCount()
            addPrices()
        });
    });
    displayCart();
    updateCartCount()

    const savePrice = (totalPrice) => {
        localStorage.setItem('price', totalPrice)
    }
    function addPrices() {
        let modelProductPrice = modelCurrentPrice.innerHTML
        let modelProductPrice1 = modelProductPrice.split('Rs.').join('')
        let modelProductPrice2 = modelProductPrice1.split(',').join('')
        let modelProductPrice3 = parseInt(modelProductPrice2.split('.00').join(''))
        let quantityOfProductInModel = parseInt(quantityNumberInModel.innerHTML)
        sumOfPrice += quantityOfProductInModel * modelProductPrice3
        let totalPrice = sumOfPrice
        savePrice(totalPrice)
        displayTotalPrice()
    }
    const displayTotalPrice = () => {
        let modelProductPrice4 = localStorage.getItem('price')
        try {
            if (modelProductPrice4.length === 4) {
                let modelProductPrice5 = `Rs.${modelProductPrice4}`
                let modelProductPrice6 = modelProductPrice5.slice(0, 4) + ',' + modelProductPrice5.slice(4) + '.00'
                totalPriceInFooter.innerHTML = modelProductPrice6
            } else {
                let modelProductPrice5 = `Rs.${modelProductPrice4}`
                let modelProductPrice6 = modelProductPrice5.slice(0, 5) + ',' + modelProductPrice5.slice(5) + '.00'
                totalPriceInFooter.innerHTML = modelProductPrice6
            }
        }
        catch {
            return ''
        }
    }
    const decreasePrice = () => {

    }
    displayTotalPrice()


    
    let hamburgerContainer = document.querySelector('.hamburgerContainer')
    let hamburgerItems = document.querySelector('.hamburgerItems')
    const line1 = document.getElementById('line1')
    const line2 = document.getElementById('line2')
    const line3 = document.getElementById('line3')
    hamburgerContainer.addEventListener('click', function () {
        if (hamburgerItems.style.transform === 'translateX(-100%)') {
            hamburgerItems.style.transform = 'translateX(0%)'
            line2.style.opacity = '0'
            line1.style.transform = 'rotate(45deg) translateY(10px)'
            line3.style.transform = 'rotate(-45deg) translateY(-10px)'
        } else {
            hamburgerItems.style.transform = 'translateX(-100%)'
            line2.style.opacity = '1'
            line1.style.transform = 'rotate(0deg) translateY(0px)'
            line3.style.transform = 'rotate(0deg) translateY(0px)'
        }
    })

    let hambergurMenWomen = document.querySelectorAll('.hambergurMenWomen')
    let hamburgerUndeList = document.querySelectorAll('.hamburgerUndeList')
    for (let i = 0; i < hambergurMenWomen.length; i++) {
        hambergurMenWomen[i].addEventListener('click', () => {
            hamburgerUndeList[i].style.transform = 'translateY(0px)'
            hambergurMenWomen[i].style.overFlow = 'normal'
        })
    }

    let registerSection = document.querySelector('.registerSection')
    let registerButton = document.querySelectorAll('.registerButton')
    const closeIconForRegister = document.getElementById('closeIconForRegister')
    registerButton.forEach(
        e => {
            e.addEventListener('click', function () {
                registerSection.style.transform = 'scale(1)'
            })
        }
    )
    closeIconForRegister.addEventListener('click', function () {
        registerSection.style.transform = 'scale(0)'
    })

    const registerPassword = document.getElementById('registerPassword')
    const hideEyeIcon = document.getElementById('hideEyeIcon')
    const openEyeIcon = document.getElementById('openEyeIcon')
    openEyeIcon.addEventListener('click', () => {
        registerPassword.type = 'text'
        openEyeIcon.style.display = 'none'
        hideEyeIcon.style.display = 'block'
    })
    hideEyeIcon.addEventListener('click', () => {
        registerPassword.type = 'password'
        openEyeIcon.style.display = 'block'
        hideEyeIcon.style.display = 'none'
    })



    const loginPassword = document.getElementById('loginPassword')
    const closeLoginEyeIcon = document.getElementById('closeLoginEyeIcon')
    const openLoginEyeIcon = document.getElementById('openLoginEyeIcon')

    openLoginEyeIcon.addEventListener('click', () => {
        loginPassword.type = 'text'
        openLoginEyeIcon.style.display = 'none'
        closeLoginEyeIcon.style.display = 'block'
    })
    closeLoginEyeIcon.addEventListener('click', () => {
        loginPassword.type = 'password'
        openLoginEyeIcon.style.display = 'block'
        closeLoginEyeIcon.style.display = 'none'
    })


    let animatedEl = document.querySelectorAll('.animatedElement')
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('showElement')
                entry.target.classList.add('facilitesAnimation')
            } else {
                entry.target.classList.remove('showElement')
                entry.target.classList.remove('facilitesAnimation')
            }
        })
    })
    animatedEl.forEach((el) => observer.observe(el))


    document.addEventListener('click', (event) => {
        if (!men.contains(event.target)) {
            dropDownMen.style.opacity = 0
            dropUpMen.style.opacity = 1
            menList.style.opacity = 0
            menList.style.transform = 'translateY(20px)'
        }
        if (!women.contains(event.target)) {
            dropDownWomen.style.opacity = 0
            dropUpWomen.style.opacity = 1
            womenList.style.opacity = 0
            womenList.style.transform = 'translateY(20px)'
        }
        shopAndCartButtons.forEach(button => {
            if (button.contains(event.target)) {
                shippingBarSection.style.transform = 'translateX(0)'
                shippingBarSectionForBackgroundBlur.style.opacity = 1
                shippingBarSectionForBackgroundBlur.style.zIndex = 15
            }
        })
        if (!hamburgerContainer.contains(event.target) && !hamburgerItems.contains(event.target)) {
            hamburgerItems.style.transform = 'translateX(-100%)'
            line2.style.opacity = '1'
            line1.style.transform = 'rotate(0deg) translateY(0px)'
            line3.style.transform = 'rotate(0deg) translateY(0px)'
        }
    })
})