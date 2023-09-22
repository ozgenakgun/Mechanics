
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Admin Operations', function() {
  this.timeout(30000)
  let driver = new Builder().forBrowser('chrome').build()

  // some url
  const login = "http://localhost:3000/admin"
  const home = "http://localhost:3000/admin/home"
  const addClient = "http://localhost:3000/admin/home/addClient"
  const addStore = "http://localhost:3000/admin/home/addStore"

  async function redirectUrl(page) {
    let url;
    if (page === "home") url=home
    else if (page === "addClient") url=addClient
    else url=addStore

    driver.wait(until.urlIs(url))
    driver.navigate().to(url)
    await driver.sleep(2000)
  }

  it('login', async function() {
    // go to login page
    await driver.get(login)

    // input email
    await driver.findElement(By.css(".loginAdmin-email")).click()
    await driver.findElement(By.css(".loginAdmin-email")).sendKeys("admin@test.com")

    // input password
    await driver.findElement(By.css(".loginAdmin-pwd")).click()
    await driver.findElement(By.css(".loginAdmin-pwd")).sendKeys("123")

    // click login button
    await driver.findElement(By.css(".loginAdmin-submit")).click()
    
    // assert url changed
    redirectUrl("home")
  })

  it('check detail button', async function() {
    // click the detail button of the first account
    await driver.findElement(By.css(".Admin_Main_Page_Row_One:nth-child(1) > .Admin_Main_Page_RowDetailButton > button")).click()

    // check if match expected value
    assert(await driver.findElement(By.css(".admin_popup_table tr:nth-child(2) > td:nth-child(2)")).getText() == "client@test.com")

    // close the pop-up window
    await driver.findElement(By.css(".admin_popup_close")).click()
  })

  it('search engine', async function() {
    // click search engine and enter search key "store"
    await driver.findElement(By.css("input")).sendKeys("store")
    await driver.findElement(By.css(".ad_mp_search_button")).click()
    await driver.sleep(2000)

    // check the last element and click detail to check if match expected value
    await driver.findElement(By.css(".Admin_Main_Page_Row_One:nth-child(5) > .Admin_Main_Page_RowDetailButton > button")).click()
    assert(await driver.findElement(By.css(".admin_popup_table tr:nth-child(2) > td:nth-child(2)")).getText() == "store5@test.com")
    await driver.findElement(By.css(".admin_popup_close")).click()
  })

  it('clear search engine', async function() {
    // clear the search content and test again
    await driver.findElement(By.css("input")).clear()
    await driver.findElement(By.css("input")).sendKeys(" ")
    await driver.findElement(By.css(".ad_mp_search_button")).click()
    await driver.sleep(2000)

    // click detail to check
    await driver.findElement(By.css(".Admin_Main_Page_Row_One:nth-child(1) > .Admin_Main_Page_RowDetailButton > button")).click()
    assert(await driver.findElement(By.css(".admin_popup_table tr:nth-child(2) > td:nth-child(2)")).getText() == "client@test.com")
    await driver.findElement(By.css(".admin_popup_close")).click()
  })

  it('add client', async function() {
    // click link to enter another page
    await driver.findElement(By.linkText("New Client Account")).click()

    // redirect to
    redirectUrl("addClient")

    // input information for new client
    await driver.findElement(By.name("email")).sendKeys("admin.addclient@test.com")
    await driver.findElement(By.name("name")).sendKeys("admin added client")
    await driver.findElement(By.name("pwd")).sendKeys("123")
    await driver.findElement(By.name("pwd_confirm")).sendKeys("123")
    // select options
    let selectMake = await driver.findElement(By.name('make'))
    let optionMake = await selectMake.findElement(By.css("option[value='Audi']"));
    await optionMake.click()
    let selectModel = await driver.findElement(By.name("model"))
    let optionModel = await selectModel.findElement(By.css("option[value='Rav4']"));
    await optionModel.click()
    // submit
    await driver.findElement(By.name("submitBtn")).click()

    // redirect back to home
    redirectUrl("home")

    // search result in search engine and click detail button to check if match expected value
    await driver.findElement(By.css("input")).sendKeys("addclient")
    await driver.findElement(By.css(".ad_mp_search_button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.css(".Admin_Main_Page_RowDetailButton > button")).click()
    assert(await driver.findElement(By.css("tr:nth-child(2) > td:nth-child(2)")).getText() == "admin.addclient@test.com")
    await driver.findElement(By.css(".admin_popup_close")).click()
  })

  it('add store', async function() {
    // click to enter the add store page
    await driver.findElement(By.linkText("New Store Account")).click()
    redirectUrl("addStore")

    // input all information
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(3) > input")).sendKeys("admin add store")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(4) > input")).sendKeys("admin.addstore@test.com")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(5) > input")).sendKeys("123")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(6) > input")).sendKeys("123")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(8) > input")).sendKeys("Admin Added")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(9) > input")).sendKeys("111")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(10) > input")).sendKeys("123")
    await driver.findElement(By.css(".store_reg_page_input-box:nth-child(13) > input")).sendKeys("111")
    // select options
    let selectCity = await driver.findElement(By.css(".store_reg_page_input-box:nth-child(11) > select"))
    let optionCity = await selectCity.findElement(By.css("option[value='Vancouver']"));
    await optionCity.click()
    let selectProvince = await driver.findElement(By.css(".store_reg_page_input-box:nth-child(12) > select"))
    let optionProvince = await selectProvince.findElement(By.css("option[value='British Columbia']"));
    await optionProvince.click()

    // scroll down until see submit button, allow 2000 for webpage to settle down
    const submit_button = driver.findElement(By.css(".store_reg_page_button > input"))
    await driver.executeScript("arguments[0].scrollIntoView();", submit_button);
    await driver.sleep(3000)
    // click checkbox
    await driver.findElement(By.css("div:nth-child(4) > input:nth-child(1)")).click()
    await driver.findElement(By.css("div:nth-child(9) > input:nth-child(1)")).click()
    // submit
    await driver.findElement(By.css(".store_reg_page_button > input")).click()
    redirectUrl("home")
  })

  it('delete account', async function() {
    // clear search
    await driver.findElement(By.css("input")).clear()
    await driver.findElement(By.css("input")).sendKeys(" ")
    await driver.findElement(By.css(".ad_mp_search_button")).click()
    await driver.sleep(2000)

    // delete client
    await driver.findElement(By.css(".Admin_Main_Page_Row_One:nth-child(6) > .Admin_Main_Page_RowDeleteButton > button")).click()
    // delete store
    await driver.findElement(By.css(".Admin_Main_Page_Row_One:nth-child(11) > .Admin_Main_Page_RowDeleteButton > button")).click()
    await driver.quit()
  })
})
