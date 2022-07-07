#!/bin/bash

if ! command -v az &> /dev/null
then
  echo "You don't have azure CLI installed"
  exit 1
fi

UUID=$RANDOM
RG="ship-manager-api-demo-$UUID"
RESOURCENAME="ship-manager-$UUID"
ACR="shipmanager$UUID"

set -x

if ! command -v kubectl &> /dev/null
then
  sudo az aks install-cli >/dev/null
fi

az group create -l eastus -n $RG >/dev/null
az cosmosdb create --kind MongoDB --enable-free-tier -n $RESOURCENAME -g $RG >/dev/null &
az acr create -n $ACR --sku Basic -g $RG >/dev/null
az acr update -n $ACR --admin-enabled true >/dev/null

az aks create -n $RESOURCENAME -g $RG \
-a http_application_routing \
-l southcentralus \
-s Standard_B2s \
--attach-acr $ACR \
--generate-ssh-keys \
-c 2 >/dev/null

az aks get-credentials -n $RESOURCENAME -g $RG --admin

set +x

SUBSCRIPTION_ID=$(az account show --query id -o tsv)
ACR_PASSWORD=$(az acr credential show -n $ACR --query "passwords[0].value" -o tsv)
AZURE_CREDENTIALS=$(az ad sp create-for-rbac --role contributor --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RG --sdk-auth)
DB_CONNECTION=$(az cosmosdb keys list -n $RESOURCENAME -g $RG --type connection-strings --query "connectionStrings[0].connectionString")
DNS_NAME=$(az aks show -n $RESOURCENAME -g $RG --query "addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName")

printf "\n\n\n### Resource creation successful, please NOTE these variables as YOU'LL NEED THEM TO FINISH THE SETUP: ###\n\n\n"
printf ">> Azure Container Registry Password: %s \n" "$ACR_PASSWORD"
printf ">> Azure Container Registry Username: %s \n" "$ACR"
printf ">> DB Connection String: %s\n" "$DB_CONNECTION"
printf ">> AKS DNS Zone: %s\n" "$DNS_NAME"
printf ">> Azure Service Principal token key (copy in full):"
echo "    $AZURE_CREDENTIALS"
