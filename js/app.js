let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

let banner_slide = $('#banner-slide')

let banner_slide_items = banner_slide.querySelectorAll('.slide')

let banner_slide_index = 0

let banner_slide_play = true

let banner_slide_control_items = banner_slide.querySelectorAll(
  '.slide-control-item'
)

let slide_next = banner_slide.querySelector('.slide-next')

let slide_prev = banner_slide.querySelector('.slide-prev')

const toTop = $('.to-header')

let header = $('header')

showSlide = (index) => {
  banner_slide.querySelector('.slide.active').classList.remove('active')
  banner_slide
    .querySelector('.slide-control-item.active')
    .classList.remove('active')
  banner_slide_control_items[index].classList.add('active')
  banner_slide_items[index].classList.add('active')
}

nextSlide = () => {
  banner_slide_index =
    banner_slide_index + 1 === banner_slide_items.length
      ? 0
      : banner_slide_index + 1
  showSlide(banner_slide_index)
}

prevSlide = () => {
  banner_slide_index =
    banner_slide_index - 1 < 0
      ? banner_slide_items.length - 1
      : banner_slide_index - 1
  showSlide(banner_slide_index)
}

slide_next.addEventListener('click', () => nextSlide())

slide_prev.addEventListener('click', () => prevSlide())

// add event to slide select
banner_slide_control_items.forEach((item, index) => {
  item.addEventListener('click', () => showSlide(index))
})

// pause slide when mouse come in slider
banner_slide.addEventListener('mouseover', () => (banner_slide_play = false))

// resume slide when mouse leave out slider
banner_slide.addEventListener('mouseleave', () => (banner_slide_play = true))

// auto slide
setInterval(() => {
  if (!banner_slide_play) return
  nextSlide()
}, 5000)

// change header style when scroll
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink')
  } else {
    header.classList.remove('shrink')
  }
})

localStorage.getItem('quantity') !== null
  ? ($('.cart-quantity').innerText = localStorage.getItem('quantity'))
  : $('.cart-quantity').classList.add('disabled')
//store

let addContainter = $$('.add')

for (let i = 0; i < addContainter.length; i++) {
  let add = addContainter[i]
  add.addEventListener('click', function () {
    let product = add.parentElement
    let title = product.querySelector('.product-name').innerText
    let price = product.querySelector('.product-price').innerText
    let img = product.querySelector('img').src
    let addProduct = {
      title,
      price,
      img,
    }
    localStorage.setItem('product', JSON.stringify(addProduct))
  })
}
