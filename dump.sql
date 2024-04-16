create database pdv;

create table if not exists usuarios(
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table if not exists categorias(
  id serial primary key,
  descricao text not null
 );
 
 insert into categorias 
 (descricao) 
 values
 ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games')
;

create table if not exists produtos (
  id serial primary key,
  descricao text,
  quantidade_estoque int not null,
  valor int not null,
  categoria_id int not null,
  foreign key (categoria_id) references categorias(id)
);

create table if not exists clientes (
  id serial primary key,
  nome text,
  email text unique not null,
  cpf text unique not null,
  cep text,
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado text
);

create table if not exists pedidos (
  id serial primary key,
  cliente_id int not null,
  observacao text,
  valor_total int not null,
  foreign key (cliente_id) references clientes(id)
);

create table if not exists pedido_produtos (
  id serial primary key,
  pedido_id int not null,
  produto_id int not null,
  quantidade_produto int not null,
  valor_produto int not null,
  foreign key (pedido_id) references pedidos(id),
  foreign key (produto_id) references produtos(id)
);

alter table produtos
add column produto_imagem text;