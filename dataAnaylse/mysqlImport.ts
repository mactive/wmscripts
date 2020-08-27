const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'meng',
  database: 'bee'
});
con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

function select() {

// con.query('SELECT * FROM kerry.kerry_goods limit 10', (err,rows) => {
//     if(err) throw err;
  
//     console.log('Data received from Db:');
//     console.log(rows);
//     rows.forEach( (row) => {
//         console.log(`${row.name} costs  ${row.price}`);
//     });
//   });
}

function insertOneLine(author) {
    author = { user_id: 95539, union_id: 'asdfui2e9231231' };
    con.query('INSERT INTO page_view SET ?', author, (err, res) => {
      if(err) throw err;
    
      console.log('Last insert ID:', res.insertId);
    });
}

