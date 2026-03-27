# Front-End (Vite)

Este front usa Vite y variables de entorno con prefijo `VITE_`.

## Archivos de entorno

- `.env`             -> base (por defecto)
- `.env.local`       -> valores locales (se cargan siempre y sobreescriben `.env`)
- `.env.produccion`  -> valores para modo `produccion`

En este proyecto ya existen:

```
FRONT_END/.env
FRONT_END/.env.local
FRONT_END/.env.produccion
```

## Comandos

### Local (desarrollo)

```
npm run dev:local
```

### Compilar localmente (build con modo development)

```
npm run build:local
```

### Producción (build para distribuir)

```
npm run build:produccion
```

### Previsualizar producción

```
npm run preview:produccion
```

## Notas

- Para producción se usa `--mode produccion`, por lo que Vite carga `.env.produccion`.
- Para desarrollo se usa `--mode development` y además se aplican los valores de `.env.local`.
