# PostgreSQL & Adminer Cheat Sheet

## PostgreSQL

### Start PostgreSQL

```bash
/usr/local/opt/postgresql@16/bin/pg_ctl -D /usr/local/var/postgresql@16 start
```

### Check PostgreSQL Status

```bash
pg_isready -p 5432
```

### Open PostgreSQL CLI

```bash
psql -U aakansharai -d task_manager
```

### Connect to a Database

```sql
\c task_manager
```

### List Databases

```sql
\l
```

### List Tables

```sql
\dt
```

### Describe a Table

```sql
\d tasks
```

### View Table Data

```sql
SELECT * FROM tasks;
```

### Exit PostgreSQL CLI

```sql
\q
```

---

## Adminer

### Start Adminer

From the directory containing `adminer.php`:

```bash
php -S localhost:8080
```

### Open Adminer

```text
http://localhost:8080
```

### Adminer Login

```text
System:   PostgreSQL
Server:   localhost
Username: lds
Password: <your PostgreSQL password>
Database: task_manager
```

## PostgreSQL Useful Concepts

### Primary Key

Uniquely identifies each row.

```sql
id SERIAL PRIMARY KEY
```

### Foreign Key

Creates a relationship between tables.

```sql
FOREIGN KEY (role_id)
REFERENCES roles(id)
```

### JOIN

Used to retrieve related data from multiple tables.

```sql
SELECT *
FROM role_permissions
JOIN roles ON roles.id = role_permissions.role_id
JOIN permissions ON permissions.id = role_permissions.permission_id;
```

---

## Current Project Database

```text
Database: task_manager
User:     lds
Host:     localhost
Port:     5432
```

### Current Tables

```text
tasks
```

### Planned RBAC Tables

```text
roles
permissions
role_permissions
```

`role_permissions` will define which permissions are assigned to each role.
