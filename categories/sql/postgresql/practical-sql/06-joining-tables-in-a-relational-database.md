# Joining Tables in a Relational Database
---

A process known as table join allows us to link rows in one table to rows in other tables.

#### Linking Tables Using *JOIN*

The *JOIN* statement links one table to another in the database during a query using matching values in columns we specify in both tables.

    SELECT *
    FROM table_a JOIN table_b
    ON table_a.key_column = table_b.foreign_key_column

#### Relating Tables with Key Columns

**Primary Key** - a column or collection of columns whose values uniquely identify each row in a table. It enforces these constraints:

- The column or collection of columns must have a unique value for each row.
- The column or collection of columns can't have missing values.

**Foreign Key** - the value in a column refering to the value in the other tables primary column. You create this type of key with the *CONSTRAINT* keyword. It's only restraint is that it requires the other key to exist in the other tables primary column.

*UNIQUE* keyword enforces no duplication of values. For example in the departments table, only one tax department can exists in each city. 

Advantages of breaking data into components:

- Avoid repeat information, by seperating entities into appropriate tables.
- Cramming unrelated data into one table makes future management very difficult. 

#### Querying Multiple Tables Using *JOIN*

You can select multiple tables and view both with the *JOIN* keyword, using the same code as the example above. 

It is helpful to think of two tables side by side, one on the left of *JOIN* and the other on the right. 

Various types of *JOIN*:

- **JOIN** - returns rows from both tables where matching value are found in the joined columns of both tables. Alternate syntax is *INNER JOIN*. 

![JOIN table results](/static/assets/practical-sql-06-join.png)

- **LEFT JOIN** - returns every row from the left able plus rows that match values in the joined column from the right table. When a left table row doesn't match one from the right, the result shows no values from the right.

![LEFT JOIN table results](/static/assets/practical-sql-06-left-join.png)

- **RIGHT JOIN** - returns every row from the right able plus rows that match values in the joined column from the left table. When a right table row doesn't match one from the left, the result shows no values from the left.

![RIGHT JOIN table results](/static/assets/practical-sql-06-right-join.png)

- **FULL OUTER JOIN** - Returns every row from both tables and matches rows; then joins the rows where values in the joined columns match.

![FULL OUTER JOIN table results](/static/assets/practical-sql-06-full-outer-join.png)

- **CROSS JOIN** - returns every possible combination of rows from both tables.

![CROSS JOIN table results](/static/assets/practical-sql-06-cross-join.png)

#### Using *NULL* to Find Rows with Mising Values

*NULL* is different than *0* or empty string *""*. *NULL* specifically states the value is unknown while the other two leave it open to interpretation. Also you can use *NULL* across data types unlike the other two as well.

When SQL *JOIN* returns empty rows, those columns don't come back empty but with *NULL*.

#### Three Types of Table Relationships

- **One-to-One Relationship** - There is only one match for an *id* in each of the tables joined. No dpulicate *ids* of table 1 exists in either table. There is only one *id* on the left and one *id* on the right.
- **One-to-Many Relationship** - A key value in one table will have multiple matching values in the second table. For example car manufacturers refrence multiple car models that are stored in another table. 
- **Many-to-Many Relationship** - Multiple rows in the first table will have multiple matching rows in the second table. For example, baseball players and their positions. Each player can be assigned to multiple positions, and each position can be played/assigned to mulitple players.

#### Selecting Specific Columns in a *JOIN*

When you are looking/selecting specific columns you must add the column and table name.

    SELECT schools_left.id,
           schools_left.left_school,
           schools_right.right_school
    FROM schools_left LEFT JOIN schools_right
    ON schools_left.id = schools_right.id;

#### Simplifying *JOIN* syntax with Table Aliases

You can use *AS* to create table aliases so you don't need to spell out the full table name for every field chosen. This helps significantly with code readability. 

    SELECT lt.id,
           lt.left_school,
           rt.right_school
    FROM schools_left AS lt LEFT JOIN schools_right AS rt
    ON lt.id = rt.id;

#### Joining Multiple Tables

We can continue adding tables to the query as long as we have columns with matching values to join on.

    SELECT lt.id, lt.left_school, en.enrollment, gr.grades
    FROM schools_left AS lt LEFT JOIN schools_enrollment AS en
        ON lt.id = en.id
    LEFT JOIN schools_grades AS gr
        ON lt.id = gr.id;

#### Performing Math on Joined Table Columns

We can use all the math functions from chapter 5 on *JOIN*. 

    SELECT c2010.geo_name,
           c2010.state_us_abbreviation AS state,
           c2010.p0010001 AS pop_2010,
           c2000.p0010001 AS pop_2000,
           c2010.p0010001 - c2000.p0010001 AS raw_change,
           round( (CAST(c2010.p0010001 AS numeric(8,1)) - c2000.p0010001)
               / c2000.p0010001 * 100, 1 ) AS pct_change
    FROM us_counties_2010 c2010 INNER JOIN us_counties_2000 c2000
    ON c2010.state_fips = c2000.state_fips
       AND c2010.county_fips = c2000.county_fips
       AND c2010.p0010001 <> c2000.p0010001
    ORDER BY pct_change DESC;