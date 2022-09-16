import { body } from "express-validator";

export const postCreateValidation = () => {
    return [
        body('userID')
        .isString()
        .withMessage('O ID do usuário (userID) é obrigatório e precisa ser do tipo string.'),

        body('description')
        .isString()
        .withMessage('A descrição (description) é obrigatória e precisa ser do tipo string.')
        .isLength({ min: 30 })
        .withMessage('A descrição precisa conter pelo menos 50 caracteres.')
    ]
}