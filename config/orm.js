let connection = require("../config/connection");

/* In order to write the query, we need 3 question marks.
 The function below loops through and creates an array of question marks  ["?", "?", "?"]  and turns it into a string.
 ["?", "?", "?"].toString() => "?,?,?"; 
*/

function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}
  
  // Function to convert object key/value pairs to SQL syntax
  function objToSql(obj) {
    let arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (let key in obj) {
      let value = obj[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // This is an example of the function {name: 'Bacon Burger'} => ["name='Bacon Burger'"]
        arr.push(key + "=" + value);
      }
    }
  

    return arr.toString();
  }
  

//Object for all our SQL statement functions.
let orm = {

    //Select all function/query
    selectAll: function(tableInput, cb) {
      let queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    //Insert function/query
    insertOne: function(table, cols, vals, cb) {
      let queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },

    //Update function/query.
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }

};

//Export the orm object.
module.exports = orm;