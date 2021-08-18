# Understanding Data Types
---

**Data Dictionary** - a document that lists each column, specifies whether its a number, character, or other type, and explains the column values.

The three data type categories encounterd most are:

- **Characters** - any character or symbol.
- **Numbers** - Includes whole numbers and fractions.
- **Dates and times** - Types holding temporal information. 

Character types include:

- *char(n)* - a fixed-length column where the haracter lenght is specified by *n*.
- *varchar(n)* - a variable length column where the maximum length is specified by *n*. Unlike, *char* if you insert fewer characters than the maximum PostgreSQL will not store extra spaces. 
- *text* - a variable-length column of unlimited length. 

Becuase of the space savings of *varchar* and *text* it seems that they have an advantage over *char*. However, there are use cases like state abbreviations (CA) that will always be 2 characters.  

Generally number types include:

- **Integers** - Whole numbers, both positive and negative. 
- **Fixed-point and floating-point** - Two formats of fractions of whole numbers.

Guidelines when choosing number data types:

1. Use integers when possible. Unless your data uses decimals, stick with integer types.
2. If you're working with decimal data and need calculations to be exact (dealing with money, for example), choose *numeric* or its equivalent *decimal*. Float types will save space, but the inexactness of floating-point math won't pass muster in many applications. Use them only when exactness is not important. 
3. Choose a big enough number type. Unless you're designing a database to hold millions of rows err on the side of bigger. When using *numeric* or *decimal*, set the precision large enough to accomodate the number of digits on both sides of the decimal point. With whole numbers, use *bigint* unless you're absolutely sure column values will be constrainged to fit into the smaller *integer* or *smallint* types.

Dates and Times types in PostgreSQL:

- **timestamp** - records date and time and can adjust for timezones with the keywords *time zone*.
- **date** - records the date.
- **time** - records just the time (remeber to add *time zone*). 
- **interval** - holds a value representing a unit of time expressed in the format *quantity unit*. It doesn't record the start or end of a time period only its length (12 days or 8 hours). 

Miscellaneous Types:

- **Boolean** - true/false.
- **Geometric** - points, lines, circles, and other two-dimensional objects.
- **Network address** - IP, MAC.
- **UUID** - Universally Unique Identifier.
- **XML and JSON** - stores information in strucutred formats.

We can use the *CAST* keyword to tranform values from one type to another.

    SELECT timestamp_column, CAST(timestamp_column AS varchar(10))

You can use this to combine  characters in new columns or run certain calculations (if turned into a integer).