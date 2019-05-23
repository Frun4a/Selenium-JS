var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get('https://library-app.firebaseapp.com/');

driver.findElement(By.css('input'))
  .sendKeys('user@email.com');
 // .then(el => console.log('Success, input found ' + el));

driver.findElement(By.css('.btn-lg'))
  .click();
  // .getText()
  // .then(text => console.log(`The text of the button: ${text}`));

driver.findElement(By.css('.alert-success'))
  .getText()
  .then(text => console.log(`Success message appeared: ${text}`));

driver.findElements(By.css('nav li'))
  .then(array => array.map(el => el.getText().then(text => text !='' ? console.log(`Text of the nav element is: ${text}`) : null)));

setTimeout(() => driver.quit(), 5000);



