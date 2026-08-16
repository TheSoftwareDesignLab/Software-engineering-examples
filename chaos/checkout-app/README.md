# Checkout App

Mini checkout para el codelab de chaos testing / chaos engineering agentic.

```text
frontend (2) → api (2) → payments (2)
```

## Quick start

```bash
docker build -t checkout-app:latest ./app
```

**Docker Desktop (Kubernetes):** importa la imagen al nodo (PowerShell):

```powershell
docker save checkout-app:latest -o $env:TEMP\checkout-app.tar
docker cp $env:TEMP\checkout-app.tar desktop-control-plane:/checkout-app.tar
docker exec desktop-control-plane ctr -n k8s.io images import /checkout-app.tar
```

**kind:** `kind load docker-image checkout-app:latest`

```bash
kubectl apply -f manifests/
kubectl -n chaos-lab port-forward svc/frontend 8080:80
curl.exe http://127.0.0.1:8080/checkout
```

## Chaos Mesh experiments

```bash
kubectl apply -f chaos/01-podchaos-payments-one.yaml
kubectl apply -f chaos/02-networkchaos-payments-delay.yaml
```

En Docker Desktop, si `NetworkChaos` falla por falta de `sch_netem`, usa:

```bash
kubectl -n chaos-lab set env deployment/payments PAYMENT_DELAY_MS=2000
```

## Nota para el instructor (spoiler)

No revelar al inicio del taller. El fallo intencional está en `api`: timeout corto y sin retries hacia `payments`. El Experimento A (pod-kill one) suele pasar; el B (dependencia lenta) suele fallar. Tras el fallo, el estudiante inspecciona env de `api` y ajusta timeout/retries.
