export interface Fornecedores {
  id: number;
  name: string;
  email: string;
  categoria: string[]; // Alterado de categoriasSelecionadas para categoria
  estado: string;
}
