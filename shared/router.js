var exclusions;

Router.route("entrySignIn", {
  path: "/sign-in",
  onBeforeAction: function() {
    Session.set('entryError', void 0);
    Session.set('buttonText', 'in');
    return this.next();
  },
  onRun: function() {
    var pkgRendered, userRendered;
    if (Meteor.userId()) {
      Router.go(AccountsEntry.settings.dashboardRoute);
    }
    if (AccountsEntry.settings.signInTemplate) {
      this.template = AccountsEntry.settings.signInTemplate;
      pkgRendered = Template.entrySignIn.rendered;
      userRendered = Template[this.template].rendered;
      if (userRendered) {
        Template[this.template].rendered = function() {
          pkgRendered.call(this);
          return userRendered.call(this);
        };
      } else {
        Template[this.template].rendered = pkgRendered;
      }
      Template[this.template].events(AccountsEntry.entrySignInEvents);
      Template[this.template].helpers(AccountsEntry.entrySignInHelpers);
    }
    return this.next();
  }
});
Router.route("entrySignUp", {
  path: "/sign-up",
  onBeforeAction: function() {
    Session.set('entryError', void 0);
    Session.set('buttonText', 'up');
    return this.next();
  },
  onRun: function() {
    var pkgRendered, userRendered;
    if (AccountsEntry.settings.signUpTemplate) {
      this.template = AccountsEntry.settings.signUpTemplate;
      pkgRendered = Template.entrySignUp.rendered;
      userRendered = Template[this.template].rendered;
      if (userRendered) {
        Template[this.template].rendered = function() {
          pkgRendered.call(this);
          return userRendered.call(this);
        };
      } else {
        Template[this.template].rendered = pkgRendered;
      }
      Template[this.template].events(AccountsEntry.entrySignUpEvents);
      Template[this.template].helpers(AccountsEntry.entrySignUpHelpers);
    }
    return this.next();
  }
});
Router.route("entryForgotPassword", {
  path: "/forgot-password",
  onBeforeAction: function() {
    Session.set('entryError', void 0);
    return this.next();
  }
});
Router.route('entrySignOut', {
  path: '/sign-out',
  onBeforeAction: function() {
    Session.set('entryError', void 0);
    if (AccountsEntry.settings.homeRoute) {
      Meteor.logout(function() {
        return Router.go(AccountsEntry.settings.homeRoute);
      });
    }
    return this.next();
  }
});
Router.route('entryResetPassword', {
  path: 'reset-password/:resetToken',
  onBeforeAction: function() {
    Session.set('entryError', void 0);
    Session.set('resetToken', this.params.resetToken);
    return this.next();
  }
});

exclusions = [];

_.each(Router.routes, function(route) {
  return exclusions.push(route.name);
});

Router.onStop(function() {
  var _ref;
  if (!_.contains(exclusions, (_ref = Router.current().route) !== null ? _ref.getName() : void 0)) {
    return Session.set('fromWhere', Router.current().path);
  }
});