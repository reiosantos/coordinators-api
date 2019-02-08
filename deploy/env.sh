#!/usr/bin/env bash

get_var() {
    local name="$1"
    curl -s -H "Metadata-Flavor: Google" "http://metadata.google.internal/computeMetadata/v1/instance/attributes/${name}"
}
export PORT="$(get_var "PORT")"
export COORDINATORS_DATABASE_URL="$(get_var "COORDINATORS_DATABASE_URL")"
export NODE_ENV="$(get_var "NODE_ENV")"
export JWT_SECRET="$(get_var "JWT_SECRET")"
export ADMIN_PASSWORD="$(get_var "ADMIN_PASSWORD")"
