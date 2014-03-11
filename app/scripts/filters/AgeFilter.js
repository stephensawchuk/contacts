angular.
  module('contacts').
  filter('age', function (Validation) {
    'use strict';

    // Input:
    //   - '1/1/1971'
    //   - '1-1-1971'
    //
    // Output:
    //   - 43
    function getAge(birthday) {

      if (!Validation.date.test(birthday)) {

        return undefined;
      }

      var today = new Date();
      birthday = new Date(birthday);

      return Math.floor((today - birthday) / 1000 / 60 / 60 / 24 / 365);
    }

    return getAge.bind({});
  });
