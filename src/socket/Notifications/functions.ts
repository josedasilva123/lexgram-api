export interface iOnlineUser{
    userID: string;
    userName: string;
    socketID: string;    
}

export let onlineUsers: iOnlineUser[] = [] as iOnlineUser[];


export const connectUser = (userID: string, userName: string, socketID: string) => {
    if(!onlineUsers.find((user) => user.userID === userID)){
        onlineUsers.push({ userID, userName, socketID});
    }
}

export const disconnectUser = (socketID: string) => {
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketID);
}

export const getUser = (userID: string) => {
    const user = onlineUsers.find((user) => user.userID === userID);
    if(user){
        return user;
    } else {
        return false;
    }
}