export default class User {
  constructor(data) {
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.adress = data.address;
    this.positionName = data.position_name;
    this.department = data.department;
    this.hireDate = data.hire_date;
  }

  render() {
    this.userEl = document.createElement('div');
    this.userEl.className = 'user';

    this.userNameEl = document.createElement('h4');
    this.userNameEl.className = 'user__name';
    this.userNameEl.textContent = this.name;

    this.userContactsEl = document.createElement('ul');
    this.userContactsEl.className = 'user__contacts';

    this.userPhoneEl = document.createElement('li');
    this.userPhoneEl.className = 'user__contact user__contact-tel';
    this.userPhoneLink = document.createElement('a');
    this.userPhoneLink.className = 'user__contact-link';
    this.userPhoneLink.textContent = this.phone;
    this.userPhoneLink.href = `tel:${this.validatePhone()}`;
    this.userPhoneEl.appendChild(this.userPhoneLink);

    this.userMailEl = document.createElement('li');
    this.userMailEl.className = 'user__contact user__contact-mail';
    this.userMailLink = document.createElement('a');
    this.userMailLink.className = 'user__contact-link';
    this.userMailLink.textContent = this.email;
    this.userMailLink.href = this.email;
    this.userMailEl.appendChild(this.userMailLink);

    this.userContactsEl.appendChild(this.userPhoneEl);
    this.userContactsEl.appendChild(this.userMailEl);
    this.userEl.appendChild(this.userNameEl);
    this.userEl.appendChild(this.userContactsEl);

    this.userEl.addEventListener('click', (e) => {
      if (e.target === this.userPhoneLink || e.target === this.userMailLink) {
        return;
      }
      this.showPopup();
    });

    return this.userEl;
  }

  renderInfo() {
    const popup = document.querySelector('.popup');
    popup.querySelector('.popup__user-name').textContent = this.name;
    popup.querySelector('.tel').textContent = this.phone;
    popup.querySelector('.tel').href = `tel:${this.validatePhone()}`;
    popup.querySelector('.mail').textContent = this.email;
    popup.querySelector('.mail').href = this.email;
    popup.querySelector('.date').textContent = this.hireDate;
    popup.querySelector('.position').textContent =
      this.positionName.length > 30
        ? `${this.positionName.slice(0, 30)}...`
        : this.positionName;
    popup.querySelector('.department').textContent =
      this.department.length > 30
        ? `${this.department.slice(0, 30)}...`
        : this.department;
  }

  showPopup() {
    const popupOverlay = document.getElementById('popup');
    popupOverlay.style.marginTop = `${
      this.userEl.pageY - this.userEl.clientY + 75
    }px`;
    popupOverlay.classList.add('show');
    this.renderInfo();
  }

  validatePhone() {
    const number = this.phone.replace(/[\s\-()]/g, '');
    return number;
  }
}
