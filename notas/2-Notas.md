# Estilos Globales, Decorators para renderizar Light y Dark mode, herramienta en Toolbar📚

1. Vamos a empezar por ver acerca de los estilos globales, primero iremos a los estilos del componente `Button.tsx` y modificaremos el color de su fundo para que use una variable css que definiremos en `index.css`:

```css
.storybook-button--primary {
  background-color: var(--primary);
  color: white;
}
```

```css
:root {
  --primary: #1ea7fd;
}
```

2. Si revisamos en la pagina de Storybook notaremos que no aparece el boton, esta ahí pero el estilo no se aplica, esto es por que aún debemos decirle a Storybook que debe usar los estilos globales, para ello vamos a la configuración de `preview.ts` y agregamos lo siguiente:

```typescript
import '../src/index.css'
```

3. Ahora veremos que todos los estilos del index afectan a nuestro boton.

> [!NOTE]
> Otros estilos que tengas en tu index también podrian afectar a como se ve en el canvas el componente, notese eso si dejamos los estilos que vite genera por defecto en `index.css`, para evitarlo simplemente borra los estilos que no necesitas.

4. 