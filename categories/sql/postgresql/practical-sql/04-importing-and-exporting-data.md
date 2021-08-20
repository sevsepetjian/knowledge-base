# Importing and Exporting Data
---

If your data exists in a *delimited* text file (with one table row per line of text and each column value separated by a comma or other character), PostgreSQL can import the data in bulk via its *COPY* command.

3 steps for most of the imports you'll do:

- Prep the source data in the form of a delimited text file.
- Create a table to store the data.
- Write a *COPY* script to perform the import.

**Delimited text file** - is the common middle ground for most databases. Commas are most often used in these files to seperate eah row. 

**CSV** = comma seperate values. 

In example of this is *John, Doe, "Main St, Hyde Park, NY", 845-666-1212*. Double quotes are used to differentiate the commas used inside values from the commas used to seperate values.

You can ignore header rows in PostgreSQL by toggling the *HEADER* option during the import. 

    COPY table_name
    FROM 'C:\YourDirectory\your_file.csv'
    WITH (FORMAT CSV, HEADER);

For the *WITH* keyword there are several options you can include:

- Input and output file format - CSV, TEXT, BINARY. You will almost always use CSV.
- Presence of header row - Adding *HEADER* tells PostgreSQL to ignore the header column on import.
- Delimiter - allows you to change the delimiter character to anything else. Default option are commas.
- Quote character - allows you to change the quote character to ignore delimiters in values. Default option are the dobule quotes.

For some numeric values like 050, leave it as a string because if you use a integer it will strip the leading 0 off and it loses its overall meaning, especially in a situation where you are recording certain codes. 

To account for empty columns from a source file add: *COPY table_name (all, active, columns);*

To export data from a table:

    COPY table_name
    TO 'PATH\file_name.txt'
    WITH (FORMAT CSV, HEADER, DELIMITER '|');

If exporting to text files change the delimiter to something else. Save commas for CSV files.
