#!/bin/bash

# 1. Installation des dépendances (si node_modules/ manquant)
if [ ! -d "node_modules" ]; then
  echo "Installation des dépendances..."
  npm install --production
fi

# 2. Vérification des variables d'environnement critiques
MISSING_VARS=()
REQUIRED_VARS=("FLW_PUBLIC_KEY" "FLW_SECRET_KEY" "YOUTUBE_API_KEY" "MONGODB_URI")

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING_VARS+=("$var")
  fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  echo "❌ Variables d'environnement manquantes: ${MISSING_VARS[*]}"
  exit 1
fi

# 3. Démarrage du serveur
echo "Démarrage du serveur Node.js..."
node server.js
