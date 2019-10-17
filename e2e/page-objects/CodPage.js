var util = require('util');
var CodFilingsCommands = {
    verfifyInitialCodState: function (coopObject) {
      return this
        .assert.containsText('#filing-header', 'Change of Directors')
        .assert.containsText('#AR-step-4-header', 'Certify Correct')
        .assert.containsText('dd.incorp-number', coopObject.identifier)
        .assert.containsText('div.entity-name', coopObject.legal_name)
        .assert.visible('@saveDraftButton')
        .assert.visible('@saveAndResumeLaterButton')
        .assert.visible('@cancelFilingButton')
        .assert.visible('@fileAndPayButton');
    },
    checkFeeByIndex: function (feeName, feeValue, desiredIndex) {
        return this
            .assert.containsText({selector: '@feeName', index: desiredIndex}, feeName)
            .assert.containsText({selector: '@feeValue', index: desiredIndex}, feeValue)
    },
    checkFeeCount: function (expectedCount) {
        return this.expect.elements('@feeListItem').count.to.equal(expectedCount);
    },
    checkTotalFees: function (expectedTotalString) {
        return this.assert.containsText('@feeTotal', expectedTotalString)
    },
    startAppointingNewDirector: function () {
        return this 
        .waitForElementVisible('@AppointNewDirectorButton')
        .click('@AppointNewDirectorButton')
    },
    AddNewDirector: function () {
        return this.waitForElementVisible('@firstname')
        .waitForElementNotVisible('button.new-director-btn')
        .setValue('@firstname','test')
        .waitForElementVisible('@initial')
        .setValue('@initial','test1')
        .waitForElementVisible('@lastname')
        .setValue('@lastname','test3')
        .waitForElementVisible('@streetaddress')
        .setValue('@streetaddress','123 test st')
        .waitForElementVisible('@additionalstreet')
        .setValue('@additionalstreet','I am an optional field')
        .useXpath()
        .waitForElementVisible('//*[@id="directors"]/div[3]/ul[1]/li/div/div/form/div[2]/form/div[3]/div[1]/div/div[1]/div/input')
        .setValue('//*[@id="directors"]/div[3]/ul[1]/li/div/div/form/div[2]/form/div[3]/div[1]/div/div[1]/div/input','victoria')
        .useCss()
        .waitForElementVisible('@province')
        .click('@province')
        .click('@BC')
        .waitForElementVisible('@postalcode')
        .setValue('@postalcode','V1V1V1')
        .waitForElementVisible('@country')
        .setValue('@country','CA')
        .waitForElementVisible('@deliveryinstructions')
        .setValue('@deliveryinstructions','thankyou')
        .waitForElementVisible('@completeAppointingDirector')
        .click('@completeAppointingDirector')
        .assert.visible('@edit')
    },
   AssertDirectors: function(elementName, data) {
    var element = this.elements[elementName.slice(1)];
    return util.format(element.selector, data);
   },
};
module.exports={
    commands:[CodFilingsCommands],
    elements:{
        feeName: "div.fee-list__item-name",
        feeValue: "div.fee-list__item-value",
        feeListItem: "li.fee-list__item",
        feeTotal: "div.fee-total__value",
        AppointNewDirectorButton: "#directors > div:nth-child(2) > button > div",
        firstname: "#new-director__first-name",
        initial: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.form__row.three-column > div.v-input.item.director-initial.v-text-field.v-text-field--box.v-text-field--enclosed.theme--light > div > div.v-input__slot > div > input[type=text]",
        lastname: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.form__row.three-column > div:nth-child(3) > div > div.v-input__slot > div > input[type=text]",
        streetaddress: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div:nth-child(1) > div > div > div.v-input__slot > div > input[type=text]",
        additionalstreet: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div:nth-child(2) > div > div > div.v-input__slot > div > input[type=text]",
        postalcode: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div.form__row.three-column > div:nth-child(3) > div > div.v-input__slot > div > input[type=text]",
        deliveryinstructions: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div:nth-child(5) > div > div > div.v-input__slot > div > textarea",
        province: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div.form__row.three-column > div.v-input.item.v-text-field.v-text-field--box.v-text-field--enclosed.v-select.theme--light > div > div.v-input__slot > div.v-select__slot > div.v-select__selections",
        BC: "#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(1) > a > div > div",
        country: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.meta-container__inner > form > div:nth-child(4) > div > div > div.v-input__slot > div > input[type=text]",
        certifyLegalName: "#certified-by-textfield",
        certifyCheckBox: "#AR-step-4-container > div > div.v-input.v-input--selection-controls.v-input--checkbox.theme--light > div > div.v-input__slot > div > div",
        saveAndResumeLaterButton: "#cod-save-resume-btn",
        saveDraftButton: "#cod-save-btn",
        fileAndPayButton: "#cod-file-pay-btn",
        cancelFilingButton: "#cod-cancel-btn",
        edit:"#director-7-change-btn > div > span",
        completeAppointingDirector: "#directors > div.v-card.v-card--flat.v-sheet.theme--light > ul.list.new-director > li > div > div > form > div.form__row.form__btns > button.form-primary-btn.v-btn.theme--light.primary > div",
        FIRSTNAME: "#director-%s > div > div > label > span:nth-child(1)",
        LASTNAME: "#director-%S > div > div > label > span:nth-child(3)",
        street: "#director-%s> div > div > div > div > div.address > div > div > div > div:nth-child(1)",
        city: "#director-%s > div > div > div > div > div.address > div > div > div > div:nth-child(3) > span:nth-child(1)",
        postalCode:"#director-%s > div > div > div > div > div.address > div > div > div > div:nth-child(3) > span:nth-child(3)"

    },
}
