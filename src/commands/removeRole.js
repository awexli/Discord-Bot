const roleHelper = require('./roleHelper.js');

module.exports = {
  name: 'role-',
  description: 'Removes a role from a guild memeber',
  execute(message, args) {
    roleHelper.roleCheck(message, args, 'role-');
  },
};
