import { browser, by, element, protractor } from 'protractor';
import { AppPage } from './app.po';

const origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function () {
  const args = arguments;
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(5);
  });
  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('GO-Nutri E2E', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().setSize(1280, 800);
    page.navigateTo('login');
  });

  describe('Routine (Register-Login-AddToCart-Confirm)', () => {
    const timestamp = (new Date).toISOString();
    const user = {
      name: 'user' + timestamp,
      password: 'password',
      email: timestamp + '@gmail.com',
      nif: '789456123',
      street: 'Sesame Street 48',
      region: 'Aveiro',
      zipCode: '3333-666',
      county: 'Aveiro'
    };

    it('should work and show results', () => {
      // Register
      page.clickLoginButton();
      page.clickRegisterTab();
      page.setRegisterName(user.name);
      page.setRegisterPassword(user.password);
      page.setRegisterEmail(user.email);
      page.setRegisterNif(user.nif);
      page.setRegisterStreet(user.street);
      page.setRegisterRegion(user.region);
      page.setRegisterZip(user.zipCode);
      page.setRegisterCounty(user.county);
      page.clicktoResgister();

      // Login
      page.setLoginEmail(user.email);
      page.setLoginPassword(user.password);
      page.clickToLogin();

      // Check some plates and add to cart
      page.navigateTo('plates');
      page.clickPlateImage(1);
      page.clickModalClose();
      page.clickPlateImage(1);
      page.clickModalAddToCart();
      page.clickPlateImage(1);
      page.clickModalAddToCart();

      // Check cart and confirm
      page.clickCartButton();
      const plate = page.getPlateCart(0);
      expect(plate.name)
        .toMatch(/(\w\ ?)+/);
      expect(plate.price)
        .toMatch(/\d+\ x \d+(\.{1}\d)?€/);
      page.clickCheckoutButton();

      // Check cart and confirm
      page.clickUserNameButton();
      page.clickOrdersTab();
      expect(page.getOrder(0))
        .toMatch(/\d+\: \d+(\.{1}\d)?€/);

      // Logout
      page.clickLogoutButton();
    });
  });


  describe('Plates page', () => {
    beforeEach(() => {
      page.navigateTo('plates');
    });

    it('should display plates', () => {
      const plate_cards = page.getPlateCards();
      expect(plate_cards.count())
        .toEqual(15);
    });

    it('should display each plate basic informations', () => {
      const plate_cards = page.getPlateCards();
      for (let id = 0; id < 15; id += 1) {
        const cart = plate_cards.get(id);
        expect(cart.all(by.className('plate-name')).first().getText())
          .toMatch(/(\w\ ?)+/);
        expect(cart.all(by.className('plate-price')).first().getText())
          .toMatch(/\d(\.{1}\d)?/);
        expect(cart.all(by.className('plate-image')).first().getAttribute('src'))
          .toMatch(/\w+.(jpg|gif|png|svg)/);
      }
    });
  });


  describe('Restaurants page', () => {
    beforeEach(() => {
      page.navigateTo('restaurants');
    });

    it('should display restaurants', () => {
      const restaurants_cards = page.getRestaurantCards();
      expect(restaurants_cards.count())
        .toEqual(3);
    });

    it('should display each restaurant basic informations', () => {
      const restaurants_cards = page.getRestaurantCards();
      for (let id = 0; id < 3; id += 1) {
        const cart = restaurants_cards.get(id);
        expect(cart.all(by.className('restaurant-name')).first().getText())
          .toMatch(/(\w\ ?)+/);
        expect(cart.all(by.className('restaurant-categorie')).first().getText())
          .toMatch(/(\w\ ?)+/);
        expect(cart.all(by.className('restaurant-image')).first().getAttribute('src'))
          .toMatch(/\w+.(jpg|gif|png|svg)/);
      }
    });
  });
});
