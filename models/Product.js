// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define id columns
    id: {
       //use the special sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this is the equivalent of SQL's 'NOT NULL' option
      allowNull: false,
      //this is the equivalent of SQL's 'NOT NULL' option
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true
    },
    //define a product name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    //define price column
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    //define stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      //if alloNull is  set to false, we can run our data through validators before creating the data
      validate: {
        isNumeric: true
      }
    },
    // define category id column
    category_id: {
      type: DataTypes.INTEGER,
      // refer to the category data model id
      references: {
        model: "category",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
