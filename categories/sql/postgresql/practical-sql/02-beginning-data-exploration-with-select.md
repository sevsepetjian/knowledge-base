# Beginning Data Exploration With Select
---

Interviewing the data allows you to see the whole story behind it, and you begin that process wth the *SELECT* keyword.

    SELECT * FROM my_table; -- fetches very row and column in a table
    SELECT some_column, another_column, amazing_column FROM table_name; -- fetches specific columns and rows

Sorting names, numbers, symbolts, etc. is all based on the encoding that PostgreSQL uses for each letter. For example capital letters appear before letters in some ordering instances. 

To retrieve only distinct values you can use the *DISTINCT* keyword every the *SELECT* keyword to retrieve only unique values and no duplications.

    SELECT DISTINCT school
    FROM teachers;

In SQL, we order the results of a query using a clause containing the keyword *ORDER BY* followed by the name of the column or columns to sort. Applying this clause doesn't change the original table, only the result of they query. 

    SELECT first_name, last_name, salary
    FROM teachers
    ORDER BY salary DESC; -- default value of ORDER BY is ascending

Your queries should answer specific questions, so it makes sense. Use shorter, multiple queries to answer mutliple questions and gain an understanding of the larger picture.

We can filter rows with the keyword *WHERE* and only return rows that meet certain criteria with the use of operators (=, !=, <, >, <=, >=, LIKE, ILIKE, BETWEEN, IN, NOT). You can only combine these operators with *AND* and *OR* to chain multiple criteria. 

Few examples of the above operators:

    SELECT first_name, last_name, school
    FROM teachers
    WHERE first_name = 'Janet';

    SELECT school
    FROM teachers
    WHERE school != 'F.D. Roosevelt HS';

    SELECT first_name, last_name, salary
    FROM teachers
    WHERE salary >= 43500;
 
    SELECT first_name
    FROM teachers
    WHERE first_name LIKE 'sam%'; -- % = wildcard matching one or more characters. LIKE = case sensitive.

    SELECT first_name
    FROM teachers
    WHERE first_name ILIKE 'sam%'; -- ILIKE = case insensitive;

Using case insensitive searches like *ILIKE* helps you avoid the common mistake of assuming whoever is making entries will accurately do so. 

