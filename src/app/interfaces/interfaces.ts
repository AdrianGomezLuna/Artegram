export interface RespuestaPosts  {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

// Las interrogaciones es porque es opcional
export interface Post {
  _id?: string;
  mensaje?: string;
  img?: string[];
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  _id?: string;
  nombre?: string;
  avatar?: string;
  email?: string;
  password?: string;
}
