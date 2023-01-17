# Neobank backend

## Components / requirements

-   PostgreSQL Db
-   nodejs / npm

## Local development setup

### Setup DB

1. Install PostgreSQL

2. Create initial DB

```
$ psql -U postgres -c "create database neobank"
```

3. Create tables

```
$ psql -U postgres neobank -f ./migrations/1-create-tables.up.sql
```

### NodeJS API Setup

1. Install dependencies

```
npm install
```

2. Launch API

```
npm start
```

Output:

```
> neobank-api@1.0.0 start
> node index.js

App running on port 3000.

```

3. Create accounts

In a separate terminal, execute:

```

$ ./examples/create_account.sh

```

Output:

```

Account added with ID: 4469bf9e-b99e-4e27-aff5-4aa2cfc6ee6b

```

Output on API terminal:

```

{
first_name: 'John',
last_name: 'Doe',
email: 'jdoe@gmail.com',
phone: '+4412345678',
password: 'supersecret',
second_factor: 'phone',
status: 'not verified'
}
POST /accounts 201 60 - 45.542 ms

```

```

```
