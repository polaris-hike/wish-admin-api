// 引入Token处理的controller
const Token = require('../../controllers/token');
const Constant = require('../../constant/constant');      // 引入常量
// 配置对象
const exportObj = {
    verifyToken
};
module.exports = exportObj;                        // 导出对象，供其他模块调用
function verifyToken(req, res, next) {         // 验证Token中间件
    // 如果请求路径是/login，即登录页，则跳过，继续下一步
    if (req.path === '/login') return next();
    let token = req.headers.token;                  // 从请求头中获取参数token
    // 调用TokenController中的Token解密方法，对参数token进行解密
    let tokenVerifyObj = Token.decrypt(token);
    if (tokenVerifyObj.token) {
        next()                                // 如果Token验证通过，则继续下一步
    } else {
        res.json(Constant.TOKEN_ERROR)  // 如果Token验证不通过，则返回错误JSON
    }
}
