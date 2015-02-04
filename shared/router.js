var exclusions;

Router.route("entrySignIn", {
  path: "/sign-in",
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('buttonText', 'in');
    this.next();
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
    this.next();
  }
});
Router.route("entrySignUp", {
  path: "/sign-up",
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('buttonText', 'up');
    this.next();
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
          userRendered.call(this);
        };
      } else {
        Template[this.template].rendered = pkgRendered;
      }
      Template[this.template].events(AccountsEntry.entrySignUpEvents);
      Template[this.template].helpers(AccountsEntry.entrySignUpHelpers);
    }
    this.next();
  }
});
Router.route("entryForgotPassword", {
  path: "/forgot-password",
  onBeforeAction: function() {
    Alerts.clear();
    this.next();
  }
});
Router.route('entrySignOut', {
  path: '/sign-out',
  template: 'entrySignOut',
  onBeforeAction: function() {
    Alerts.clear();
    if (AccountsEntry.settings.homeRoute) {
      Meteor.logout();
    }
    this.next();
  },
  onAfterAction: function() {
    Router.go(AccountsEntry.settings.homeRoute);
  }
});
Router.route('entryResetPassword', {
  path: 'reset-password/:resetToken',
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('resetToken', this.params.resetToken);
    this.next();
  }
});

exclusions = [];

_.each(Router.routes, function(route) {
  return exclusions.push(route.name);
});

Router.onStop(function() {
  var _ref;
  if (!_.contains(exclusions, (_ref = Router.current().route) !== null ? _ref.getName() : undefined)) {
    Session.set('fromWhere', Router.current().path);
  }
});