import { browser, by, element } from 'protractor';
import { protractor } from 'protractor';

export class AppPage {
  getOrder(order_n: number) {
    browser.waitForAngular();
    const order = element.all(by.className('order-card')).get(order_n);
    return order.all(by.className('order_id-price')).first().getText();
  }

  clickOrdersTab() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('orders-tab'))
      )
    );
    browser.waitForAngular();
    element(by.id('orders-tab'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickCheckoutButton() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('confirm-cart'))
      )
    );
    browser.waitForAngular();
    element(by.id('confirm-cart'))
      .click()
      .then(() => {
        browser.wait(protractor.ExpectedConditions.alertIsPresent());
        browser.switchTo().alert().accept();
        browser.waitForAngular();
      });
  }

  getPlateCart(plate_n: number) {
    browser.waitForAngular();
    const plate = element.all(by.className('plate-card')).get(plate_n);
    const name = plate.all(by.className('plate-name')).first().getText();
    const price = plate.all(by.className('plate-quantity-price')).first().getText();
    return {name: name, price: price};
  }

  navigateTo(page: string) {
    browser.get('/' + page)
      .then(() => browser.waitForAngular());
  }

  getPlateCards() {
    return element.all(by.className('plate-card'));
  }

  getRestaurantCards() {
    return element.all(by.className('restaurant-card'));
  }

  // login
  clickLoginTab() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('login-tab'))
      )
    );
    element(by.id('login-tab'))
    .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickRegisterTab() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('register-tab'))
      )
    );
    element(by.id('register-tab'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  setRegisterCounty(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerCounty'))
      )
    );
    element(by.id('registerCounty')).sendKeys(term);
  }

  setRegisterZip(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerZipCode'))
      )
    );
    element(by.id('registerZipCode')).sendKeys(term);
  }

  setRegisterRegion(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerRegion'))
      )
    );
    element(by.id('registerRegion')).sendKeys(term);
  }

  setRegisterStreet(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerStreet'))
      )
    );
    element(by.id('registerStreet')).sendKeys(term);
  }

  setRegisterNif(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerNif'))
      )
    );
    element(by.id('registerNif')).sendKeys(term);
  }

  setRegisterEmail(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerEmail'))
      )
    );
    element(by.id('registerEmail')).sendKeys(term);
  }

  setRegisterPassword(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerPassword'))
      )
    );
    element(by.id('registerPassword')).sendKeys(term);
  }

  setRegisterName(term: string): any {
    browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.id('registerName'))
      )
    );
    element(by.id('registerName')).sendKeys(term);
  }

  clicktoResgister() {
    element(by.id('register-btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
        browser.refresh();
      });
  }

  setLoginPassword(term: string): any {
    element(by.id('loginPassword')).sendKeys(term);
  }

  setLoginEmail(term: string): any {
    element(by.id('loginEmail')).sendKeys(term);
  }

  clickToLogin() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('login-btn'))
      )
    );
    element(by.id('login-btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
        browser.refresh();
      });
  }

  // navbar
  clickLoginButton() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('login_btn'))
      )
    );
    element(by.id('login_btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickLogoutButton() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('logout_btn'))
      )
    );
    element(by.id('logout_btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickUserNameButton() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('user_btn'))
      )
    );
    element(by.id('user_btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickCartButton() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('cart_btn'))
      )
    );
    element(by.id('cart_btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickPageButton(page: string) {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id(page + '-page_btn'))
      )
    );
    element(by.id(page + '-page_btn'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }


  // plate-list
  setPlateSearch(term: string) {
    element(by.id('plates-search-box')).sendKeys(term);
  }

  clickPlateFilterToggle() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('plate-filter-toggle'))
      )
    );
    element(by.id('plate-filter-toggle'))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickPlateCategorieToggle(category: number) {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('plate-category-' + category))
      )
    );
    element(by.id('plate-category-' + category))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickPlateImage(plate_id: number) {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('plate-img-' + plate_id))
      )
    );
    element(by.id('plate-img-' + plate_id))
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  clickModalClose() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('modal-close'))
      )
    );
    element(by.id('modal-close'))
      .click()
      .then(() => {
        browser.waitForAngular();
        browser.wait(
          protractor.ExpectedConditions.invisibilityOf(
            element(by.id('modal-close'))
          )
        );
      });
  }

  clickModalAddToCart() {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('modal-add'))
      )
    );
    element(by.id('modal-add'))
      .click()
      .then(() => {
        browser.wait(protractor.ExpectedConditions.alertIsPresent());
        browser.switchTo().alert().accept();
        browser.waitForAngular();
        browser.wait(
          protractor.ExpectedConditions.invisibilityOf(
            element(by.id('modal-add'))
          )
        );
      });
  }

  clickPlateAddToCart(plate_id: number) {
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(
        element(by.id('plate-addToCart-' + plate_id))
      )
    );
    element(by.id('plate-addToCart-' + plate_id)).get
      .click()
      .then(() => {
        browser.waitForAngular();
      });
  }

  getPlateCard(plate_id: number) {
    return element(by.id('plate-card-' + plate_id));
  }
}
