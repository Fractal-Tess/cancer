FROM mcr.microsoft.com/mssql/server:2022-latest

# Install dos2unix to handle line endings
RUN apt-get update && apt-get install -y dos2unix && rm -rf /var/lib/apt/lists/*

# Copy initialization script
COPY init-db.sh /init-db.sh

# Convert line endings and make the script executable
RUN dos2unix /init-db.sh && chmod +x /init-db.sh

# Set the entrypoint
ENTRYPOINT ["/init-db.sh"] 