Meteor.startup(function() {
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
  AccountsEntry = {
    settings: {},
    config: function(appConfig) {
      return this.settings || _.extend(this.settings, appConfig);
    }
  };
   this.AccountsEntry = AccountsEntry;
});
Meteor.methods({
  entryValidateSignupCode: function(signupCode) {
    check(signupCode, Match.OneOf(String, null, undefined));
    return !AccountsEntry.settings.signupCode || signupCode === AccountsEntry.settings.signupCode;
  },
  entryCreateUser: function(user) {
    var profile, userId;

    check(user, Object);
    profile = AccountsEntry.settings.defaultProfile || {};

    if (user.username) {
      userId = Accounts.createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        profile: _.extend(profile, user.profile)
      });
    } else {
      userId = Accounts.createUser({email: user.email, password: user.password, profile: _.extend(profile, user.profile)});
    }
    if (user.email && Accounts._options.sendVerificationEmail) {
      Accounts.sendVerificationEmail(userId, user.email);
    }
  }
});
