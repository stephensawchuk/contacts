angular.
  module('contacts').
  controller('ContactsCtrl', function ($filter, $scope, $state, Contacts, States, storage, Validation) {
    'use strict';

    /*jshint latedef:false */
    $scope.contacts = (storage.get('Contacts') || Contacts).sort(contactComparator);
    $scope.states = States;
    $scope.validation = Validation;


    // Begin by saving the Contacts to `localStorage`.
    saveContacts();


    // Some parts of the view need to know if a contact has been edited. Such an
    // example would be the warning icon that appears beside a contact's name,
    // indicating a change has been made to the contact's data.
    $scope.isContactEdited = function () {

      return !angular.equals($scope.contact, $scope.activeContact);
    };


    // This is executed both when a new contact is created, and when one is
    // edited.
    $scope.saveContact = function (ContactForm) {

      $scope.submitted = true;

      if (ContactForm.$valid) {

        if (!$scope.contacts[$scope.contact.id]) {

          // This contact didn't previously exist, so push it into the array.
          $scope.contacts.push($scope.contact);
        }

        // Now that we have a new data model, update `localStorage`.
        saveContacts();

        $scope.contacts.
          sort(contactComparator).
          forEach(function (contact, index) {

            // Since the contact list is being sorted alphabetically, a
            // contact's `id`, which is just its index in that array, is likely
            // to change. This does a deep comparison of data objects to see if
            // the `contact` object on the `$scope` matches this `contact`
            // object from the `$scope.contacts` array.
            if (angular.equals(contact, $scope.contact)) {

              // Update the `id` property on the active `$scope.contact` object.
              $scope.contact.id = index;
            }
          });

        // A contact has been successfully added or edited. Redirect the user to
        // the `view` page for said contact.
        $state.go('contacts.view', { id: $scope.contact.id });
      }
    };


    // Set `age` programmatically based on a contact's birthday.
    $scope.$watch('contact.birthday', function (birthday) {

      if ($scope.action !== 'view' && $scope.contact) {

        // We already have a filter called `age`, which accepts a string, such
        // as "1/1/1971", and will return the corresponding age. We can re-use
        // that function here to avoid duplicating logic.
        $scope.contact.age = $filter('age')(birthday);
      }
    });


    // Before the user changes states, make sure they're not leaving the `edit`
    // state without saving their changes.
    $scope.$on('$stateChangeStart', function (event, toState, params, fromState) {

      var confirmationMessage = [
        'Are you sure you want to leave?',
        'NOTE: Your changes will be discarded.'
      ].join('\n\n');

      // Check if a contact was being edited, but wasn't saved.
      if (fromState.name === 'contacts.edit' && $scope.isContactEdited() && !$scope.submitted) {

        // Make sure the user wishes to discard their changes to the contact.
        if (window.confirm(confirmationMessage)) {

          // Restore the cached copy of the contact.
          $scope.contacts[$scope.activeContact.id] = $scope.activeContact;
        } else {

          // The user wishes to continue editing. Prevent the state from
          // changing.
          event.preventDefault();
        }
      }
    });


    // On every successful state change, detect the action being taken, using
    // the URL as the source of truth:
    //
    //   - '#/1'       >  viewing a contact with an `id` of 1
    //   - '#/1/edit'  >  editing a contact with an `id` of 1
    //   - '#/create'  >  creating a contact
    //
    // The model is then updated to reflect the state of the application:
    //
    //   - $scope.action         >  'edit', 'view', or 'create'
    //   - $scope.activeContact  >  a copy of the active contact's data object
    //   - $scope.contact        >  the active contact's data object
    $scope.$on('$stateChangeSuccess', function (event, toState, params) {

      var id = parseInt(params.id);
      id = angular.isNumber(id) ? id : $scope.contacts.length;

      // Based on the `state` name specified in `app.js`, detect the action the
      // user is taking.
      $scope.action = toState.name.split('contacts.')[1];
      $scope.submitted = false;

      if ($scope.action === 'create') {

        $scope.activeContact = {};
        $scope.contact = {};
        $scope.contact.id = id;
      }

      if ($scope.action === 'edit' || $scope.action === 'view') {

        if ($scope.contacts[id]) {

          // The contact the user is trying to edit or view exists.
          $scope.contact = $scope.contacts[id];
          $scope.contact.id = id;

          // Cache a copy of the contact being viewed in the event we need to
          // revert to it later.
          $scope.activeContact = angular.copy($scope.contact);
        } else {

          // Contact does not exist. Send the user home.
          $scope.activeContact.id = undefined;
          $state.go('contacts');
        }
      }
    });


    // Compare two contacts to sort them by...
    //   - last name alphabetical
    //   - first name alphabetical
    function contactComparator(a, b) {

      var contact = [a, b].map(function (arg) {

        // naive split of 'FirstName LastName' format.
        var name = arg.name.split(' ');

        return {
          firstName: name[0],
          lastName: name[1]
        };
      });

      if (contact[0].lastName) {

        if (contact[1].lastName) {

          return contact[0].lastName > contact[1].lastName;
        } else {

          return -1;
        }
      } else {

        if (contact[1].lastName) {

          return 1;
        } else {

          return contact[0].firstName > contact[1].firstName;
        }
      }
    }


    // Save a copy of the Contacts to localStorage. Should the app need a more
    // permanent storage mechanism in the future, `storage` could be replaced
    // with `$resource` or just an `$http` call to an API endpoint.
    function saveContacts() {

      // `angular.copy()` gets rid of all of Angular's internal hashes and keys.
      storage.set('Contacts', angular.copy($scope.contacts));
    }
  });
