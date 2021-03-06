const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://e2e-boilerplate.github.io/sandbox/");
  }, 20000);

  afterAll(() => {
    browser.quit();
  });

  it("should be on Sandbox", async () => {
    const title = await browser.getTitle();
    const header = await browser.findElement(By.css("h1"));

    expect(title).toEqual("Sandbox");
    expect(await header.getText()).toEqual("Sandbox");
  });
});
