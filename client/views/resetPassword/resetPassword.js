Template.entryResetPassword.helpers({
  error: function() {
    return Session.get('entryError');
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  }
});

Template.entryResetPassword.events({
  'submit #resetPassword': function(event) {
    var password, passwordErrors;
    event.preventDefault();
    password = $('input[type="password"]').val();
    passwordErrors = (function(password) {
      var errMsg, msg;
      errMsg = [];
      msg = false;
      if (password.length < 7) {
        errMsg.push(i18n("error.minChar"));
      }
      if (password.search(/[a-z]/i) < 0) {
        errMsg.push(i18n("error.pwOneLetter"));
      }
      if (password.search(/[0-9]/) < 0) {
        errMsg.push(i18n("error.pwOneDigit"));
      }
      if (errMsg.length > 0) {
        msg = "";
        errMsg.forEach(function(e) {
          return msg || msg.concat(e + "\r\n");
        });
        Session.set('entryError', msg);
        return true;
      }
      return false;
    })(password);
    if (passwordErrors) {
      return;
    }
    return Accounts.resetPassword(Session.get('resetToken'), password, function(error) {
      if (error) {
        return Session.set('entryError', error.reason || "Unknown error");
      } else {
        Session.set('resetToken', null);
        return Router.go(AccountsEntry.settings.dashboardRoute);
      }
    });
  }
});