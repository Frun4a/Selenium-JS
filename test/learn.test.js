const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var driver;

describe('Library App scenarious', async function() {
  this.timeout(50000);

  beforeEach(async function() {
    driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    await driver.get('https://library-app.firebaseapp.com/');
  });

  afterEach(async function() {
    await setTimeout(() => driver.quit(), 100);
  });

  it('Button becomes enabled', async function() {
    let submitBtn = await driver.findElement(By.css('.btn-lg'));
    await driver.findElement(By.css('input')).sendKeys('user@mail.com');
    await driver.wait(() => submitBtn.getCssValue('opacity').then((opacity) => opacity === '1'), 10000);
  });

  it('Success alert appears after submiting', async function() {
    let submitBtn = await driver.findElement(By.css('.btn-lg'));
    await driver.findElement(By.css('input')).sendKeys('user@mail.com');
    await driver.wait(() => submitBtn.getCssValue('opacity').then((opacity) =>opacity === '1'), 10000);
    await submitBtn.click();
    await driver.wait(until.elementLocated(By.css('.alert-success')), 5000)
    .getText()
    .then(text => console.log(`Success message appeared: ${text}`));
  });

  it('We have nav elements', async function() {
    await driver.findElements(By.css('nav li'))
    .then(array => array.map(el => el.getText().then(text => text !='' ? console.log(`Text of the nav element is: ${text}`) : null)));
  });

  it('Check Page title', async function() {
    await driver.getTitle().then(title => title === 'LibraryApp - Ember 3.0 Tutorial!!!' ? console.log('True') : console.log('False'));
  });
});