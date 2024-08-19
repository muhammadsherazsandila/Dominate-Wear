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

    
    let numberOfCartItem = document.querySelector('.numberOfCartItem')
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
    updateCartCount()
    
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