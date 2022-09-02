import { body } from "express-validator";

export const followValidation = () => {
    return [
        body('userID')
        .isString()
        .withMessage('O ID do usuário (userID) é obrigatório.'),
        body('followID')
        .isString()
        .withMessage('O ID da conta a ser seguida (followID) é obrigatório.'), 
    ]
}