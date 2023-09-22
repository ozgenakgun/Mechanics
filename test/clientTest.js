
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Client Operations', function() {
  this.timeout(30000)
  let driver = new Builder().forBrowser('chrome').build()

  // some url
  const login = "http://localhost:3000"
  const home = "http://localhost:3000/clientHome"
  const storeDetail = "http://localhost:3000/storeDetail"
  const clientReservation = "http://localhost:3000/clientReservation"
  const appointments = "http://localhost:3000/appointments"
  const history = "http://localhost:3000/client/history"

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
    await driver.findElement(By.css(".loginUser-BtnClient")).click()
    await driver.findElement(By.css(".loginUser-email")).sendKeys("client@test.com")
    await driver.findElement(By.css(".loginUser-pwd")).sendKeys("123")
    await driver.findElement(By.css(".loginUser-submit")).click()

    // assert url changed
    redirectUrl(home)
  })

  it('see store details', async function() {
    // click a store and enter store detail page
    await driver.findElement(By.css(".cl_mp_sel_section:nth-child(1) > .cl_mp_img")).click()
    redirectUrl("storeDetail")

    // assert page value
    assert(await driver.findElement(By.css(".store_detail_info tr:nth-child(1) > td:nth-child(2)")).getText() == "Mitchell, Swift and Lueilwitz")
  })

  // it("make appointment", async function() {
  //   // scroll down until see submit button, allow 2000 for webpage to settle down
  //   scrollDownTo(".storehome_table")

  //   // go to next week
  //   await driver.findElement(By.css(".storehome_arr_icon:nth-child(3)")).click()
  //   await driver.sleep(2000)

  //   // select a time
  //   scrollDownTo("tr:nth-child(2) > td:nth-child(2) div")
  //   await driver.findElement(By.css("tr:nth-child(2) > td:nth-child(2) div")).click()

  //   // url changed
  //   redirectUrl(clientReservation)

  //   // fill in information
  //   // user info
  //   await driver.findElement(By.css(".appo_submi_auto_fill_btn")).click()
  //   // car info
  //   scrollDownTo(".appo_submi_select_car")
  //   let selectCar = await driver.findElement(By.css(".appo_submi_select_car"))
  //   let optionCar = await selectCar.findElement(By.css("option[value='Car 1: Toyota-4Runner']"))
  //   await optionCar.click()
  //   // problem info
  //   scrollDownTo(".appo_submi_select_category")
  //   let selectCate = await driver.findElement(By.css(".appo_submi_select_category"))
  //   let optionCate = await selectCate.findElement(By.css("option[value='Oil Change']"))
  //   await optionCate.click()

  //   // submit
  //   await driver.findElement(By.css("input:nth-child(1)")).click()

  //   // click 'ok' for alert
  //   assert(await driver.switchTo().alert().getText() == "Appointment Submitted!\nPress OK to back to the home page.")
  //   await driver.switchTo().alert().accept()
  //   redirectUrl(home)
  // })

  // it('make second and third appointment', async function() {
  //   // Second Appointment
  //   // click a store and enter store detail page
  //   await driver.findElement(By.css(".cl_mp_sel_section:nth-child(1) > .cl_mp_img")).click()
  //   redirectUrl("storeDetail")
  //   // scroll down until see submit button, allow 2000 for webpage to settle down
  //   scrollDownTo(".storehome_table")
  //   // go to next week
  //   await driver.findElement(By.css(".storehome_arr_icon:nth-child(3)")).click()
  //   // select a time
  //   await driver.findElement(By.css("tr:nth-child(3) > td:nth-child(2) div")).click()
  //   // url changed
  //   redirectUrl(clientReservation)
  //   // fill in information
  //   await driver.findElement(By.css(".appo_submi_auto_fill_btn")).click()
  //   let selectCar = await driver.findElement(By.css(".appo_submi_select_car"))
  //   let optionCar = await selectCar.findElement(By.css("option[value='Car 2: Toyota-Corolla']"));
  //   await optionCar.click()
  //   let selectCate = await driver.findElement(By.css(".appo_submi_select_category"))
  //   let optionCate = await selectCate.findElement(By.css("option[value='Batteries & Electrical']"));
  //   await optionCate.click()
  //   // submit
  //   await driver.findElement(By.css("input:nth-child(1)")).click()
  //   // click 'ok' for alert
  //   assert(await driver.switchTo().alert().getText() == "Appointment Submitted!\nPress OK to back to the home page.")
  //   await driver.switchTo().alert().accept()
  //   redirectUrl(home)

  //   // Third Appointment
  //   // click a store and enter store detail page
  //   await driver.findElement(By.css(".cl_mp_sel_section:nth-child(1) > .cl_mp_img")).click()
  //   redirectUrl("storeDetail")
  //   // scroll down until see submit button, allow 2000 for webpage to settle down
  //   scrollDownTo(".storehome_table")
  //   // go to next week
  //   await driver.findElement(By.css(".storehome_arr_icon:nth-child(3)")).click()
  //   // select a time
  //   await driver.findElement(By.css("tr:nth-child(4) > td:nth-child(2) div")).click()
  //   // url changed
  //   redirectUrl(clientReservation)
  //   // fill in information
  //   await driver.findElement(By.css(".appo_submi_auto_fill_btn")).click()
  //   selectCar = await driver.findElement(By.css(".appo_submi_select_car"))
  //   optionCar = await selectCar.findElement(By.css("option[value='Car 3: Others-Rav4']"));
  //   await optionCar.click()
  //   selectCate = await driver.findElement(By.css(".appo_submi_select_category"))
  //   optionCate = await selectCate.findElement(By.css("option[value='Exhaust System']"));
  //   await optionCate.click()
  //   // submit
  //   await driver.findElement(By.css("input:nth-child(1)")).click()
  //   // click 'ok' for alert
  //   assert(await driver.switchTo().alert().getText() == "Appointment Submitted!\nPress OK to back to the home page.")
  //   await driver.switchTo().alert().accept()
  //   redirectUrl(home)
  // })

  // it('check history order', async function() {
  //   // redirect to historical order page
  //   await driver.findElement(By.css(".nav-link:nth-child(3) > .nav_bar_not")).click()
  //   redirectUrl(history)

  //   // search engine
  //   await driver.findElement(By.css("div:nth-child(1) > input")).sendKeys("2023-4-10")
  //   await driver.findElement(By.css("div:nth-child(3) > input")).sendKeys("store@test.com")
  //   await driver.findElement(By.css(".appointment_store_analysis_btn:nth-child(4) > input")).click()

  //   // assert result value
  //   let firstRecord = await driver.findElement(By.css(".appointment_store_client_info .appointment_store_Table_One:nth-child(1)"))
  //   let secondRecord = await driver.findElement(By.css(".appointment_store_client_info .appointment_store_Table_One:nth-child(2)"))
  //   let thirdRecord = await driver.findElement(By.css(".appointment_store_client_info .appointment_store_Table_One:nth-child(3)"))

  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(1) .appointment_store_td:nth-child(1)")).getText() == "Mitchell, Swift and Lueilwitz")
  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(2) .appointment_store_td:nth-child(2)")).getText() == "Waiting Approval")
  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(3) .appointment_store_td:nth-child(2)")).getText() == "store@test.com")
  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(4) .appointment_store_td:nth-child(2)")).getText() == "2013-4-10 8:00-9:00")
  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(5) .appointment_store_td:nth-child(2)")).getText() == "Toyota / 4Runner / 2006 / 100.2 km / Manual / Others")
  //   assert(await firstRecord.findElement(By.css(".appointment_store_tr:nth-child(6) .appointment_store_td:nth-child(2)")).getText() == "Oil Change")

  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(1) .appointment_store_td:nth-child(1)")).getText() == "Mitchell, Swift and Lueilwitz")
  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(2) .appointment_store_td:nth-child(2)")).getText() == "Waiting Approval")
  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(3) .appointment_store_td:nth-child(2)")).getText() == "store@test.com")
  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(4) .appointment_store_td:nth-child(2)")).getText() == "2013-4-10 9:00-10:00")
  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(5) .appointment_store_td:nth-child(2)")).getText() == "Toyota / Corolla / 2010 / 1056.1 km / Others / 4x4")
  //   assert(await secondRecord.findElement(By.css(".appointment_store_tr:nth-child(6) .appointment_store_td:nth-child(2)")).getText() == "Batteries & Electrical")

  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(1) .appointment_store_td:nth-child(1)")).getText() == "Mitchell, Swift and Lueilwitz")
  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(2) .appointment_store_td:nth-child(2)")).getText() == "Waiting Approval")
  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(3) .appointment_store_td:nth-child(2)")).getText() == "store@test.com")
  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(4) .appointment_store_td:nth-child(2)")).getText() == "2013-4-10 10:00-11:00")
  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(5) .appointment_store_td:nth-child(2)")).getText() == "Others / Rav4 / 1999 / 1439 km / Manual / Others")
  //   assert(await thirdRecord.findElement(By.css(".appointment_store_tr:nth-child(6) .appointment_store_td:nth-child(2)")).getText() == "Exhaust System")
  // })

  // it('cancel one appointment', async function() {
  //   await driver.findElement(By.css(".nav-link:nth-child(2) > .nav_bar_not")).click()
  //   await driver.executeScript("window.scrollTo(0,0)")
  //   await driver.findElement(By.css(".appointment_store_Table_One:nth-child(4) button")).click()

  //   await driver.findElement(By.css(".nav-link:nth-child(1) > .nav_bar_not")).click()
  //   {
  //     const element = await driver.findElement(By.css(".nav_bar_selected"))
  //     await driver.actions({ bridge: true }).moveToElement(element).perform()
  //   }
  //   {
  //     const element = await driver.findElement(By.CSS_SELECTOR, "body")
  //     await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
  //   }
  // })

  // it('check store availability', async function() {
  //   await driver.findElement(By.css(".cl_mp_sel_section:nth-child(1) > .cl_mp_img")).click()
  //   redirectUrl("storeDetail")

  //   // scroll down until see submit button, allow 2000 for webpage to settle down
  //   scrollDownTo(".storehome_table")

  //   // go to next week
  //   await driver.findElement(By.css(".storehome_arr_icon:nth-child(2)")).click()
    
  //   // assert availability

  // })
})
