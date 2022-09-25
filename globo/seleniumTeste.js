const {Builder, By} = require('selenium-webdriver');
const assert = require('assert'); 
require("chromedriver");

(async function helloSelenium() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost/globo/links/');
    const originalWindow = await driver.getWindowHandle();

    //Check we don't have other windows open already
    assert((await driver.getAllWindowHandles()).length === 1);

    //Click the link which opens in a new window
    await driver.findElement(By.id('open_screenshots')).click();

    await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
        10000
    );
    await driver.switchTo().window(originalWindow);

    let botao_add = await driver.findElement(By.id('inserir'));
    await botao_add.click();

    let input_link = await driver.findElement(By.id('link'));
    let botao_submit = await driver.findElement(By.id('botao_submit'));

    await input_link.sendKeys('https://www.instagram.com/');
    await botao_submit.click();
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    await input_link.sendKeys('https://twitter.com/');
    await botao_submit.click();
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    await input_link.sendKeys('https://cataas.com/cat');
    await botao_submit.click();
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    await input_link.sendKeys('https://www.cnnbrasil.com.br/');
    await botao_submit.click();
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    let listar_links = await driver.findElement(By.id('listar'));
    await listar_links.click();

    const timeout = setTimeout(async () => {

        let botao_add = await driver.findElement(By.id('remover'));
        await botao_add.click();

        await input_link.sendKeys('https://www.cnnbrasil.com.br/');
        await botao_submit.click();
        
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        console.log(alertText);
        await alert.accept();

        await input_link.sendKeys('https://www.youtube.com.br/');
        await botao_submit.click();
        
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        console.log(alertText);
        await alert.accept();

        //await driver.switchTo().alert().accept();
        await listar_links.click();
        clearTimeout(timeout);
    }, 90000);
    

})();