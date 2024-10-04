-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(50) NOT NULL,
    phoneNumber NVARCHAR(50) NOT NULL,
    password NVARCHAR(256) NOT NULL,
    
    Active BIT NOT NULL DEFAULT 1
);
GO

-- Create a new table called 'Assignments' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Assignments', 'A') IS NOT NULL
DROP TABLE dbo.Assignments
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Assignments
(
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,
    startPoint NVARCHAR(50) NOT NULL,
    endPoint NVARCHAR(50) NOT NULL,
    status INTEGER NOT NULL,
    type INTEGER NOT NULL,
    email NVARCHAR(256) NOT NULL,
    name NVARCHAR(50) NOT NULL,
);
GO

SELECT * FROM dbo.Users
SELECT * FROM dbo.Assignments

UPDATE dbo.Users SET Status = 1 WHERE Status = 0