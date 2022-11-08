import { io } from "../server";
import ConnectServices from "./Connect/ConnectServices";
import NotificationServices from "./Notification/NotificationServices";
import { iConnectData, iNoficationData } from "./SocketTypes";

io.on("connection", (socket) => {
   socket.on("@Join", (user: iConnectData) => {
      ConnectServices.ConnectUser(user.userID, user.userName, socket.id);
   });

   socket.on("@Disconnect", () => {
      ConnectServices.DisconnectUser(socket.id);
   });

   socket.on("@Notify", async (data: iNoficationData) => {
      NotificationServices.Notify(data);
   });
});
