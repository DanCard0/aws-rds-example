const { Client } = require('pg');
const { password: PASSWORD } = require('./config');

client = new Client({
    host: 'pragmaworkshop.cvoh2wtagtte.us-east-1.rds.amazonaws.com',
    user: 'dancard',
    password: PASSWORD,
    database: 'Empresa',
});
client.connect()

getAllcustomers()


function getAllcustomers(){

    client.query('SELECT * FROM customer', (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
          client.end(err => {
            console.log('client has disconnected')
            if (err) {
              console.log('error during disconnection', err.stack)
            }
          })
        }
      })

}

function insertCostumer(values){

    const text = 'INSERT INTO customer(id, name, address, email, phone) VALUES($1, $2, $3, $4, $5) RETURNING *'
    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log("User inserted")
        client.end(err => {
            console.log('client has disconnected')
            if (err) {
              console.log('error during disconnection', err.stack)
            }
          })
      }
    })

} 

function deleteByID(id){

    const text = 'DELETE FROM customer WHERE id=$1'
    client.query(text, [id], (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('User deleted')
        client.end(err => {
            console.log('client has disconnected')
            if (err) {
              console.log('error during disconnection', err.stack)
            }
          })
        
      }
    })
}

function getCustomerByID(id){

    const text = 'SELECT * FROM customer WHERE id=$1'
    client.query(text, [id], (err, res) => {
      if (err) {
        console.log(err.stack)
    } else {
      console.log(res.rows[0])
      client.end(err => {
          console.log('client has disconnected')
          if (err) {
            console.log('error during disconnection', err.stack)
          }
        })
      
    }
  })

}


function updateCustomerById(values){

  const text = 'UPDATE customer SET name=$1, address=$2,email=$3, phone=$4 WHERE id=$5'
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log('User updated')
      client.end(err => {
          console.log('client has disconnected')
          if (err) {
            console.log('error during disconnection', err.stack)
          }
        })
      
    }
  })

}