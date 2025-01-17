#!/bin/bash

# Script to manage MongoDB port access through firewall (UFW)

PORT=27017
ACTION="$1"

if [[ -z "$ACTION" ]]; then
  echo "Usage: $0 <open|close>"
  exit 1
fi

case "$ACTION" in
  open)
    echo "Opening port $PORT for MongoDB access..."
    sudo ufw allow $PORT/tcp
    sudo ufw reload
    echo "Port $PORT opened."
    ;;
  close)
    echo "Closing port $PORT for MongoDB access..."
    sudo ufw deny $PORT/tcp
    sudo ufw reload
    echo "Port $PORT closed."
    ;;
  *)
    echo "Invalid action: $ACTION. Use 'open' or 'close'."
    exit 1
    ;;
esac

exit 0
