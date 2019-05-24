var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);


async function main() {

  const driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

  await driver.get('https://library-app.firebaseapp.com/');
  await driver.manage().setTimeouts( {implicit: 5000} );

  await driver.findElement(By.css('input')).sendKeys('user@email.com');

  await driver.findElement(By.css('.btn-lg')).click();
  await driver.sleep(1000);

  await driver.findElement(By.css('.alert-success'))
    .getText()
    .then(text => console.log(`Success message appeared: ${text}`));

  await driver.findElements(By.css('nav li'))
    .then(array => array.map(el => el.getText().then(text => text !='' ? console.log(`Text of the nav element is: ${text}`) : null)));

  await setTimeout(() => driver.quit(), 100);
}

main();




