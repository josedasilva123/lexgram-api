import { io } from "../../server";

import { ObjectId } from "mongodb";

import User from "../../models/user";

import { iUser } from "../../routes/User/UserTypes";
import { iNoficationData } from "../SocketTypes";

import ConnectServices from "../Connect/ConnectServices";

export default class NotificationServices {
   static async Notify(data: iNoficationData) {
      try {
         const { userID, notification } = data;

         const objectUserID = new ObjectId(String(userID));
         const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
         const notificationList = currentUser?.notifications ? currentUser.notifications : [];

         const newNotificationList = [...notificationList, notification];

         await User.updateOne(
            { _id: objectUserID },
            {
               $set: {
                  notifications: newNotificationList,
               },
            }
         );

         const receiver = ConnectServices.GetUser(data.userID);

         if (receiver) {
            io.to(receiver.socketID).emit("@GetNotify", {
               notifications: newNotificationList,
            });
         }
      } catch (error) {
         console.log(`Ocorreu um erro! Error: ${error}`);
      }
   }
}
