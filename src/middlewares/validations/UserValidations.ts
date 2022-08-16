import { body } from "express-validator";

export const userRegisterValidation = () => {
    return [
        body('name')
        .isString()
        .withMessage('O nome (name) é obrigatório'),
        body('email')
        .isString()
        .withMessage('O e-mail (email) é obrigatório')
        .isEmail()
        .withMessage('É necessário um e-mail válido'),
        body('password')
        .isString()
        .withMessage('A senha (password) é obrigatória')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .withMessage('A senha precisa conter pelo menos oito dígitos, um número e uma letra.'),
        body('slug')
        .isString()
        .withMessage('O slug (slug) é obrigatório')
    ]
}

export const userLoginValidation = () => {
    return [
        body('email')
        .isString()
        .withMessage('O e-mail (email) é obrigatório'),
        body('password')
        .isString()
        .withMessage('A senha (password) é obrigatória'),       
    ]
}