# Basic Math and Stats With SQL
---

SQL handles calculations ranging from basic math through advanced statistics. 

#### Math and Data Types

In calculations with (+, -, *, /) the data types returned are:

- Two integers return an integer.
- A numeric on either side of the operator returns a numeric.
- Anything with a floating-point number returns a floating point number of type double precision.
- Exponentiation, roots, and factorials always return either numeric or floating point types.

PostgreSQL uses mathematical operator precedence.

#### *As* Keyword

You can use the *AS* keyword to rename columns on import or when simply selecting them.

    SELECT field_name,
           field_name_1 AS 'Field Name 1',
           field_name_2 As 'Field Name 2'
    FROM table_name;

#### Adding and Subtracting Columns

You can add or subtract columns when you select the appropriate fields.

    SELECT geo_name,
           state_us_abbreviation AS "st",
           p0010001 AS "Total",
           p0010003 + p0010004 + p0010005 + p0010006 + p0010007
               + p0010008 + p0010009 AS "All Races",
           (p0010003 + p0010004 + p0010005 + p0010006 + p0010007
               + p0010008 + p0010009) - p0010001 AS "Difference"
    FROM us_counties_2010
    ORDER BY "Difference" DESC;

#### Various Statiscal Calculations With PostgreSQL

**Find Percentages of the Whole**

    SELECT geo_name,
           state_us_abbreviation AS "st",
           (CAST(p0010006 AS numeric(8,1)) / p0010001) * 100 AS "pct_asian"
    FROM us_counties_2010
    ORDER BY "pct_asian" DESC;

**Tracking Percent Change**

Percent change calculations are often employed when analyzing change over time, and they're particularly useful for comparing change among similar items.

    SELECT department,
           spend_2014,
           spend_2017,
           round( (spend_2017 - spend_2014) /
                        spend_2014 * 100, 1 ) AS "pct_change"
    FROM percent_change;

**Aggregate Functions for Averages and Sums**

SQL also lets you calculate a result from values within the same column using aggreate functions.

    SELECT sum(p0010001) AS "County Sum",
           round(avg(p0010001), 0) AS "County Average"
    FROM us_counties_2010;

**Finding the Median**

The median value in a set of numbers is as important an indicator, if not more so, then the average. Averages don't represent groups well when there are outliers in the data. For example the housing market typically uses medians because one or two expensive homes that sell will skew the average.

Median is not built inside of PostgreSQL, but we can use the percentile function to help find the median. There are two versions of this function, percentile_cont (returns continuous values i.e. 3.5) and Percentile_disc (returns discrete values i.e. 3).

    SELECT sum(p0010001) AS "County Sum",
           round(avg(p0010001), 0) AS "County Average",
           percentile_cont(.5)
           WITHIN GROUP (ORDER BY p0010001) AS "County Median"
    FROM us_counties_2010;

**Finding the Mode**

PostgreSQL has a built in mode function.

    SELECT mode() WITHIN GROUP (ORDER BY p0010001)
    FROM us_counties_2010;