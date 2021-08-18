# Creating Your First Database and Table
---

**SQL** , Structured Query Language, is more than extracting data, but a language for defining structures that hold data so we can organize realtionships in the data. Chief amoung these strucutres is the table.

**Relational Databases** - the power for tables to be able to relate to one another. For example student-enrollment, students, and classes are relate to one another through a unique key.

Database builders prefer to organize data using seperate tables for each main 'entity' the database manages in order to reduce redundant data. 

When you create a table you assign a name to each column and enforce a data type.

    CREATE TABLE teachers (
        id bigserial,
        first_name varchar(25),
        last_name varchar(50),
        school varchar(50),
        hire_data data,
        salary numeric
    );

Constraints ensure columns have data and are not entering duplicates.

When manually inserting statemnts into a table you specificy the table name and all the relevant data fields you will be adding to. 

    INSERT TO teachers (first_name, last_name, school, hire_date,  salary)
    VALUES ('Janet', 'Smith', 'F.D Roosevelt HS', '2011-10-30', 362000);