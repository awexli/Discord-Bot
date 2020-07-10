const roleHelper = require('./roleHelper.js');

module.exports = {
  name: 'role+',
  description: 'Assigns a guild member to role',
  execute(message, args) {
    roleHelper.roleCheck(message, args, 'role+');
  },
};
