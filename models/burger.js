// Import the ORM to create functions that will interact with the database.
import { selectAll as _selectAll, insertOne as _insertOne, updateOne as _updateOne } from "../config/orm.js";


let burger = {
  //Select all burgers from database.
  selectAll: function(cb) {
    _selectAll("burgers", function(res) {
      cb(res);
    });
  },

  //Create function to create/add a burger.
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    _insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  //Update function to update burger devoured state.
  updateOne: function(objColVals, condition, cb) {
    _updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }

};

// Export the database functions for the controller (burgers_controller.js).
export default burger;