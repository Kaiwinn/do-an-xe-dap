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

let header = $('header')
let btn = $('button')
btn.onclick = () => {
  console.log('test')
}
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

setTimeout(() => banner_slide_items[0].classList.add('active'), 200)

// auto slide
// setInterval(() => {
//     if (!banner_slide_play) return
//     nextSlide()
// }, 5000);

// change header style when scroll
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink')
  } else {
    header.classList.remove('shrink')
  }
})

// element show on scroll

let scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

let el_to_show = $$('.show-on-scroll')

isElInViewPort = (el) => {
  let rect = el.getBoundingClientRect()

  let distance = 200

  return (
    rect.top <=
    (window.innerHeight - distance ||
      document.documentElement.clientHeight - distance)
  )
}

loop = () => {
  el_to_show.forEach((el) => {
    if (isElInViewPort(el)) el.classList.add('show')
  })

  scroll(loop)
}

loop()
