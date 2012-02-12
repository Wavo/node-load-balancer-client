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
    beforeEach(function(){
      spyOn(client.http, "request");
    });

    it("should make an http request to the server and post the register command in the body", function(){
      client.register();
      expect(client.http.request).toHaveBeenCalledWith({
        host: config.serverHost,
        port: config.serverPort
      });
    });

  });
});
