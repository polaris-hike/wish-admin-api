const jwt = require ('jsonwebtoken');  // 引入jsonwebtoken包
const tokenKey = 'XfZEpWEn? ARD7rHBN';  // 设定一个密钥，用来加密和解密Token
// 定义一个对象
const Token = {
encrypt: function (data, time) {
    return jwt.sign (data, tokenKey, {expiresIn: time})
},


decrypt: function (token) {
    try {
        let data = jwt.verify (token, tokenKey);
        return {
            token: true,
            data: data
        };
    } catch (e) {
        return {
            token: false,
            data: e
        }
    }
}
};
module.exports = Token;                    // 导出对象，方便其他模块调用
