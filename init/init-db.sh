#!/bin/bash
# Wait for SQL Server to be ready for DDL

: "${MSSQL_HOST:=localhost}"
: "${SA_PASSWORD:?SA_PASSWORD not set}"

echo "--------------------------------"
echo "Waiting for SQL Server to be ready for DDL..."
for i in {1..30}; do
  /opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "SELECT 1" -C -N -t 5 && break
  echo "SQL Server not ready yet... ($i/30)"
  sleep 2
done

echo "Running sqlcmd"
echo "MSSQL_HOST: $MSSQL_HOST"
echo "--------------------------------"

# Create the safe_car database - add TrustServerCertificate=true
/opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "CREATE DATABASE safe_car" -C -N -t 30

# Verify database was created
/opt/mssql-tools18/bin/sqlcmd -S "$MSSQL_HOST" -U sa -P "$SA_PASSWORD" -Q "SELECT name FROM sys.databases" -C -N -t 30

# You can add additional setup commands here, such as:
# - Creating tables
# - Adding users
# - Setting up permissions
# - Importing initial data