## React + TypeScript + Vite 2026.1

## Inicio rapido (Front End)

Pasos basicos para levantar el proyecto en local:

```plaintext
cd FRONT_END
npm install --legacy-peer-deps
npm install
npm run dev
```

Notas:

- Variables de entorno: revisa `.env`. Si necesitas recrearlo, puedes copiarlo desde `archivo.env.txt`.
- La app suele quedar disponible en `http://localhost:5173` (Vite te mostrara la URL exacta en consola).

## Desarrollo (compilar antes de ejecutar)

```plaintext
cd FRONT_END
npm install
npm run build
npm run dev
```

## Instalacion desde repositorio (Mac y Windows)

Los scripts estan en `FRONT_END/scripts/` y clonan el repo `QUANTIA_FRONTEND`, hacen `git pull`, instalan dependencias y compilan o ejecutan Vite.

### Mac

```plaintext
./scripts/install_build_mac.sh
./scripts/run_dev_mac.sh
```

Puedes pasar una carpeta destino:

```plaintext
./scripts/install_build_mac.sh /ruta/a/QUANTIA_FRONTEND
./scripts/run_dev_mac.sh /ruta/a/QUANTIA_FRONTEND
```

### Windows

```plaintext
scripts\install_build_windows.bat
scripts\run_dev_windows.bat
```

Con carpeta destino:

```plaintext
scripts\install_build_windows.bat C:\ruta\QUANTIA_FRONTEND
scripts\run_dev_windows.bat C:\ruta\QUANTIA_FRONTEND
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```plaintext
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```plaintext
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

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

