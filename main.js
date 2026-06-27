// =============================================
// ТВОЙ КОНТЕНТНЫЙ СОЧИ — JS
// =============================================

// URL вашего сервера на Render.com — замените после деплоя
const SERVER_URL = 'https://YOUR_SERVER.onrender.com/vk-notify';

// -----------------------------------------------
// ТЕМА (светлая / тёмная)
// -----------------------------------------------
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

const savedTheme = localStorage.getItem('tks-theme');
if (savedTheme === 'light') body.classList.add('light');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('tks-theme', body.classList.contains('light') ? 'light' : 'dark');
});

// -----------------------------------------------
// НАВИГАЦИЯ — скролл + мобильное меню
// -----------------------------------------------
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Закрыть меню при клике вне
document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// -----------------------------------------------
// АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ (при скролле)
// -----------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// -----------------------------------------------
// ФОРМА БРОНИРОВАНИЯ
// -----------------------------------------------
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// Маска телефона
const phoneInput = document.getElementById('clientPhone');
phoneInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.startsWith('8')) val = '7' + val.slice(1);
  if (val.startsWith('7')) {
    val = val.slice(0, 11);
    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.slice(1, 4);
    if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
    if (val.length >= 7) formatted += '-' + val.slice(7, 9);
    if (val.length >= 9) formatted += '-' + val.slice(9, 11);
    e.target.value = formatted;
  }
});

// Минимальная дата — сегодня
const dateInput = document.getElementById('shootDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Отправка формы
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Очищаем ошибки
  document.querySelectorAll('.form-error').forEach(el => el.remove());

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const date = document.getElementById('shootDate').value;
  const time = document.getElementById('shootTime').value;
  const typeSelect = document.getElementById('shootType');
  const type = typeSelect.options[typeSelect.selectedIndex].text;
  const wish = document.getElementById('clientWish').value.trim();

  // Валидация
  let valid = true;
  if (!name) { showError('clientName', 'Введите ваше имя'); valid = false; }
  if (!phone || phone.length < 11) { showError('clientPhone', 'Введите корректный номер'); valid = false; }
  if (!date) { showError('shootDate', 'Выберите дату'); valid = false; }
  if (!typeSelect.value) { showError('shootType', 'Выберите тип съёмки'); valid = false; }
  if (!valid) return;

  // Форматирование даты
  const dateFormatted = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Сообщение для ВКонтакте
  const message = [
    '📸 Новая заявка — Твой Контентный Сочи',
    '',
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    `📅 Дата: ${dateFormatted}${time ? ' в ' + time : ''}`,
    `🎯 Съёмка: ${type}`,
    wish ? `💬 Пожелания: ${wish}` : ''
  ].filter(Boolean).join('\n');

  // Кнопка — загрузка
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;

  try {
    await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
  } catch (err) {
    // Даже если сервер не настроен — показываем успех (для тестов)
    console.log('Демо-режим:', message);
  }

  // Успех
  bookingForm.style.display = 'none';
  formSuccess.style.display = 'block';
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const err = document.createElement('span');
  err.className = 'form-error';
  err.textContent = msg;
  field.parentNode.appendChild(err);
  field.style.borderBottomColor = '#c0614a';
}

// -----------------------------------------------
// ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
// -----------------------------------------------
const fadeEls = document.querySelectorAll('.service-card, .portfolio-item, .stat, .about-image');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.05) + 's';
      entry.target.style.animation = 'fadeUp 0.7s ease both';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  fadeObserver.observe(el);
});
