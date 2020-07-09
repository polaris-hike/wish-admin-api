const Sequelize = require('sequelize');         // 引入Sequelize模块
const db = require('../db');                       // 引入数据库实例
// 定义model
const Admin = db.define('Admin', {
    id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
        autoIncrement: true},                                                   // 主键
    username: {type: Sequelize.STRING(20), allowNull: false},    // 用户名
    password: {type: Sequelize.STRING(36), allowNull: false},    // 密码
    name: {type: Sequelize.INTEGER, allowNull: false},             // 姓名
    role: {type: Sequelize.STRING(20), allowNull: false},         // 角色
    lastLoginAt: {type: Sequelize.DATE}            // 上次登录时间
}, {
    underscored: true,                                 // 是否支持驼峰
    tableName: 'admin',                                // MySQL数据库表名
});
module.exports = Admin;                             // 导出model
