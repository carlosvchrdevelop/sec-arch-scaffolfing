# Security Architecture

This is a useful tool designed to make on-premise provisioning much easier. It allows you to easily deploy security provisioned architectures in a kubernetes cluster.

This tool provides ease when deploying services, scaling them or monitoring them by providing a simple user interface. Meanwhile several machines are supplied to act as a gateway to our architecture, providing security by default.

## Requisitos

It is necessary to have kubernetes and minikube installed and the kubectl and minikube commands must be found in the PATH, since the platform makes use of these commands.

## Iniciar servidor

```bash
npm start
```

## Iniciar frontal web

```bash
cd client
npm start
```

## Troubleshooting

Si se inicia con un clúster de `Microk8s` con `multipass` en Windows es posible que se vinculen incorrectamente el clúster con la máquina virtual. En este caso debemos consultar la IP asignada al clúster, la IP asignada a la máquina virtual y, si son distintas, reconfigurarlo.

```bash
# Consultamos la IP del clúster
microk8s kubectl config view --raw

# Consultamos la IP de la máquina virtual
multipass info --all

# Reconfiguramos la IP
microk8s kubectl config set-cluster microk8s-cluster --server="https://[IP]:16443".
```
