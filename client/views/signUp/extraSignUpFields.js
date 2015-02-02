Template.entryExtraSignUpFields.helpers({
  extraSignUpFields: function() {
    return AccountsEntry.settings.extraSignUpFields;
  }
});

Template._entryExtraSignUpField.helpers({
  isTextField: function() {
    return this.type !== "check_box";
  },
  isCheckbox: function() {
    return this.type === "check_box";
  }
});