export interface User {
  id: number;
  name: string;
  email: string;
  telephone: string;
  link: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface Column {
  key: keyof User;
  label: string;
  visible: boolean;
}
