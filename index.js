document.addEventListener('DOMContentLoaded', function () {
  // Элементы первого pop-up
  const openFirstPopupBtn = document.getElementById('openFirstPopup')
  const firstPopup = document.getElementById('firstPopup')
  const openSecondPopupBtn = document.getElementById('openSecondPopup')

  // Элементы второго pop-up
  const secondPopup = document.getElementById('secondPopup')

  // Все кнопки закрытия
  const closeBtns = document.querySelectorAll('.close-btn')

  // Открытие первого pop-up
  openFirstPopupBtn.addEventListener('click', function () {
    firstPopup.style.display = 'flex'
  })

  // Открытие второго pop-up из первого
  openSecondPopupBtn.addEventListener('click', function () {
    firstPopup.style.display = 'none'
    secondPopup.style.display = 'flex'
  })

  // Закрытие любого pop-up при клике на крестик
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const popup = this.closest('.popup')
      popup.style.display = 'none'
    })
  })

  // Закрытие при клике вне окна
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', function (e) {
      if (e.target === this) {
        this.style.display = 'none'
      }
    })
  })

  // Закрытие по клавише Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.popup').forEach(popup => {
        if (popup.style.display === 'flex') {
          popup.style.display = 'none'
        }
      })
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide')
  const dots = document.querySelectorAll('.dot')
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')
  let currentSlide = 0
  let slideInterval
  const intervalTime = 8000 // 5 секунд

  // Функция для переключения слайда
  function goToSlide (n) {
    slides[currentSlide].classList.remove('active')
    dots[currentSlide].classList.remove('active')
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add('active')
    dots[currentSlide].classList.add('active')
  }

  // Следующий слайд
  function nextSlide () {
    goToSlide(currentSlide + 1)
  }

  // Предыдущий слайд
  function prevSlide () {
    goToSlide(currentSlide - 1)
  }

  // Начало автоматической прокрутки
  function startSlideShow () {
    slideInterval = setInterval(nextSlide, intervalTime)
  }

  // Остановка автоматической прокрутки
  function stopSlideShow () {
    clearInterval(slideInterval)
  }

  if (nextBtn) {
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', function () {
      nextSlide()
      stopSlideShow()
      startSlideShow()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide()
      stopSlideShow()
      startSlideShow()
    })
  }

  // Обработчики для точек
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-slide'))
      goToSlide(slideIndex)
      stopSlideShow()
      startSlideShow()
    })
  })

  // Пауза при наведении
  if (document.querySelector('.photo-slider')) {
    const el = document.querySelector('.photo-slider')
    el.addEventListener('mouseenter', stopSlideShow)
    el.addEventListener('mouseleave', startSlideShow)
  }

  // Запуск слайдера
  startSlideShow()
})
