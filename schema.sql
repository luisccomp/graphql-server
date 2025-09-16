-- SQLite
create table categories(
  id          string primary key,
  name        string not null,
  description string
);

create table courses(
  id          string primary key,
  name        string not null,
  description string,
  category_id string not null references categories(id)
);
