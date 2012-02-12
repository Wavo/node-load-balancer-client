/**
* Register the application as a client in the Lean Load Balancer
*
* @return {Object}
*/

var _ = require('underscore');

var LLBClient = module.exports = function(options){
  var that = this;
  var config = _.extend({}, options);

  that.http = require('http');


  LLBClient.prototype.register = function(){
  };
};
