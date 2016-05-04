
var socketTable = {}, usernameTable = {};

createUser = function (id, username) {
    var socket_index = "id" + id;
    socketTable[socket_index] = username;
    usernameTable[username] = usernameTable[username] || [];
    usernameTable[username].push(id);
};

deleteUser = function (id,type){
  switch (type) {
        case "SOCKET_ID":
                    var socket_index = "id" + id;
                    var username = socketTable[socket_index];
                    delete(socketTable[socket_index]);
                    delete(usernameTable[username]);
                    break;

        case "USERNAME":
                    var socketIds = usernameTable[id];
                    socketIds.forEach(function(index,value) {
                      var socket_index = "id" + value;
                      delete(socketTable[socket_index]);
                    });
                    delete(usernameTable[id]);
        default:

  }
};

getuserBysocketId = function (id){
  var socket_index = "id" + id;
  return socketTable[socket_index] || [];
};

getuserByusername = function (username){
  return usernameTable[username] || [];
};

module.exports = {
  createUser : createUser,
  deleteUser : deleteUser,
  getuserBysocketId : getuserBysocketId,
  getuserByusername : getuserByusername
};
