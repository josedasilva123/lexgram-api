export interface iLike{
  userID: string;
  userName: string
}

export interface iAnswers{
  string: string;
  userName: string;
  text: string;
}

export interface iComments{
  userID: string;
  userName: string;
  likes?: iLike[];
  answers?: iAnswers; 
}


export interface iPostGetQuery {
  user?: string;
  page?: string;
  perPage?: string;
}

