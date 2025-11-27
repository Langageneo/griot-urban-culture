#!/usr/bin/env bash
# 🔨🤖🔧 Script universel de démarrage pour griot-urban-app (Web + Mobile)
set -euo pipefail

# -------------------------------
# 0️⃣ Fonctions utilitaires
# -------------------------------
timestamp() {
  date +"%Y-%m-%d %H:%M:%S"
}

log() {
  echo "[$(timestamp)] $*"
}

# -------------------------------
# 1️⃣ Installation des dépendances
# -------------------------------
if [ ! -d "node_modules" ]; then
  log "📦 node_modules manquant, installation des dépendances..."
  if [ -n "${CI-}" ]; then
    log "🔧 Environnement CI détecté, utilisation de npm ci"
    npm ci --production
  else
    npm install --production
  fi
fi

# -------------------------------
# 2️⃣ Vérification des variables d'environnement
# -------------------------------
REQUIRED_VARS=("FLW_PUBLIC_KEY" "FLW_SECRET_KEY" "YOUTUBE_API_KEY" "MONGODB_URI")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var-}" ]; then
    MISSING_VARS+=("$var")
  fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  log "❌ Variables d'environnement manquantes: ${MISSING_VARS[*]}"
  exit 1
fi

# -------------------------------
# 3️⃣ Démarrage du serveur avec surveillance
# -------------------------------
start_server() {
  if command -v nodemon >/dev/null 2>&1; then
    log "🚀 Démarrage du serveur avec nodemon..."
    nodemon server.js
  else
    log "⚡ nodemon non trouvé, démarrage avec node..."
    node server.js
  fi
}

# -------------------------------
# 4️⃣ Boucle de relance automatique (dev ou mobile)
# -------------------------------
RESTART_DELAY=3  # secondes avant relance si crash
while true; do
  start_server
  log "⚠️ Le serveur a crashé. Redémarrage dans $RESTART_DELAY secondes..."
  sleep $RESTART_DELAY
done
