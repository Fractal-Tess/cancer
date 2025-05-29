FROM mcr.microsoft.com/mssql/server:2022-latest

# # Install bash
# RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

# Copy initialization script
COPY init-db.sh /init-db.sh

# Make the script executable
RUN chmod +x /init-db.sh

# Set the entrypoint
ENTRYPOINT ["/init-db.sh"] 