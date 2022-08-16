create table credit_cards (
  id uuid not null,
  name varchar not null,
  number varchar not null,
  expiration_month varchar not null,
  expiration_year varchar,
  cvv varchar not null,
  balance float not null,
  balance_limit float not null,
  primary key (id)
);

create table transactions (
  id uuid not null,
  credit_card_id uuid not null references credit_cards(id),
  amount float not null,
  status varchar not null,
  description varchar,
  store varchar not null,
  created_at timestamp not null,
  primary key (id)
);
