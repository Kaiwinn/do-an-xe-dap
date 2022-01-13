let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

let container = $$('.container')[0].children.length
//check cart item
const empty = () => {
  let emptyContainer = document.querySelectorAll('body')[0]
  let emptyRow = emptyContainer.querySelectorAll('.empty')
  emptyRow[0].classList.add('active')
}

const removeCartItem = (e) => {
  let buttonClicked = e.target
  buttonClicked.parentElement.parentElement.parentElement.remove()

  updateCartTotal()
}
let removeItem = $$('.remove')
for (let i = 0; i < removeItem.length; i++) {
  let button = removeItem[i]
  button.addEventListener('click', removeCartItem)
}
//update pay money
const updateCartTotal = () => {
  let cartItemContainer = $$('.cartItems')[0]
  let cartRows = cartItemContainer.querySelectorAll('tr')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.querySelectorAll('.cart-price')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    let quantityElements = cartRow.querySelectorAll('.cart-quantity')[0]
    let quantity = parseFloat(quantityElements.innerText)
    total = total + price * quantity
  }
  total = Math.round(total * 100) / 100
  $$('.cart-total-price')[0].innerText = '$' + total
  let ship = parseFloat($$('.ship')[0].innerText.replace('$', ''))
  $$('.total-price')[0].innerText = '$' + (total + ship)
}
container < 1 ? empty() : updateCartTotal()
//clear cart
const purchaseClicked = () => {
  alert('Thank you for your purchase')

  let cartItems = $$('.container')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
    $$('.ship')[0].innerText = '$' + 0
    empty()
    $$('.cart-quantity')[0].innerText = 0
  }
}
$$('.btn-purchase')[0].addEventListener('click', purchaseClicked)
$$('.cart-quantity')[0].innerText = $$('.cartItems')[0].children.length

localStorage.setItem(
  'quantity',
  JSON.stringify($$('.cartItems')[0].children.length)
)
