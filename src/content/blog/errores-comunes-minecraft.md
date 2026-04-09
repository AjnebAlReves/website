---
title: "Errores comunes en servidores con Plugins y/o Mods"
description: "Guía actualizada de los errores más frecuentes al montar un servidor de Minecraft con plugins o mods, y cómo resolverlos."
author: "Ajneb Al Revés"
publishDate: 2026-03-15
updatedDate: 2026-03-15
tags: ["minecraft", "servidores", "plugins", "mods", "flyxnodes", "guía"]
---

> Versión actualizada de la guía original publicada en enero 2023. Se mantiene el espíritu, se corrigen detalles y se agregan errores nuevos que siguen apareciendo en soporte.

---

## Error #1 — `No X11 Display was found`

Este error aparece cuando intentás ejecutar el **instalador gráfico** de Forge, Fabric u otro loader directamente en el servidor. Los instaladores de ese tipo requieren entorno gráfico, que un VPS/panel no tiene.

**Solución:**

Instalá el servidor en tu PC local y subí los archivos resultantes por SFTP.

```bash
# Tus credenciales SFTP están en la sección de Archivos del panel
# Formato de conexión:
sftp://usuario.ID_SERVIDOR:CONTRASEÑA@nodo.flyxnodes.xyz:2022
```

Podés usar [FileZilla](https://filezilla-project.org/) o [WinSCP](https://winscp.net/). La contraseña no se muestra por defecto en el panel, tenés que escribirla manualmente en el cliente SFTP.

---

## Error #2 — `You need to agree to the EULA`

```
[main/INFO]: You need to agree to the EULA in order to run the server.
Go to eula.txt for more info.
[Pterodactyl Daemon]: Detected server process in a crashed state!
[Pterodactyl Daemon]: Exit code: 0
```

El servidor no arranca hasta que aceptés los términos de Mojang.

**Solución:**

Entrá al Administrador de Archivos → `eula.txt` y cambiá:

```properties
eula=false
```
por:
```properties
eula=true
```

---

## Error #3 — Versión incorrecta del servidor

El servidor arranca con una versión distinta a la que esperabas. Suele pasar cuando el JAR que subiste es de otra versión o quedó un archivo viejo en la carpeta.

**Solución:**

Descargá el JAR correcto desde la fuente oficial del software:

| Software | Fuente oficial |
|----------|---------------|
| PaperMC  | [papermc.io](https://papermc.io/downloads) |
| Purpur   | [purpurmc.org](https://purpurmc.org) |
| Fabric   | [fabricmc.net](https://fabricmc.net/use/server/) |
| Forge    | [files.minecraftforge.net](https://files.minecraftforge.net) |
| Spigot   | [spigotmc.org](https://www.spigotmc.org/wiki/buildtools/) |

Evitá descargar JARs de páginas de terceros sin reputación.

---

## Error #4 — OOM Killer / Servidor muerto sin razón aparente

```
[Pterodactyl Daemon]: Exit code: 137
[Pterodactyl Daemon]: Out of memory: true
```

El proceso fue matado por el sistema operativo porque el contenedor se quedó sin RAM. Muy común cuando usás `Xmx` fijo muy alto, o cuando hay plugins con memory leaks.

**Solución:**

En vez de usar `-Xmx` fijo, usá el flag de porcentaje que respeta el límite del contenedor:

```bash
-Xms128M -XX:MaxRAMPercentage=95.0
```

Si el problema persiste, revisá si algún plugin está causando el leak. Podés usar `/timings report` (Paper) o Spark para identificarlo.

> En FlyxNodes podés ver el uso de RAM en tiempo real desde el panel. Si el servidor sube de forma constante sin bajar, es casi siempre un leak de plugin.

---

## Error #5 — Puerto en uso / servidor no accesible

```
[ERROR] Failed to bind to address 0.0.0.0:25565
java.net.BindException: Address already in use
```

El puerto que configuraste ya está siendo usado por otro proceso, o el panel no lo asignó correctamente.

**Solución:**

- En Pterodactyl, **no cambies el puerto manualmente** en `server.properties`. El panel lo inyecta via variable de entorno (`SERVER_PORT`). Si lo sobreescribís, entra en conflicto.
- Si estás en un VPS, revisá con `ss -tlnp | grep 25565` qué proceso está usando el puerto.
- Si el servidor arranca pero no podés conectarte desde fuera, verificá que el puerto esté abierto en el firewall:

```bash
# UFW
sudo ufw allow 25565/tcp

# iptables
sudo iptables -A INPUT -p tcp --dport 25565 -j ACCEPT
```

---

## Error #6 — `Permission denied` al ejecutar o leer archivos

```
java.io.FileNotFoundException: plugins/MiPlugin.jar (Permission denied)
```

El proceso del servidor no tiene permisos para leer/escribir en la carpeta. Más frecuente en VPS con instalaciones manuales.

**Solución:**

Asegurate de que el usuario que corre el servidor es dueño de los archivos:

```bash
# Cambiá "minecraft" por el usuario real del proceso
chown -R minecraft:minecraft /ruta/al/servidor

# Si el problema es de escritura en una carpeta específica:
chmod -R 755 /ruta/al/servidor
```

En Pterodactyl esto casi nunca pasa porque Wings maneja los permisos del contenedor automáticamente. Si te aparece igual, es posible que hayas subido archivos como `root` por SFTP.

---

*Esta guía se actualiza cuando aparecen errores frecuentes en soporte. Si encontraste uno que no está acá, mandá un ticket en [FlyxNodes](https://flyxnodes.xyz).*
