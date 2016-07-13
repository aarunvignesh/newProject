define(["angular","primus","visor"],function(angular,primus,visor){

	this.notifyQueue = [];

	/*this.notifySchema = {
		type			:message || friendRequest,
		displayMessage 	:msg to display,
		messaObject		:{
			triggeredBy: owner
		}
	};*/


	this.addNotification = function(value){
      	this.notifyQueue.push(value);
	};	

	this.getNotification = function(){
		return this.notifyQueue;
	};

});
