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

Account.findByUsers = async (userA, userB) => {
  const [account, created] = await Account.findOrCreate({
    where: {
      [Op.or]: [
        {userA, userB},
        {userA: userB, userB: userA},
      ]
    },
    defaults: { userA, userB }
  });
  return account;
}

Account.whereUser = user => {
  return Account.findAll({
    where: {
      [Op.or]: [
        {userA: user},
        {userB: user},
      ]
    }
  });
}

Account.addToAccount = async (userA, userB, amount) => {
  const account = await Account.findByUsers(userA, userB);
  account.amount += account.userA === userA ? amount : -amount;
  return account.save();
}

Account.setAccountTo = async (userA, userB, amount) => {
  const account = await Account.findByUsers(userA, userB);
  account.amount = account.userA === userA ? amount : -amount;
  return account.save();
}

module.exports = Account;
