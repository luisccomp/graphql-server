-- Rodar o seguinte script para criar a tabela categorias no banco SQLITE
-- Categorias
create table categories (
  id text primary key,
  name text not null,
  description text
);

-- Curso precisa existir somente se houve alguma categoria
create table courses (
    id text primary key,
    title text not null,
    description text,
    category_id text not null,
    foreign key (category_id) references categories(id)
);
