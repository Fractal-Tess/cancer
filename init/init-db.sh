#!/bin/bash
set -e

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Required environment variables
: "${MSSQL_HOST:=localhost}"
: "${SA_PASSWORD:?SA_PASSWORD not set}"
: "${DB_NAME:=safe_car}"

echo "--------------------------------"
echo "Database initialization starting..."
echo "MSSQL_HOST: $MSSQL_HOST"
echo "DB_NAME: $DB_NAME"
echo "--------------------------------"

# Wait for SQL Server to be ready for DDL
echo "Waiting for SQL Server to be ready for DDL..."
for i in {1..30}; do
    if /opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "SELECT 1" -C -N -t 5 > /dev/null 2>&1; then
        echo "SQL Server is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "Error: SQL Server did not become ready in time"
        exit 1
    fi
    echo "SQL Server not ready yet... ($i/30)"
    sleep 2
done

# Create the database
echo "Creating database $DB_NAME..."
if /opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "CREATE DATABASE [$DB_NAME]" -C -N -t 30; then
    echo "Database created successfully"
else
    echo "Error: Failed to create database"
    exit 1
fi

# Verify database was created
echo "Verifying database creation..."
if /opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "SELECT name FROM sys.databases WHERE name = '$DB_NAME'" -C -N -t 30 | grep -q "$DB_NAME"; then
    echo "Database verification successful"
else
    echo "Error: Database verification failed"
    exit 1
fi

echo "--------------------------------"
echo "Database initialization completed successfully!"
echo "--------------------------------"

# You can add additional setup commands here, such as:
# - Creating tables
# - Adding users
# - Setting up permissions
# - Importing initial data