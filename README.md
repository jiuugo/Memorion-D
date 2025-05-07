# Memorion-D

## Sesion 1 - Estructura visal de configuracion y tablero


**Resumen:**
Hemos creado en un html el formulario de la configuracion y la pantalla del juego con (Tablero base, cronometro, contador)
Posteriormente hemos añadido los estilos en el css y la funcionalidad de que cuando pulsemos el boton aceptar nos salga la pantalla del Juego.
**Dificultades encontradas:**
Header con el cronometro y contador sin situar.

**Soluciones aplicadas:**
en proceso.

**Fuentes consultadas:**
Chatgpt para algunas cosas y la pagina https://developer.mozilla.org

**Decisiones Tecnicas:**
Hemos decidido usar 1 solo archivo Html.

**Ideas de mejora futura:**

Mejorar el header de la pantalla del juego para que el cronometro y el contador esten bien situados.

## Sesion 2 - Transición de Pantallas y Preparación de Partida

**Resumen:**
Hemos generado la transición a la pantalla de juego con las opciones seleccionadas por el usuario en la configuración. Hemos validado que no existan campos vacíos o incorrectos en la configuración del juego.
En Javascript hemos realizado validaciones para que el numero de cartas sean pares (al seleccionar el tablero personalizado) y muestre una alerta en caso de que sean impares. Hemos generado los tableros personalizados en función de la selección del usuario. 

**Dificultades encontradas:**
Cómo organizar los divs para que se muestren en forma de rejilla y con el tamaño indicado por el usuario. 
**Soluciones aplicadas:**

**Fuentes consultadas:**
https://developer.mozilla.org
https://stackoverflow.com

**Decisiones Tecnicas:**
Utilizar la propiedad grid para organizar las cartas en el tablero. 

**Ideas de mejora futura:**
Ajustar dinámicamente el tablero y las cartas para que se muestren siempre en pantalla sin hacer scroll.

## Sesión 3: Volteo de Cartas y Lógica de Emparejamiento

**Resumen:**
Hemos programado el volteo de las cartas, se ha implementado también la comparación de parejas.
Hemos implementado la función que añade a cada div de cartas una imagen aleatoriamente.


**Dificultades encontradas:**
Las dificultades encontradas se han resuelto satisfactoriamente. 

**Soluciones aplicadas:**


**Fuentes consultadas:**
https://developer.mozilla.org
https://stackoverflow.com

**Decisiones Tecnicas:**


**Ideas de mejora futura:**
Bloquear tablero durante comparaciones, para que el usuario no pueda voltear cartas indiscriminadamente.
Mostrar durante unos segundos las dos cartas seleccionadas por el usuario y voltear en caso de no ser un acierto.
Gestionar cartas acertadas y contabilizar intentos.


## Sesión 4: Reloj Activo y Personalización Avanzada

**Resumen:**

Hemos implementado la función que ayer no habíamos finalizado "mostrar durante unos segundos las dos cartas seleccionadas por el usuario" y "voltear en caso de no ser un acierto y gestionar cartas acertadas y contabilizar intentos".

Hemos implementado la función de que se inicie el crono en el momento en el que se hace click en la primera carta.
Ademas para saber cuando para el crono hemos creado un array que va contando cuantas cartas están resueltas y cuando están todas, se detiene el crono con la función implementada.

Hemos redimensionado las imagenes para que según temática tengan el mismo tamaño.

Además se ha implementado la función de validación de configuración para que el tablero muestre las cartas con la temática seleccionada. 


**Dificultades encontradas:**

No encontrar assets para cada tema, las imagenes de las cartas quedan giradas, se giran sin que lo queramos. 

**Soluciones aplicadas:**

Estamos trabajando con GIMP para crear imagenes adecuadas.

**Fuentes consultadas:**
https://developer.mozilla.org
https://stackoverflow.com

**Decisiones Tecnicas:**


**Ideas de mejora futura:**

Bloqueo de tablero, que la opción de desactivar cronómetro funcione. 

## Sesión 5: Sistema de Puntuaciones y Almacenamiento

**Resumen:**


**Dificultades encontradas:**



**Soluciones aplicadas:**



**Fuentes consultadas:**
https://developer.mozilla.org
https://stackoverflow.com

**Decisiones Tecnicas:**


**Ideas de mejora futura:**
