import User from './User';

window.onload = () => {
  const usersBox = document.querySelector('.users');
  const searchForm = document.getElementById('search');
  const searchInput = searchForm.querySelector('.search-form__input');
  const searchBtn = searchForm.querySelector('.search-form__icon');

  const popupOverlay = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');
  const cancelPopup = document.getElementById('cancel-popup');

  closePopup.addEventListener('click', () =>
    popupOverlay.classList.remove('show')
  );
  cancelPopup.addEventListener('click', () =>
    popupOverlay.classList.remove('show')
  );

  renderUsers('http://127.0.0.1:3000');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    [...document.querySelectorAll('.user')].forEach((el) => el.remove());
    renderUsers(`http://127.0.0.1:3000?term=${searchInput.value}`);
    e.currentTarget.reset();
  });

  async function renderUsers(url) {
    const response = await fetch(url);
    if (response.ok) {
      const responseJson = await response.json();

      if (responseJson.length === 0) {
        searchInput.value = 'Ничего не найдено';
      }

      responseJson.forEach((userData) => {
        usersBox.appendChild(new User(userData).render());
      });

      const users = [...document.querySelectorAll('.user')];
    } else {
      throw new Error(`Status: ${response.status}`);
    }
  }
};
