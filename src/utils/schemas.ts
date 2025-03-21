import * as yup from "yup";

export const schemaSignIn = yup.object({
  email: yup.string().email("Email inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});
