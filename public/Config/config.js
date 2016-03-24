
define([],function(){
    return {
      protocol: window.location.protocol,
			host: window.location.hostname,
			port: window.location.port?window.location.port:undefined
    }
});
