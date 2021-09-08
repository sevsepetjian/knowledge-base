# Table Design That Works For You
---

When you organize data into a finely tuned smartly named set of tables, the analysis experience becomes manageable.

#### Naming Tables, Columns, and Other Identifiers

You can use either camelCase, PascalCase, or snake_case for naming. It doesn't matter which you choose just be consistent with the format. If working on a team or organization respect the convention they choose.

If for some strange reason you create tables *customers* and *Customers* add double quotes (delimiters) around "Customers" so the table is created. Otherwise it will throw an error stating that the table already exists. 

#### Guidelines for Naming Identifiers

Best way to name is to keep your identifier names simple, unquoted, and consistent.

Some additional guidelines include:

- Use snake case.
- Make names easy to understand and avoid cryptic abbreviations.
- For table names use plurals.
- Mind the length. 
- When making copies of tables, use names that will help you manage them later.

#### Controlling Column Values with Constraints

Constraints help maintain the quality of the data and ensure the integrity of the relationship among tables.

Some examples of constraints are:

- Primary key
- Foreign key
- Check
- Unique
- Not NULL

You can add constraints as either a column constraint or a table constraint.

**Column Constraint**

    CREATE TABLE natural_key_example (
        license_id varchar(10) CONSTRAINT license_key PRIMARY KEY,
        first_name varchar(50),
        last_name varchar(50)
    );

**Table Constraint**

    CREATE TABLE natural_key_example (
        license_id varchar(10),
        first_name varchar(50),
        last_name varchar(50),
        CONSTRAINT license_key PRIMARY KEY (license_id)
    );

#### Primary Key Constraint

Primary keys have two types:

- **Natural key** - implemented by using one or more of the tables existing columns rather than creating a column and filling it with artificial values to act as keys. Good use cases are part numbers, a serial number, or a books ISBN.
- **Surrogate key** - consists of single columns that you fill with artificial values. This can be done using serial data type or using something like a UUID.


**Composite key** - we can use this type of key when a single column in the table isn't sufficient for meeting the primary key requirements for uniqueness. We may be able to create a suitable key from a combo of columns.

    CREATE TABLE natural_key_composite_example (
        student_id varchar(10),
        school_day date,
        present boolean,
        CONSTRAINT student_key PRIMARY KEY (student_id, school_day)
    );

Using big integers for data types removes all possible chances of database problems of not having enough space for the record.

#### Foreign Key Constraint

Foreign key constraint ensures data in related tables don't end up unrelated, or orphaned. A foreign key is one or more columns in a table that match the primary key of another table. It also imposes a constraint: values entered must already exists in the primary key or other unique key of the table it references.

Need the related key record before foreign key or else an error will throw because the foreign referenced record can't find the main record its refering to. Same reversed principle for deleting. You must delete foreign key record before a primary key record (Look at drivers license and registrations example pg 103). 

    CREATE TABLE licenses (
        license_id varchar(10),
        first_name varchar(50),
        last_name varchar(50),
        CONSTRAINT licenses_key PRIMARY KEY (license_id)
    );

    CREATE TABLE registrations (
        registration_id varchar(10),
        registration_date date,
        license_id varchar(10) REFERENCES licenses (license_id),
        CONSTRAINT registration_key PRIMARY KEY (registration_id, license_id)
    );

*ON DELETE CASCADE* keyword ensures if primary key (license) is deleted all foreign keys (registrations) are also deleted. Must add this keyword when creating the table.

#### Check Constraint

The check constraint evaluates whether the data added to column meets the expected criteria, which we specify with a logical test.

There is a debate on where checks should live either on application level or the database level. I believe it should live on the database level as the application layer is more prone to change than the database.

    CREATE TABLE check_constraint_example (
        user_id bigserial,
        user_role varchar(50),
        salary integer,
        CONSTRAINT user_id_key PRIMARY KEY (user_id),
        CONSTRAINT check_role_in_list CHECK (user_role IN('Admin', 'Staff')),
        CONSTRAINT check_salary_not_zero CHECK (salary > 0)
    );

#### Unique Constraint

Ensures column has unique values in each row. The difference between this and the primary key is that *UNIQUE* accepts multiple *NULL* values in a column while primary key doesn't. Good use case is email column to always ensure unique emails in the database.

    CREATE TABLE unique_constraint_example (
        contact_id bigserial CONSTRAINT contact_id_key PRIMARY KEY,
        first_name varchar(50),
        last_name varchar(50),
        email varchar(200),
        CONSTRAINT email_unique UNIQUE (email)
    );

#### Not NULL Constraint

Simply prevents a column from accepting empty values.

You can use the *ALTER TABLE* keyword to remove or add constraints after the table was created.

    CREATE TABLE not_null_example (
        student_id bigserial,
        first_name varchar(50) NOT NULL,
        last_name varchar(50) NOT NULL,
        CONSTRAINT student_id_key PRIMARY KEY (student_id)
    );

#### Benchmarking Queries for Index Performance

The *EXPLAIN ANALYZE* keyword outputs metrics for queries. You can use this to compare performances of any changes you make.

    EXPLAIN ANALYZE SELECT * FROM new_york_addresses
    WHERE street = 'BROADWAY';

#### Speeding Up Queries with Indexes 

You can fine tune the database by adding indexes to columns to speed up queries. However, this comes with a cost so don't index every column because indexing enlarges the database and imposes a maintenance cost on writing data.

This creates a B-Tree index on the new_york_addresses table:

    CREATE INDEX street_idx ON new_york_addresses (street);

Some considertaions when indexing:

- Consult the docs for the database manager you're using to learn about the kinds of indexing available and which to use on particular data types. PostgreSQL has five more index types in the addition to B-Tree. One called GiST, is particulary suited to the geometry data types.
- Consider adding indexes to any columns you'll use in table joins. Primary keys are indexed by default in PostgreSQL, but foreign key columns in related tables are not and are a good target for indexes. 
- Add indexes to columns that will frequently end up in a query *WHERE* clause. As you've seen, search performance is significantly improved via indexes. 
- Use *EXPLAIN ANALYZE* to test performance under a variety of configurations if you're unsure. Optimization is a process!