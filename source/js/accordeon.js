const footerSection = document.querySelector(".page-footer__wrapper");
const sitemapSection = footerSection.querySelector(
  ".page-footer__sitemap-wrapper"
);
const sitemapList = sitemapSection.querySelector(".page-footer__list--sitemap");
const contactsSection = footerSection.querySelector(
  ".page-footer__contacts-wrapper"
);
const contactsList = contactsSection.querySelector(
  ".page-footer__list--contacts"
);
const sitemapButton = sitemapSection.querySelector(
  ".page-footer__accordeon-button"
);
const contactsButton = contactsSection.querySelector(
  ".page-footer__accordeon-button"
);

const setInitialState = () => {
  sitemapButton.classList.add("page-footer__accordeon-button--js-shown");
  contactsButton.classList.add(
    "page-footer__accordeon-button--js-shown",
    "page-footer__accordeon-button--js-collapse"
  );
  sitemapList.classList.add("page-footer__list--js-hidden");
};
const toggleSitemapSection = () => {
  sitemapList.classList.toggle("page-footer__list--js-hidden");
  sitemapButton.classList.toggle("page-footer__accordeon-button--js-collapse");
};
const toggleContactsSection = () => {
  contactsList.classList.toggle("page-footer__list--js-hidden");
  contactsButton.classList.toggle("page-footer__accordeon-button--js-collapse");
};

setInitialState();
sitemapButton.addEventListener("click", toggleSitemapSection);
contactsButton.addEventListener("click", toggleContactsSection);
