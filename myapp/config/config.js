//这是数据库的配置文件
module.exports = {
	// 主机名  数据库所在电脑的主机名
	host:'localhost',
	// 数据库的账号
	user:'root',
	// 数据库密码
	password:'1234',
	// 当前连接的数据库名称
	database:'orders',
	// 端口号
	port:'3307',
	connectionLimit : 20,
	waitForConnections: false
}