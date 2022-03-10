if ( document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready () {

    /* add to cart buttons */
    var addToCartBtn = document.getElementsByClassName('shop-item-button'); /* selecting all add to cart buttons */
    for (var i = 0 ; i < addToCartBtn.length; i++) { 
    var button = addToCartBtn[i];
    button.addEventListener('click', addItemToCard)  /* using click event on all buttons */
        } 

    /* remove buttons */    
    var removeCartButtons = document.getElementsByClassName('btn-danger'); /* selecting all remove buttons */
    for (var i = 0 ; i < removeCartButtons.length; i++) { 
        var button = removeCartButtons[i];
    button.addEventListener('click', removeItemFromCart)  /* using click event on all buttons */
        } 

    /* quantity inputs */
    var quantityInputs = document.getElementsByClassName('cart-quantity-input'); /* selecting all inout fields */
    for (var i = 0 ; i < quantityInputs.length; i++) { 
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged); /* using change event on all input fields */
        }

    /* show cart button */
    var showCartBtn = document.getElementById('cart-button'); /* selecting cart button */
    showCartBtn.addEventListener('click', showCartToggle); /* using click event on cart button */
    }
    
/* add to cart */
function addItemToCard (event) {
    var button = event.target; /* after setting target, we'll specify other items from here */
    itemPrice = button.parentElement.getElementsByClassName('shop-item-price')[0].innerText;
    itemName = button.parentElement.parentElement.getElementsByClassName('shop-item-title')[0].innerText;
    itemImg = button.parentElement.parentElement.getElementsByClassName('shop-item-image')[0].src;

    addToCartClicked(itemImg, itemPrice, itemName);
    updateCartTotal(itemPrice);
}

/* remove from cart */
function removeItemFromCart (event) {
    button = event.target;
    var deleteRow = button.parentElement.parentElement; /* after setting target, we select row */
    deleteRow.remove(); /* removing row */
    updateCartTotal();
}

/* add row to cart */
function addToCartClicked (itemImg, itemPrice, itemName) {
    var newCartRow = document.createElement('div'); /* first step, creating a new div */
    newCartRow.classList.add('cart-row'); /* adding class to div */
    var cartItems = document.getElementsByClassName('cart-items')[0]; 
    cartItemNames = cartItems.getElementsByClassName('cart-item-title'); /* selecting cart item titles */
    for (var i = 0 ; i < cartItemNames.length; i++) { 
        if(cartItemNames[i].innerText == itemName) { /* comparing cart item titles with item names */
            alert('Item has already added')
            return /* return to beginning of function after alert */
        }
    }

    var cartRowContents = (`<div class="cart-item cart-column">
        <img class="cart-item-image" src="${itemImg}" width="100" height="100">
        <span class="cart-item-title">${itemName}</span>
    </div>
    <span class="cart-price cart-column">${itemPrice}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`);

    newCartRow.innerHTML = cartRowContents;
    cartItems.append(newCartRow);
    var cartItemInput = cartItems.getElementsByClassName('cart-quantity-input')[0].value; /* selecting input value */
    newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItemFromCart); /* adding events to new items */
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

    updateCartTotal();

}

/* quantity */
function quantityChanged (event) {
    var input = event.target; 
    if (isNaN(input.value) || input.value <= 0 ){ /* checking if value is not a number or below 0 */
        input.value = 1; /* input value will be 1 if there's an error */
    }

    updateCartTotal();
}

/* update total price */
function updateCartTotal () {
    
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    total = 0;
    for (var i = 0 ; i < cartRows.length; i++) { /* for loop ile cart-row'ların hepsini topladık */
        cartRow = cartRows[i];
        priceElement = cartRow.getElementsByClassName('cart-price')[0];
        itemPrice = parseFloat(priceElement.innerText.replace('$', ''));
        quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        quantity = quantityElement.value;
        total = total + (itemPrice * quantity) /* multipy price and item value */
    }

    total = Math.round(total * 100) / 100;    
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

    /* displaying cart infos in cart button */
    var priceShow = document.getElementById('item-price').innerText = total;
    var itemCount = document.getElementById('item-count').innerText = cartRows.length;

    }

    /* show cart button */
    function showCartToggle (event) {
        var cartBody = document.getElementById('cart-display');
        cartBody.classList.toggle('cart-show');
    }