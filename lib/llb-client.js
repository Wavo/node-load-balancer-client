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
    var req = that.http.request({
      host: config.serverHost,
      port: config.serverPort,
      method: 'POST',
      path: '/router/instances'
    });
    var instance = {};
    _.each(config, function(val, key){ 
      if(key != 'serverHost' && key != 'serverPort'){ 
        instance[key] = val;
      }
    });
    req.write(JSON.stringify(instance));
    req.end();
  };
};
