#!/bin/bash

# Define variables
CONTAINER_NAME=$(docker-compose ps -q postgres)
BACKUP_PATH="/home/backups"
TIMESTAMP=$(date +"%Y%m%d%H%M")

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_PATH

# Run pg_dump command
docker exec $CONTAINER_NAME pg_dump -U postgres Lotus > $BACKUP_PATH/backup_$TIMESTAMP.sql

# Optional: Remove old backups older than 14 days
find $BACKUP_PATH -type f -mtime +14 -name '*.sql' -exec rm -- '{}' \;
