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

create table rates (
id uuid default gen_random_uuid () primary key,
curr_from varchar not null,
curr_to varchar not null,
rate numeric not null
);

create table cards (
id uuid default gen_random_uuid () primary key,
account_id uuid not null,
card_type varchar not null,
card_number varchar not null,
exp_month numeric not null,
exp_year numeric not null
);

alter table cards add constraint card_account_fk foreign key (account_id) references accounts (id);

