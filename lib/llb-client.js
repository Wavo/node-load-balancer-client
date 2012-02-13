/**
* Register the application as a client in the Lean Load Balancer
*
* @return {Object}
*/

var _ = require('underscore');

var LLBClient = module.exports = function(options){
  var that = this;
  var config = _.extend({}, options);
  var instance = JSON.stringify(config.instance);

  that.http = require('http');

  LLBClient.prototype.deregister = function(){
    var req = that.http.request(_.extend({}, config.server, {
      method: 'DELETE',
      path: '/router/instances',
      headers: {
        'Content-Length' : instance.length
      }
    }));

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(instance);
    req.end();
  };

  LLBClient.prototype.register = function(){
    var req = that.http.request(_.extend({}, config.server, {
      method: 'POST',
      path: '/router/instances',
      headers: {
        'Content-Length' : instance.length
      }
    }));

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(instance);
    req.end();
  };
};
