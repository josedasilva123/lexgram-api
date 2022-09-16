import { body } from "express-validator";

export const userRegisterValidation = () => {
    return [
        body('name')
        .isString()
        .withMessage('O nome (name) é obrigatório e precisa ser do tipo string.'),
        
        body('email')
        .isString()
        .withMessage('O e-mail (email) é obrigatório e precisa ser do tipo string.')
        .isEmail()
        .withMessage('É necessário um e-mail válido'),

        body('password')
        .isString()
        .withMessage('A senha (password) é obrigatória e precisa ser do tipo string.'),

        body('slug')
        .isString()
        .withMessage('O slug (slug) é obrigatório')
    ]
}

export const userLoginValidation = () => {
    return [
        body('email')
        .isString()
        .withMessage('O e-mail (email) é obrigatório e precisa ser do tipo string.'),

        body('password')
        .isString()
        .withMessage('A senha (password) é obrigatória e precisa ser do tipo string.'),       
    ]
}

export const userChangePasswordRequestValidation = () => {
    return [
        body('email')
        .isString()
        .withMessage('O e-mail (email) é obrigatório e precisa ser do tipo string.'),   
    ]
}

export const userChangePasswordValidation = () => {
    return [
        body('password')
        .isString()
        .withMessage('A senha (password) é obrigatória e precisa ser do tipo string.'),   
    ]
}