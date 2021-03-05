const { Sequelize, DataTypes, Op } = require('sequelize')
const { db } = require('../config.json')

const sequelize = new Sequelize(db)
module.exports = { sequelize, DataTypes, Op }