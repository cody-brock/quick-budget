module.exports = function(sequelize, DataTypes) {
  var Expense_Item = sequelize.define("Expense_Item", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // *** Stores the value of the item, the dollar amount the user enters ***
    value: DataTypes.INTEGER,

    // Foreign Key - relates to the id of Expense_types table.
    // ...This allows us to access the name and description of the item, and its respective category.
    // expense_type: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'expense_types',
    //     key: 'id'
    //   }
    // },
    
    // Foreign Key - relates to the user's id in the user table
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   }
    // },



  }, {
    timestamps: false,
    
    // Adds an index to user_id for quicker lookups (TODO: does this work?)
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['user_id']
    //   }
    // ]
  });

  Expense_Item.associate = function(models) {
    Expense_Item.belongsTo(models.Expense_Type, { foreignKey: 'expense_type_id' } ); // updated
    Expense_Item.belongsTo(models.User, { foreignKey: 'user_id' } ); // updated
  }


  return Expense_Item;
};
