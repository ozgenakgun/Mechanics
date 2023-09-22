
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Store Operations', function() {
  this.timeout(30000)
  let driver = new Builder().forBrowser('chrome').build()

  // some url
  const login = "http://localhost:3000"
  const home = "http://localhost:3000/storeHome"

  async function redirectUrl(page) {
    let url = page
    driver.wait(until.urlIs(url))
    driver.navigate().to(url)
    await driver.sleep(2000)
  }
  async function scrollDownTo(element) {
    let target = driver.findElement(By.css(element))
    await driver.executeScript("arguments[0].scrollIntoView();", target);
    await driver.sleep(2000)
  }

  it('login', async function() {
    // go to login page
    await driver.get(login)

    // choose type, input email and pwd, then submit
    await driver.findElement(By.css(".loginUser-BtnStore")).click()
    await driver.findElement(By.css(".loginUser-email")).sendKeys("store@test.com")
    await driver.findElement(By.css(".loginUser-pwd")).sendKeys("123")
    await driver.findElement(By.css(".loginUser-submit")).click()

    // assert url changed
    redirectUrl(home)
  })
})
