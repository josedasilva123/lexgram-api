import { iNotification } from "../routes/User/UserTypes";

export interface iConnectData {
  userID: string;
  userName: string;
}

export interface iNoficationData extends iConnectData {
   notification: iNotification;
}

export interface iOnlineUser extends iConnectData{
  socketID: string;    
}