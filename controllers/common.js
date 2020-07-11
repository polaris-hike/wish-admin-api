const async = require('async');                             // 引入async模块
const Constant = require('../constant/constant');       // 引入常量模块
// 定义一个对象
const exportObj = {
    clone,
    checkParams,
    autoFn
};
module.exports = exportObj;                   // 导出对象，方便其他方法调用

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function checkParams (params, checkArr, cb) {
    let flag = true;
    checkArr.forEach(v => {
        if (! params[v]) {
            flag = false;
        }
    });
    if (flag) {
        cb(null);
    }else{
        cb(Constant.LACK);
    }
}


function autoFn (tasks, res, resObj) {
    async.auto(tasks, function (err){
        if (! ! err) {
            console.log (JSON.stringify(err));
            res.json({
                code: err.code || Constant.DEFAULT_ERROR.code,
                msg: err.msg || JSON.stringify(err)
            });
        } else {
            res.json(resObj);
        }
    });
}
