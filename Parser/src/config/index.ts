import path from 'path';

export const config = {
  urls: {
    base: 'https://www.carsensor.net/usedcar/bMI/s014',
    getPageUrl: (pageNumber: number): string => {
      return pageNumber === 1
        ? `${config.urls.base}/index.html`
        : `${config.urls.base}/index${pageNumber}.html`;
    }
  },
  
  directories: {
    download: path.join(process.cwd(), 'html_pages'),
    output: path.join(process.cwd(), 'parsed_data')
  },
  
  selectors: {
    carCassette: '.cassetteWrap',
    cassetteId: '.cassette',
    make: '.cassetteMain__carInfoContainer > p',
    model: '.cassetteMain__title a',
    totalPrice: '.totalPrice__mainPriceNum',
    totalPriceUnit: '.totalPrice__unit',
    basePrice: '.basePrice__mainPriceNum',
    basePriceUnit: '.basePrice__unit',
    year: 'dt:contains("年式") + dd .specList__emphasisData',
    mileage: 'dt:contains("走行距離") + dd .specList__emphasisData',
    transmission: 'dt:contains("ミッション") + dd',
    engineSize: 'dt:contains("排気量") + dd',
    inspection: 'dt:contains("車検") + dd',
    repairHistory: 'dt:contains("修復歴") + dd',
    warranty: 'dt:contains("保証") + dd',
    color: '.carBodyInfoList__item:last-child',
    colorTip: '.cassetteColorTip',
    shopName: '.cassetteSub__shop .js_shop a',
    shopPrefecture: '.cassetteSub__area p:first-child',
    shopCity: '.cassetteSub__area p:last-child',
    mainImage: '.cassetteMain__mainImg img',
    additionalImages: '.cassetteMain__subImg img',
    detailLink: '.cassetteMain__title a'
  },
  
  puppeteer: {
    headless: true,
    args: ['--no-sandbox'],
    timeout: 10000,
    waitAfterLoad: 3000,
    delayBetweenPages: 2000
  },
  
  parsing: {
    maxPages: 1,
    minHtmlSize: 1000
  }
};