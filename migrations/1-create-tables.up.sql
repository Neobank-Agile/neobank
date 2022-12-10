create table accounts (
id uuid default gen_random_uuid () primary key,
first_name varchar not null,
last_name varchar not null,
email varchar not null,
phone varchar ,
password varchar not null, 
second_factor varchar not null default 'email',
status varchar not null
);

create table transactions (
id uuid default gen_random_uuid () primary key,
type varchar not null,
amount  numeric not null,
currency varchar not null,
source varchar not null,
destination varchar not null,
created_at timestamp default now(),
updated_at timestamp default now(),
created_by varchar not null,
status varchar not null
);

