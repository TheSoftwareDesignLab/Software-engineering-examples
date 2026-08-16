# Checkout App — entrada para ChaosEater

Paquete Skaffold **sin sección `build`**, compatible con cómo ChaosEater procesa el zip (solo lee `skaffold.yaml` + `manifests.rawYaml`).

Los manifiestos usan `image: checkout-app:latest` con `imagePullPolicy: Never`. Hay que cargar esa imagen en el clúster `kind` de ChaosEater **antes** de subir el zip.

## Cargar la imagen en kind (sandbox)

Desde la raíz del repo del taller (o donde esté `chaos/checkout-app/app`):

```powershell
docker build -t checkout-app:latest .\chaos\checkout-app\app
docker save checkout-app:latest -o checkout-app.tar
# Usar /app (volumen montado del sandbox); /tmp del contenedor no retiene el archivo
docker cp checkout-app.tar chaos-eater-sandbox:/app/checkout-app.tar
docker exec chaos-eater-sandbox kind load image-archive /app/checkout-app.tar --name chaos-eater-cluster
docker exec chaos-eater-sandbox rm -f /app/checkout-app.tar
Remove-Item .\checkout-app.tar -Force
```

## Zip para la GUI

Usa `chaos/checkout-app-chaoseater.zip` (ya generado) o vuelve a crearlo:

```powershell
Compress-Archive -Path chaos\checkout-app-chaoseater\skaffold.yaml, chaos\checkout-app-chaoseater\manifests -DestinationPath chaos\checkout-app-chaoseater.zip -Force
```

Sube ese `.zip` a ChaosEater con `New deployment` marcado.
