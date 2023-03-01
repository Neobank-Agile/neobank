create table accounts (
id uuid default gen_random_uuid () primary key,
username varchar not null,
email varchar not null,
phone varchar ,
password varchar not null, 
second_factor varchar not null default 'email',
status varchar not null
);

create unique index ix_uniq_email on accounts (email);

create table transactions (
id uuid default gen_random_uuid () primary key,
account_id uuid not null,
type varchar not null,
amount  numeric not null,
source varchar not null,
destination varchar not null,
created_at timestamp default now(),
updated_at timestamp default now(),
status varchar not null
);

alter table transactions add constraint tx_account_fk foreign key (account_id) references accounts (id);

create table rates (
id uuid default gen_random_uuid () primary key,
curr_from varchar not null,
curr_to varchar not null,
rate numeric not null
);

create table cards (
id uuid default gen_random_uuid () primary key,
holder varchar not null,
account_id uuid not null,
card_type varchar not null,
card_number varchar not null,
csv numeric(3) not null,
expiration varchar not null
);

alter table cards add constraint card_account_fk foreign key (account_id) references accounts (id);


