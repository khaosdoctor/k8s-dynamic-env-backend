#!/bin/bash

if ! command -v az &> /dev/null
then
  echo "You don't have azure CLI installed"
  exit 1
fi

RG="ship-manager-pipeline"
RESOURCENAME="ship-manager"
ACR="shipmanager"

set -x

sudo az aks install-cli >/dev/null &

az group create -l eastus -n $RG >/dev/null
az cosmosdb create --kind MongoDB -n $RESOURCENAME -g $RG >/dev/null &
az acr create -n $ACR --sku Basic -g $RG >/dev/null
az acr update -n $ACR --admin-enabled true >/dev/null

az aks create -n $RESOURCENAME -g $RG \
-a http_application_routing \
--attach-acr $ACR \
-s Standard_B2s \
--generate-ssh-keys \
-c 2 >/dev/null

az aks get-credentials -n $RESOURCENAME -g $RG --admin

set +x

ACR_PASSWORD=$(az acr credential show -n $ACR --query "passwords[0].value" -o tsv)
AZURE_CREDENTIALS=$(az ad sp create-for-rbac --sdk-auth)
DB_CONNECTION=$(az cosmosdb keys list -n $RESOURCENAME -g $RG --type connection-strings --query "connectionStrings[0].connectionString")
DNS_NAME=$(az aks show -n $RESOURCENAME -g $RG --query "addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName")

printf "\n\n\n### Resource creation successful, please NOTE these variables as YOU'LL NEED THEM TO FINISH THE SETUP: ###\n\n\n"
printf ">> Azure Container Registry Password: %s (username is the name of the ACR)\n" "$ACR_PASSWORD"
printf ">> DB Connection String: %s\n" "$DB_CONNECTION"
printf ">> AKS DNS Zone: %s\n" "$DNS_NAME"
printf ">> Azure Service Principal token key (copy in full):"
echo "    $AZURE_CREDENTIALS"
