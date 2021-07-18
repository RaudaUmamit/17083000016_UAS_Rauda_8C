const Pool = require ("pg").Pool;
const pool = new Pool({
	user: "postgres",
	password: "oda",
	database: "db_uasweb",
	host: "localhost",
	port: 5432
});
module.exports=pool;