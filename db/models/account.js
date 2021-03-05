const { sequelize, DataTypes, Op } = require("../sequelize");

const Account = sequelize.define("Account", {
  userA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userB: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    defaultValue: 0 
  },
});

Account.createOrUpdate = async (userA, userB, quantity) => {
  const [account, created] = await Account.findOrCreate({
    where: {
      [Op.or]: [
        {userA, userB},
        {userA: userB, userB: userA},
      ]
    },
    defaults: { userA, userB, quantity }
  })
  if (created) return account;

  if (account.userA === userA) {
    account.amount += quantity
  } else {
    account.amount += -quantity
  }
  return account.save()
}

module.exports = Account;
