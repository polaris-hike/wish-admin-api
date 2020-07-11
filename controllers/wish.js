const Common = require('./common');
const WishModel = require('../model/wish');
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


// 获取许愿列表方法
function list(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.query, ['page', 'rows'], cb);
    },
    query: ['checkParams', (result, cb) => {
      let offset = req.query.rows * (req.query.page - 1) || 0;
      let limit = parseInt(req.query.rows) || 20;
      let whereCondition = {}
      if (req.query.name) {
        whereCondition.name = req.query.name;
      }
      WishModel.findAndCountAll({
        where: whereCondition,
        offset,
        limit,
        order: [['created_at', 'DESC']]
      }).then(function (result) {
        let list = [];
        result.rows.forEach((v, i) => {
          let obj = {
            id: v.id,
            name: v.name,
            content: v.content,
            createdAt: dataFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
          };
          list.push(obj)
        })
        resObj.data = {
          list,
          count: result.count
        };
        cb(null);
      }).catch(function (err) {
        console.log(err)
        cb(Constant.DEFAULT_ERROR)
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.params, ['id'], cb);
    },
    query: ['checkParams', (results, cb) => {
      WishModel
        .findByPk(req.params.id)
        .then(function (result) {
          if (result) {
            resObj.data = {
              id: result.id,
              name: result.name,
              content: result.content,
              createdAt: dataFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
            };
            cb(null)
          } else {
            cb(Constant.WISH_NOT_EXSIT);
          }
        }).catch(function (err) {
          console.log(err);
          cb(Constant.DEFAULT_ERROR)
        })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function add() {

}

function update() {

}

function remove() {

}
