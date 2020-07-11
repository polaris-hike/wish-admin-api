const Common = require('./common');
const AdminModel = require('../model/admin');
const Constant = require('../constant/constant')
const dataFormat = require('dataformat');
const Token = require('./token');
const TOKNE_EXPIRE_SECOND = 3600;

let exportObj = {
  login
}

module.exports = exportObj;

function login(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ['username', 'password'], cb);
    },
    query: ['checkParams', (results, cb) => {
      AdminModel.findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        }
      }).then(function (result) {
        if (result) {
          resObj.data = {
            id: result.id,
            username: result.username,
            name: result.name,
            role: result.role,
            lastLoginAt: dataFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
            createdAt: dataFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
          };
          const adminInfo = {
            id: result.id
          }
          let token = Token.encrypt(adminInfo, TOKNE_EXPIRE_SECOND);
          resObj.data.token = token;
          cb(null, result.id)
        } else {
          cb(Constant.LOGIN_ERROR)
        }
      }).catch(function (err) {
        console.log(err)
        cb(Constant.DEFAULT_ERROR)
      })
    }],
    writeLastLoginAt: ['query', (results, cb) => {
      let adminId = results['query'];
      AdminModel.update({
        lastLoginAt: new Date()
      }, {
        where: {
          id: adminId
        }
      }).then(function (result) {
        if (result) {
          cb(null)
        } else {
          cb(Constant.DEFAULT_ERROR)
        }
      }).catch(function (err) {
        console.log(err)
        cb(Constant.DEFAULT_ERROR)
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}