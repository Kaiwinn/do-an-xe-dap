let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

//render
let oldProduct = JSON.parse(localStorage.getItem('product'))
let newItem = []
newItem.push(oldProduct)

let renderItem = newItem.map((item) => {
  return `
  <div class="row">
    <div class="col-lg-12 p-5 mb-3">
      <div class="table-responsive">
        <table class="table text-white">
          <thead>
            <tr>
              <th>
                <span class="p-2 px-3 text-uppercase">Product</span>
              </th>
              <th>
                <span class="py-2 text-uppercase">Price</span>
              </th>
              <th>
                <span class="py-2 text-uppercase">Quantity</span>
              </th>
              <th>
                <span class="py-2 text-uppercase">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody class="cartItems">
            <tr>
              <th>
                <div class="p-2 align-middle">
                  <img
                    src=${item.img}
                    alt=""
                    width="70"
                    class="img-fluid rounded shop-item-image"
                  />
                  <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0">
                      <a href="#" class="d-inline-block align-middle"
                        >${item.title}</a
                      >
                    </h5>
                  </div>
                </div>
              </th>
              <td class="align-middle cart-price">${item.price}</td>
              <td class="align-middle cart-quantity ps-5">3</td>
              <td class="align-middle">
                <button class="remove">
                  <i class="ps-4 fs-4 bx bxs-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="row justify-content-end">
    <div class="col-lg-6">
      <div class="rounded-pill px-4 py-3 text-uppercase font-weight-bold">
        Order summary
      </div>
      <div class="list-unstyled mb-4">
        <ul class="list-unstyled mb-4">
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Order Subtotal </strong
            ><strong class="cart-total-price">$390.00</strong>
          </li>
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Shipping and handling</strong
            ><strong class="ship">$10</strong>
          </li>
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Total</strong>
            <h5 class="font-weight-bold total-price">$400</h5>
          </li>
        </ul>
        <a
          href="#"
          class="btn btn-dark rounded-pill py-2 btn-block float-end btn-purchase"
          >Procceed to checkout</a
        >
      </div>
    </div>
  </div>
  `
})

$('.container').innerHTML += renderItem
//check cart item
const empty = () => {
  let emptyContainer = document.querySelectorAll('body')[0]
  let emptyRow = emptyContainer.querySelectorAll('.empty')
  emptyRow[0].classList.add('active')
  $$('.cart-quantity')[0].classList.add('disabled')
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
  $$('.cart-quantity')[0].innerText = newItem.length
}
newItem.length < 1 ? empty() : updateCartTotal()

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
