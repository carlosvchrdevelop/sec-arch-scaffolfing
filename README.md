# Security Architecture

This is a useful tool designed to make on-premise provisioning much easier. It allows you to easily deploy security provisioned architectures in a kubernetes cluster.

This tool provides ease when deploying services, scaling them or monitoring them by providing a simple user interface. Meanwhile several machines are supplied to act as a gateway to our architecture, providing security by default.

## Configuración inicial (provisional)

De momento, esta versión todavía requiere configuraciones manuales hasta que se realice la migración de Microk8s a Kubeadm. El sistema operativo soportado oficialmente es Ubuntu 22.04 en adelante.

### Instalación de microk8s, istio y OWASP Coraza en Linux Ubuntu

1. Instalación de Microk8s.

```bash
sudo snap install microk8s --classic --channel=1.30
```

2. Agregamos nuestro usuario actual al grupo de administración de Microk8s (esto solo debemos hacerlo en desarrollo, para producción debería crearse un usuario específico para manejar el clúster).

```bash
sudo usermod -a -G microk8s $USER
mkdir -p ~/.kube
chmod 0700 ~/.kube
```

3. Reiniciamos el PC.

```bash
sudo reboot
```

4. Comprobamos el estado de MicroK8s y esperamos a que esté listo.

```bash
microk8s status --wait-ready
```

5. Instalar el perfil mínimo de Istio.

```bash
istioctl install --set profile=minimal
```

6. Inyectar el sidecar al namespace default.

```bash
microk8s kubectl label namespace default istio-injection=enabled --overwrite
```

7. Aplicar la configuración del archivo incluido en este proyecto (coraza.yaml) activar el WAF.

```bash
microk8s kubectl apply -f coraza.yaml
```

## Iniciar servidor

```bash
npm start
```

## Iniciar frontal web

```bash
cd client
npm start
```

## Troubleshooting (Windows)

Si se inicia con un clúster de `Microk8s` con `multipass` (Windows), es posible que se vincule incorrectamente el clúster con la máquina virtual. En este caso debemos consultar la IP asignada al clúster, la IP asignada a la máquina virtual y, si son distintas, reconfigurarlo.

```bash
# Consultamos la IP del clúster
microk8s kubectl config view --raw

# Consultamos la IP de la máquina virtual
multipass info --all

# Reconfiguramos la IP
microk8s kubectl config set-cluster microk8s-cluster --server="https://[IP]:16443".
```
