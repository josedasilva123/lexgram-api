import { ObjectId } from "mongodb";
import { iUser } from "../interfaces/user";
import User from "../models/user";
import { io } from "../server";
import { connectUser, disconnectUser, getUser, iOnlineUser } from "./functions";

interface iConnectData {
  userID: string;
  userName: string;
}

io.on("connection", (socket) => {
  socket.on("@Join", (user: iConnectData) => {
    connectUser(user.userID, user.userName, socket.id);
  });

  socket.on("@Disconnect", () => {
    disconnectUser(socket.id);
  });

  socket.on("@Notify", async (data) => {
    try {
      const objectUserID = new ObjectId(String(data.userID));
      const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
      const notificationList = currentUser?.notifications ? currentUser.notifications : [];

      const newNotificationList = [...notificationList, data.notification];

      await User.updateOne(
        { _id: objectUserID },
        {
          $set: {
            notifications: newNotificationList,
          },
        }
      );

      const receiver = getUser(data.userID);

      if (receiver) {
        io.to(receiver.socketID).emit("@GetNotify", {
          notifications: newNotificationList,
        });
      }
    } catch (error) {
      console.log(`Ocorreu um erro! Error: ${error}`);
    }
  });

  socket.on("@Disconnect", () => {
    console.log("Um usuário desconectou");
  });
});
