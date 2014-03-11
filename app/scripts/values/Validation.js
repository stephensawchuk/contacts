angular.
  module('contacts').
  value('Validation', {

    // 1/1/1971
    // 1-1-1971
    date: /^\d+[-\/]\d+[-\/]\d{4}$/,

    // 111-111-1111
    // 1111111111
    phone: /^(\d{3})-*(\d{3})-*(\d{4})$/,

    // 11111
    // 11111-1111
    postcode: /^\d{5}(-\d{4})?$/
  });
