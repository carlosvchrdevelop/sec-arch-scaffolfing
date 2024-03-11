export const deploymentTemplate: string = `apiVersion: v1
kind: Service
metadata:
    name: '{name}'
    labels:
        app: '{name}'
spec:
    type: '{serviceType}'
    selector:
        app: '{name}'
    ports:
        - port: {externalPort}
          targetPort: {internalPort}
---
apiVersion: v1
kind: Secret
metadata:
    name: '{name}'
    labels:
        app: '{name}'
type: Opaque
data:
    WELCOME: V0VMQ09NRSE=
---
apiVersion: apps/v1
kind: Deployment
metadata:
    name: '{name}'
    labels:
        app: '{name}'
spec:
    replicas: {replicas}
    selector:
        matchLabels:
            app: '{name}'
    template:
        metadata:
            labels:
                app: '{name}'
        spec:
            restartPolicy: Always
            containers:
                - name: '{name}'
                  image: '{image}'
                  envFrom:
                    - secretRef:
                            name: '{name}'
                  resources:
                      limits:
                          memory: '{memory}'
                          cpu: '{cpu}'
                  ports:
                      - containerPort: {internalPort}
`;
