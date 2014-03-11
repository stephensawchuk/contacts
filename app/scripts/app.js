angular.
  module('contacts', ['ui.router', 'angularLocalStorage']).
  config(function  ($stateProvider, $urlRouterProvider) {
    'use strict';

    // Register our `states`, assigning them each with a matching URL and
    // template.
    $stateProvider.

      // The main state of the application.
      //
      // Note that this is the only state which defines a controller. Even
      // though we have 3 other states, the functionality can be shared amongst
      // this one parent controller, `ContactsCtrl`.
      //
      // Should there be a need for more custom functionality specific to an
      // individual state, adding in a new controller is trivial, and you still
      // have access to the parent controller as well.
      state('contacts', {
        controller: 'ContactsCtrl',
        templateUrl: 'views/contacts.html',

        // #/
        url: '/'
      }).

      // These are sub-views, which will be layered inside of the `contacts`
      // view. See `views/contacts.html` for the `ui-view` directive. This is
      // where the content from each of the following `templateUrl`s will be
      // inserted.
      //
      // Also note that these three share one view. We handle the logic of
      // toggling elements' visibility based on the active state detected by the
      // parent controller, `ContactsCtrl`.
      state('contacts.create', {
        templateUrl: 'views/contact.html',

        // #/create
        url: 'create'
      }).
      state('contacts.edit', {
        templateUrl: 'views/contact.html',

        // #/1/edit
        url: ':id/edit'
      }).
      state('contacts.view', {
        templateUrl: 'views/contact.html',

        // #/1
        url: ':id'
      });

    $urlRouterProvider.otherwise('/');
  });
