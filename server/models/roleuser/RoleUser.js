const Model = require('../Model');
const Role = require('../role/Role');
const User = require('../user/User');

class RoleUser extends Model {

  /**
   * Set database table name
   */
  static get tableName() {
    return 'role_users';
  }

  /**
   * Set validation schema
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['role_id', 'user_id', 'active'],
      properties: {
        bypass: { type: 'boolean' }
      }
    }
  };

  /**
   * Role relation
   */
  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'role_users.role_id',
          to: 'roles.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'role_users.user_id',
          to: 'users.id'
        }
      }
    }
  }

  /**
   * Populate with role
   */
  static async populateWithRole(role) {
    const users = await User.query();
    const items = [];
    for (let i of users) items.push({
      role_id: role.id,
      user_id: i.id,
      active: false
    });
    await RoleUser.query().insert(items)
  }

  /**
   * Populate with user
   */
  static async populateWithUser(user) {
    const roles = await Role.query();
    const items = [];
    for (let i of roles) items.push({
      role_id: i.id,
      user_id: user.id,
      active: false
    });
    await RoleUser.query().insert(items)
  }
}

module.exports = RoleUser;