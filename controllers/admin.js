const Common = require('./common');
const AdminModel = require('../model/admin');
const Constant = require('../constant/constant')
const dataFormat = require('dataformat');

let exportObj = {
  list,
  info,
  add,
  update,
  remove
}

module.exports = exportObj;

// 管理员列表
function list(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);

  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.query, ['page', 'rows'], cb)
    },
    query: ['checkParams', (results, cb) => {
      let offset = req.query.rows * (req.query.page - 1) || 0;
      let limit = parseInt(req.query.rows) || 20;
      let whereCondition = {};

      if (req.query.username) {
        whereCondition.username = req.query.username;
      }

      AdminModel
        .findAndCountAll({
          where: whereCondition,
          offset,
          limit,
          order: [['created_at', 'DESC']]
        }).then(function (result) {
          let list = [];
          result.rows.forEach((v, i) => {
            let obj = {
              id: v.id,
              username: v.username,
              name: v.name,
              lastLoginAt: dataFormat(v.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
              createdAt: dataFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
            }
            list.push(obj)
          })
          resObj.data = {
            list,
            count: result.count
          };
          cb(null);
        }).catch(function (err) {
          console.log(err);
          cb(Constant.DEFAULT_ERROR)
        })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}


// 单条管理员信息
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.params, ['id'], cb);
    },
    query: ['checkParams', (results, cb) => {
      AdminModel
        .findByPk(req.params.id)
        .then(function (result) {
          if (result) {
            resObj.data = {
              id: result.id,
              username: result.username,
              name: result.name,
              role: result.role,
              lastLoginAt: dataFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
              createdAt: dataFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
            };
            cb(null)
          } else {
            cb(Constant.ADMIN_NOT_EXSIT)
          }
        }).catch(function (err) {
          console.log(err)
          cb(Constant.DEFAULT_ERROR)
        })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function add(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ['username', 'password', 'name', 'role'], cb);
    },
    add: ['checkParams', (results, cb) => {
      AdminModel.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
      }).then(function (result) {
        cb(null)
      }).catch(function (err) {
        console.log(err)
        cb(Constant.DEFAULT_ERROR)
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ['id', 'username', 'password', 'name', 'role'], cb)
    },
    update: ['checkParams', (results, cb) => {
      AdminModel.update({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
      }, {
        where: {
          id: req.body.id
        }
      }).then(function (result) {
        if (result[0]) {
          cb(null)
        } else {
          cb(Constant.DEFAULT_ERROR)
        }
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function remove(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ['id'], cb)
    },
    remove: ['checkParams', (results, cb) => {
      AdminModel.destroy({
        where: {
          id: req.body.id
        }
      }).then(function (result) {
        if (result) {
          cb(null)
        } else {
          cb(Constant.ADMIN_NOT_EXSIT)
        }
      }).catch(function (err) {
        console.log(err)
        cb(Constant.DEFAULT_ERROR)
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}