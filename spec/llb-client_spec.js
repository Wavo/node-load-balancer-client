var LLBClient = require('../lib/llb-client');
var config = {
  class: 'ClassA',
  version: '0.0.1',
  host: '127.0.0.1',
  port: 9000,
  serverHost: '127.0.0.1',
  serverPort: '3000'
};
var client = new LLBClient(config);

describe("LLBClient", function(){
  describe("#register", function(){
    var req = {write: function(){}, end: function(){}};

    beforeEach(function(){
      spyOn(req, "write");
      spyOn(req, "end");
      spyOn(client.http, "request").andReturn(req);
      client.register();
    });

    it("should write instace data to request body", function(){
      expect(req.write).toHaveBeenCalledWith(JSON.stringify({
        class: 'ClassA',
        version: '0.0.1',
        host: '127.0.0.1',
        port: 9000,
      }));
      expect(req.end).toHaveBeenCalled();
    });

    it("should make an http request to the server and post the register command in the body", function(){
      expect(client.http.request).toHaveBeenCalledWith({
        host: config.serverHost,
        port: config.serverPort,
        method: 'POST',
        path: '/router/instances'
      });
    });

  });
});
