import { iOnlineUser } from "../SocketTypes";

export default class ConnectServices {
   static onlineUsers: iOnlineUser[];

   constructor() {
      ConnectServices.onlineUsers = [] as iOnlineUser[];
   }

   static ConnectUser(userID: string, userName: string, socketID: string) {
      if (!ConnectServices.onlineUsers.find((user) => user.userID === userID)) {
         ConnectServices.onlineUsers.push({ userID, userName, socketID });
      }
   }

   static DisconnectUser(socketID: string) {
      ConnectServices.onlineUsers = ConnectServices.onlineUsers.filter((user) => user.socketID !== socketID);
   }

   static GetUser(userID: string) {
      const user = ConnectServices.onlineUsers.find((user) => user.userID === userID);
      if (user) {
         return user;
      } else {
         return false;
      }
   }
}
