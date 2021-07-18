const express = require ('express');
const app = express();
const port = 3000
const pool = require('./database');
app.use(express.json())
app.listen(port,()=>{
	console.log(`Server ini telah terkoneksi ke port ${port}`)
})
app.post("/signin", async(req,res) =>{
	try{
		const {pegawai}=req.body;
		const insert = await pool.query("INSERT INTO tb_uasrauda (pegawai) VALUES ($1) RETURNING *",[pegawai]);
		res.json(insert.rows[0]);

	}catch (err){
		console.error(err.message);
	}
});
app.get ("/signin", async(req,res) =>{
	try{
		const data = await pool.query("SELECT * FROM tb_uasrauda");
		res.json(data.rows)
	}catch (err){
		console.error(err.message);
	}
});
app.put("/signin/:idpegawai", async(req,res) =>{
	try{
		const {idpegawai} = req.params;
		const {pegawai} = req.body;
		const update = pool.query("UPDATE tb_uasrauda SET pegawai = $1 WHERE idpegawai = $2", [pegawai,idpegawai]);
		res.json("Data telah di update");
	}catch (err){
		console.error(err.message);
	}
});
app.delete("/signin/:idpegawai", async(req,res) =>{
	try{
		const {idpegawai} = req.params;
		const hapus = await pool.query ("DELETE FROM tb_uasrauda WHERE idpegawai = $1", [idpegawai]);
		res.json("Data telah berhasil di hapus");
	}catch (err){
		console.error(err.message);
	}
});