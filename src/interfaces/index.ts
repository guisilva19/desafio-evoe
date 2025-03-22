export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface Column {
  key: keyof Supporter;
  label: string;
  visible: boolean;
}

export interface Supporter {
  id: string;
  nome: string;
  email: string;
  link: string;
  telefone: string;
  criado_em: string;
  atualizado_em: string;
}

export interface ResponseData {
  supporters: Supporter[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}


export interface SupporterAdd {
  nome: string;
  email: string;
  link: string;
  telefone: string;
}