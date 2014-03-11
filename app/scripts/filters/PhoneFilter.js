angular.
  module('contacts').
  filter('phone', function (Validation) {
    'use strict';

    // Input:
    //   - '1111111111'
    //   - '111-111-1111'
    //
    // Output:
    //   - '(111) 111-1111'
    function formatPhoneNumber(phoneNumber) {

      return phoneNumber.replace(Validation.phone, '($1) $2-$3');
    }

    return formatPhoneNumber.bind({});
  });
