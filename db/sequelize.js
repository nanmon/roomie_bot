const { Sequelize, DataTypes, Op } = require('sequelize')
const dbConfig = require('./config')

const sequelize = new Sequelize({
  ...dbConfig,
  logging: (query, args) => console.log(query, args.bind)
})
module.exports = { sequelize, DataTypes, Op }