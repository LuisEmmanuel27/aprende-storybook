# Extensión de accesibilidad y testing 📚

## A11y Addon

El **A11y Addon** de Storybook es una herramienta diseñada para realizar pruebas de accesibilidad (a11y) en tus componentes. Facilita la detección de problemas de accesibilidad directamente en las historias de Storybook, ayudándote a garantizar que tus componentes cumplan con las mejores prácticas y estándares como **WCAG (Web Content Accessibility Guidelines)**.

El A11y Addon es una integración con la biblioteca **axe-core**, que analiza los componentes en busca de problemas de accesibilidad como:
- Contraste insuficiente.
- Falta de etiquetas ARIA.
- Errores en los roles de los elementos.
- Problemas con el orden del DOM.
- Elementos interactivos que no son accesibles.

---

### **Ventajas de usar el A11y Addon**

1. **Integración directa con Storybook**: No necesitas configurar herramientas externas.
2. **Feedback en tiempo real**: Identifica problemas en el momento en que trabajas con tus historias.
3. **Compatibilidad con otros addons**: Funciona junto con addons como `Controls` o `Actions`.
4. **Configuración flexible**: Puedes personalizar las reglas de análisis para tu proyecto.

---

### Instalación del Addon A11y

Primero, instala el addon:

```bash
npm install @storybook/addon-a11y --save-dev
```

Luego, habilítalo en la configuración de Storybook:

1. Abre o crea el archivo `.storybook/main.js`.
2. Agrega `@storybook/addon-a11y` a la lista de addons:

```javascript
module.exports = {
  addons: ['@storybook/addon-a11y'],
};
```

Reinicia Storybook para aplicar los cambios.

---

### **Uso del Addon A11y**

#### 1. **Revisión Automática**
Una vez instalado, encontrarás una pestaña llamada **"Accessibility"** en el panel inferior de Storybook. Cuando abras una historia:
- El addon analizará automáticamente el componente renderizado.
- Te mostrará problemas categorizados como **violations**, **passes**, **incomplete** o **best practices**.

#### 2. **Decorador para Probar Accesibilidad**
Puedes agregar el decorador `withA11y` globalmente para habilitar la revisión en todas las historias:

```javascript
// .storybook/preview.js
import { withA11y } from '@storybook/addon-a11y';

export const decorators = [withA11y];
```

Esto asegura que todas las historias sean revisadas por el addon A11y.

#### 3. **Configuración de Reglas**
Puedes personalizar qué reglas aplicar o excluir en tu configuración:

```javascript
// .storybook/preview.js
import { withA11y } from '@storybook/addon-a11y';

export const decorators = [withA11y];

export const parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true, // Activa o desactiva una regla específica.
        },
      ],
    },
  },
};
```

#### 4. **Accesibilidad en Historias Específicas**
Si solo deseas revisar accesibilidad en una historia en particular:

```javascript
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    a11y: {
      // Configuración específica para esta historia
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};

export const Primary = (args) => <Button {...args} />;
```

---

### Ejemplo Práctico

Supongamos que tienes un componente de botón:

```jsx
import React from 'react';

export const Button = ({ label }) => (
  <button style={{ backgroundColor: '#ccc', color: '#fff' }}>
    {label}
  </button>
);
```

Si el contraste entre el fondo y el texto no es suficiente, el addon lo detectará y mostrará algo como:

```
Violation: Element has insufficient color contrast.
Fix: Ensure the contrast ratio is at least 4.5:1 for normal text.
```

---

### **Configuración Avanzada**

#### Ignorar Problemas Específicos

Puedes deshabilitar reglas globales si son irrelevantes para tu proyecto:

```javascript
export const parameters = {
  a11y: {
    config: {
      rules: [
        { id: 'landmark-one-main', enabled: false },
      ],
    },
  },
};
```

#### Ejecutar Manualmente el Análisis

Si no deseas análisis automático, puedes usar el addon manualmente desde el panel de accesibilidad para una revisión puntual.

---

### Recomendaciones

1. **Integra accesibilidad desde el inicio**:
   - Detectar problemas temprano reduce costos y esfuerzo.
2. **Crea historias accesibles por defecto**:
   - Asegúrate de que los componentes sean funcionales con teclado y lectores de pantalla.
3. **Personaliza las reglas**:
   - Adapta las pruebas según las necesidades y estándares del proyecto.
4. **Prioriza las Violations**:
   - Enfócate primero en resolver las violaciones críticas.
5. **Usa herramientas complementarias**:
   - Combina el addon A11y con pruebas manuales usando herramientas como Lighthouse.

---

# Agregando A11y Addon al proyecto

1. Revisando la [documentación](https://storybook.js.org/docs/writing-tests/accessibility-testing), instalamos el addon A11y:

```bash
pnpm exec storybook add @storybook/addon-a11y
```

2. Verificamos que aparezca en el archivo `main.ts` de `.storybook`:

```ts
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y" // <-- esto debe aparecer
  ],
}
```

3. Para verificar que todo está correcto deberíamos ver una nueva pestaña (Accessibility) en el panel inferior de los canvas de Storybook: <br/> ![pic_4](img/pic_4.png)

> [!TIP]
> En caso de que no la veas, intenta reiniciar el proyecto, debería aparecer después de eso.

4. Si vamos a la story `Default` de nuestro componente `ToDo` nos aparecerá en la ventana de accesibilidad `1 Violations`, si leemos el mensaje nos indica que nos hace falta un label, por lo que vamos a agregarlo:

```jsx
// Componente ToDo.tsx
{
  return (
    <div className={styles.toDo}>
      <input
        type='checkbox'
        aria-label='todo-lab' // <-- agregamos esto
        id={id.toString()}
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <span className={completed ? styles.completed : ''}>{title}</span>
    </div>
  )
}
```

5. Vuelve a revisar la ventana de accesibilidad, ahora no debera aparecer ninguna violación.