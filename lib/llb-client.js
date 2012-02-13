/**
* Register the application as a client in the Lean Load Balancer
*
* @return {Object}
*/

var _ = require('underscore');

var LLBClient = module.exports = function(options){
  var that = this;
  var config = _.extend({}, options);
  var instance = {};
  _.each(config, function(val, key){ 
    if(key != 'serverHost' && key != 'serverPort'){ 
      instance[key] = val;
    }
  });

  that.http = require('http');

  LLBClient.prototype.deregister = function(){
    var req = that.http.request({
      host: config.serverHost,
      port: config.serverPort,
      method: 'DELETE',
      path: '/router/instances'
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(JSON.stringify(instance));
    req.end();
  };

  LLBClient.prototype.register = function(){
    var req = that.http.request({
      host: config.serverHost,
      port: config.serverPort,
      method: 'POST',
      path: '/router/instances'
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(JSON.stringify(instance));
    req.end();
  };
};
