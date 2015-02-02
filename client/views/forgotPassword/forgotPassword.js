Template.entryForgotPassword.helpers({
  error: function() {
    return i18n(Session.get('entryError'));
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  }
});

Template.entryForgotPassword.events({
  'submit #forgotPassword': function(event) {
    event.preventDefault();
    Session.set('email', $('input[name="forgottenEmail"]').val());
    if (Session.get('email').length === 0) {
      Session.set('entryError', 'Email is required');
      return;
    }
    return Accounts.forgotPassword({
      email: Session.get('email')
    }, function(error) {
      if (error) {
        return Session.set('entryError', error.reason);
      } else {
        return Router.go(AccountsEntry.settings.homeRoute);
      }
    });
  }
});