describe('contacts', function () {
  'use strict';

  describe('homepage', function () {
    beforeEach(function () {
      browser.get('http://localhost:9000');
    });

    it('should show three default contacts on first load', function () {
      expect(element.all(by.repeater('contact in contacts')).count()).toEqual(3);
    });

    it('should have two ways to create a new contact from the homepage', function () {
      expect(element.all(by.css('[ui-sref="contacts.create"]')).count()).toEqual(2);
    });
  });

  describe('viewing a contact', function () {
    var contact = {
      name: 'Zoey Barnes',
      sex: 'female',
      age: 26,
      birthday: '3/25/1987',
      address: {
        street: '456 Somewhere Else',
        city: 'Annapolis',
        state: 'MD',
        postcode: '21401'
      },
      phone: '555-555-5555',
      email: 'zbarnes@slugline.com'
    };

    beforeEach(function () {
      browser.get('http://localhost:9000/#/0');
    });

    it('should display a picture', function () {
      expect(element.all(by.css('img')).count()).toEqual(1);
    });

    it('should display their sex', function () {
      expect(element(by.binding('contact.sex')).getText()).toEqual(contact.sex);
    });

    it('should display their age beside their birthday and age', function () {
      expect(element(by.binding('contact.birthday')).getText()).toEqual(contact.birthday + ' (' + contact.age + ')');
    });

    it('should display their address', function () {
      expect(element(by.binding('contact.address')).getText()).toEqual(
        contact.address.street +
        '\n' + contact.address.city + ', ' + contact.address.state + ' ' + contact.address.postcode
      );
    });

    it('should display their phone number', function () {
      expect(element(by.binding('contact.phone')).getText()).toEqual('(555) 555-5555');
    });

    it('should display their email address', function () {
      expect(element(by.binding('contact.email')).getText()).toEqual(contact.email);
    });

    it('should show an edit button', function () {
      expect(element(by.css('[ui-sref^="contacts.edit"]')).isPresent()).toBe(true);
    });
  });

  describe('editing a contact', function () {
    var contact = {
      name: 'Zoey Barnes',
      sex: 'female',
      age: 26,
      birthday: '3/25/1987',
      address: {
        street: '456 Somewhere Else',
        city: 'Annapolis',
        state: 'MD',
        postcode: '21401'
      },
      phone: '555-555-5555',
      email: 'zbarnes@slugline.com'
    };

    beforeEach(function () {
      browser.get('http://localhost:9000/#/0/edit');
    });

    it('should allow editing of the name', function () {
      expect(element(by.model('contact.name')).isPresent());
    });

    it('should allow editing of the sex', function () {
      expect(element(by.model('contact.sex')).isPresent());
    });

    it('should allow editing of the birthday', function () {
      expect(element(by.model('contact.birthday')).isPresent());
    });

    it('should allow editing of the street', function () {
      expect(element(by.model('contact.address.street')).isPresent());
    });

    it('should allow editing of the city', function () {
      expect(element(by.model('contact.address.city')).isPresent());
    });

    it('should allow editing of the state', function () {
      expect(element(by.model('contact.address.state')).isPresent());
    });

    it('should allow editing of the postcode', function () {
      expect(element(by.model('contact.address.postcode')).isPresent());
    });

    it('should allow editing of the phone number', function () {
      expect(element(by.model('contact.phone')).isPresent());
    });

    it('should allow editing of the email address', function () {
      expect(element(by.model('contact.email')).isPresent());
    });

    it('should show a save button', function () {
      expect(element(by.css('button[type="submit"]')).isPresent()).toBe(true);
    });

    it('should not save if the birthday is in an invalid format', function () {
      var birthdayInput = element(by.model('contact.birthday'));

      birthdayInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).toBe(-1);
      });

      birthdayInput.sendKeys('xxx');

      birthdayInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).not.toBe(-1);
      });
    });

    it('should not save if the postcode is in an invalid format', function () {
      var postcodeInput = element(by.model('contact.address.postcode'));

      postcodeInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).toBe(-1);
      });

      postcodeInput.sendKeys('xxx');

      postcodeInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).not.toBe(-1);
      });
    });

    it('should not save if the phone number is in an invalid format', function () {
      var phoneInput = element(by.model('contact.phone'));

      phoneInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).toBe(-1);
      });

      phoneInput.sendKeys('xxx');

      phoneInput.getAttribute('class').then(function (value) {
        expect(value.indexOf('ng-invalid')).not.toBe(-1);
      });
    });

    it('should show a warning icon next to a contact\'s name when editing', function () {
      var contactInMenu = element(by.repeater('contact in contacts').row(0));
      var warningIcon = contactInMenu.element(by.css('.glyphicon-warning-sign'));

      expect(warningIcon.isPresent()).toBe(false);

      element(by.model('contact.name')).sendKeys('xxx');

      expect(warningIcon.isPresent()).toBe(true);
    });

    it('should confirm you wish to leave before exiting', function () {
      element(by.model('contact.name')).sendKeys('xxx');

      element(by.css('[ui-sref="contacts.create"]')).click();

      var alert = browser.switchTo().alert();

      expect(alert.getText()).
        toEqual('Are you sure you want to leave?\n\nNOTE: Your changes will be discarded.');

      alert.dismiss();
    });
  });

  describe('creating a contact', function () {
    var contact = {
      name: 'Sam Samington',
      sex: 'male',
      age: 50,
      birthday: '1/1/1964',
      address: {
        street: '123 Street St.',
        city: 'City',
        state: 'AL',
        postcode: '48316'
      },
      phone: '123-456-7890',
      email: 'email@emailaddress.com'
    };

    function enterField(model, value) {
      element(by.model(model)).sendKeys(value);
    }

    beforeEach(function () {
      browser.get('http://localhost:9000/#/create');
    });

    it('should allow entering your name', function () {
      enterField('contact.name', contact.name);
    });

    it('should allow entering your sex', function () {
      element(by.model('contact.sex')).element(by.css('option:nth-child(2)')).click();
    });

    it('should allow entering your birthday', function () {
      enterField('contact.birthday', contact.birthday);
    });

    it('should display calculated age', function () {
      enterField('contact.birthday', contact.birthday);
      expect(element(by.model('contact.age')).getAttribute('value')).toBe('' + contact.age);
    });

    it('should allow entering your street', function () {
      enterField('contact.address.street', contact.address.street);
    });

    it('should allow entering your city', function () {
      enterField('contact.address.city', contact.address.city);
    });

    it('should allow entering your state', function () {
      element(by.model('contact.address.state')).element(by.css('option:nth-child(2)')).click();
    });

    it('should allow entering your postcode', function () {
      enterField('contact.address.postcode', contact.address.postcode);
    });

    it('should allow entering your phone number', function () {
      enterField('contact.phone', contact.phone);
    });

    it('should allow entering your email address', function () {
      enterField('contact.email', contact.email);
    });

    it('should show a save button', function () {
      expect(element(by.css('button[type="submit"]')).isPresent()).toBe(true);
    });

    describe('saves the contact', function () {
      beforeEach(function () {
        enterField('contact.name', contact.name);
        element(by.model('contact.sex')).element(by.css('option:nth-child(2)')).click();
        enterField('contact.birthday', contact.birthday);
        enterField('contact.address.street', contact.address.street);
        enterField('contact.address.city', contact.address.city);
        element(by.model('contact.address.state')).element(by.css('option:nth-child(2)')).click();
        enterField('contact.address.postcode', contact.address.postcode);
        enterField('contact.phone', contact.phone);
        enterField('contact.email', contact.email);
      });

      it('should save the new contact', function () {
        expect(element.all(by.repeater('contact in contacts')).count()).toBe(3);

        element(by.css('button[type="submit"]')).click();

        expect(element.all(by.repeater('contact in contacts')).count()).toBe(4);
      });

      it('should alphabetize the contacts', function () {
        expect(element(by.repeater('contact in contacts').row(0)).getText()).toBe('Zoey Barnes');
        expect(element(by.repeater('contact in contacts').row(1)).getText()).toBe('Sam Samington');
        expect(element(by.repeater('contact in contacts').row(2)).getText()).toBe('Doug Stamper');
        expect(element(by.repeater('contact in contacts').row(3)).getText()).toBe('Francis Underwood');
      });

      it('should switch to viewing mode', function () {
        element(by.css('button[type="submit"]')).click();
        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/#/2');
      });
    });
  });
});
