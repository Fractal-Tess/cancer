FROM ubuntu:22.04@sha256:67cadaff1dca187079fce41360d5a7eb6f7dcd3745e53c79ad5efd8563118240

# Install dependencies and mssql-tools18
ENV ACCEPT_EULA=Y
ENV DEBIAN_FRONTEND=noninteractive

# Fix time synchronization issues
RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    echo "UTC" > /etc/timezone && \
    apt-get update && \
    apt-get install -y --no-install-recommends tzdata && \
    dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update \
    && apt-get install -y curl apt-transport-https gnupg2 software-properties-common \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/opt/mssql-tools18/bin"

COPY init-db.sh /init-db.sh
RUN chmod +x /init-db.sh 