var adminUser = {};

adminUser.username = 'admin'
adminUser.password = 'admin'

adminUser.loginAdmin = function(username,password){
    return username == adminUser.username && password == adminUser.password;
}

module.exports = adminUser