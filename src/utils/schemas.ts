import * as yup from "yup";

export const schemaSignIn = yup.object({
  email: yup.string().email("Email inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const schemaAddSupporter = yup.object({
  email: yup
    .string()
    .email("O e-mail não é válido")
    .required("O e-mail é obrigatório"),
  nome: yup.string().required("O nome é obrigatório"),
  link: yup
    .string()
    .url("O link não é válido")
    .required("O link é obrigatório"),
  telefone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "O telefone não é válido")
    .required("O telefone é obrigatório"),
});
