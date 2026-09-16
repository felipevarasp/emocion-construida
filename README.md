# Comparación de rostros sin etiquetas

Segunda actividad experimental de la Unidad 2 (Psicología de la Emoción),
Psicología del Aprendizaje, Motivación y Emoción, Universidad de O'Higgins.

Réplica en clase de la tarea descrita por Lisa Feldman Barrett en *La vida
secreta del cerebro*, capítulo 3: se muestran dos rostros lado a lado y se
pregunta «¿estas dos personas sienten lo mismo?», con respuesta Sí o No, sin
ninguna etiqueta emocional a la vista. En su laboratorio los participantes
coincidieron con las correspondencias esperadas solo el 42 % de las veces.

```
├── index.html       el experimento (lo que abren los estudiantes)
├── resultados.html  resultados agregados del curso, en vivo
├── config.js        lo único que hay que editar
├── apps-script.gs   script que guarda las respuestas en tu planilla
├── img/             36 fotografías (FACES, subconjunto de acceso público)
└── README.md
```

---

## Diseño

| | |
|---|---|
| Tarea | Elección binaria Sí / No, sin ninguna etiqueta emocional escrita ni hablada |
| Ensayos | 2 pares de práctica (sin retroalimentación) + 30 experimentales |
| Composición | 15 pares de la misma categoría, 8 de categorías distintas cercanas, 7 de categorías distintas lejanas |
| Pares cercanos | tristeza–asco, tristeza–miedo, ira–tristeza, miedo–ira, asco–ira, miedo–asco: las confusiones que el curso cometió en la tarea con etiquetas |
| Pares lejanos | combinaciones con alegría y con neutral, que el curso casi nunca confundió |
| Identidades | los dos rostros de un par son siempre de personas distintas, para que la respuesta no se apoye en el parecido físico |
| Medidas | Coincidencia con la correspondencia esperada y tiempo de decisión |
| Azar | 50 %, porque hay dos respuestas posibles |

Dos decisiones de diseño que conviene no deshacer:

- **La práctica no da retroalimentación.** Decirle al estudiante si "acertó"
  le enseñaría cuál es la correspondencia esperada y contaminaría el resto de
  la sesión.
- **La pantalla final no muestra aciertos.** Muestra cuántas veces respondió
  "sienten lo mismo" y su tiempo medio. Desde el punto de vista del
  participante no hay respuesta correcta: eso es precisamente lo que se
  discute después.

---

## Puesta en marcha

### 1. Publicar en GitHub Pages

1. Crea un repositorio nuevo, público, por ejemplo `pame-pares`. No marques
   "Add a README file": tiene que quedar vacío.
2. En la página del repo, entra a **uploading an existing file**, abre esta
   carpeta en el Explorador, selecciona todo con `Ctrl+A` y arrastra la
   selección al navegador. Suben 41 archivos: 5 en la raíz y 36 dentro de
   `img`. Si arrastrar la carpeta `img` falla, créala primero con
   **Add file → Create new file** escribiendo `img/.gitkeep`, y sube los
   `.jpg` dentro de ella.
3. **Settings → Pages → Source: Deploy from a branch → `main` / `root` → Save.**
4. En un par de minutos queda en `https://<tu-usuario>.github.io/pame-pares/`.

### 2. Crear la planilla que recibe las respuestas

1. Crea una planilla nueva en Google Sheets, por ejemplo "emociones — pares".
2. **Extensiones → Apps Script**. Borra lo que haya y pega `apps-script.gs`
   completo. Guarda.
3. **Implementar → Nueva implementación → Aplicación web**, con
   *Ejecutar como: Yo* y *Quién tiene acceso: Cualquier persona*. Autoriza
   cuando lo pida.
4. Copia la URL que termina en `/exec`. Ábrela en una ventana de incógnito:
   debe responder `{"ok":true,...}`.

### 3. Conectar las dos cosas

1. Pega la URL del paso anterior en `endpoint`, dentro de `config.js`, y
   sube el archivo corregido al repositorio.
2. Corre el experimento una vez tú mismo. Eso crea la hoja `pares` con sus
   encabezados.
3. En la planilla: **Archivo → Compartir → Publicar en la web**, hoja `pares`,
   formato **CSV**. Copia esa dirección.
4. Pégala en `csvUrl` dentro de `config.js` y vuelve a subirlo.
5. Borra de la planilla las filas de tu corrida de prueba, si quieres partir
   limpio.

Sin `endpoint`, el experimento igual funciona: al terminar, cada estudiante
descarga un CSV con sus respuestas. Sin `csvUrl`, la página de resultados
muestra datos de ejemplo claramente marcados como tales.

---

## En clases

El contraste es el argumento: las fotografías son exactamente las mismas que
en el experimento con etiquetas. Lo único que cambió fue si había o no una
lista de nombres de emociones en pantalla. Si el acuerdo cae, no cayó porque
las caras sean más ambiguas hoy que la semana pasada.

Conviene proyectar primero el resultado del experimento con etiquetas y solo
entonces este. Y vale la pena decir en voz alta la limitación: estos
estudiantes ya hicieron la tarea con etiquetas, así que llegan con los seis
conceptos activados. Eso juega en contra del efecto esperado, de modo que si
la caída aparece igual, el argumento se sostiene mejor, no peor.

---

## Analizar los datos después

La hoja `pares` trae una fila por par:

`fecha, sesion, curso, ensayo, archivo_izq, archivo_der, categoria_izq,
categoria_der, modelo_izq, modelo_der, tipo_par, respuesta_esperada, respuesta,
coincide, rt_ms`

```r
library(tidyverse)
p <- read_csv("URL_DEL_CSV")

# coincidencia por tipo de par
p |> group_by(tipo_par) |>
     summarise(n = n(), coincide = mean(coincide), rt = median(rt_ms))

# ¿supera el 50 % esperado por azar?
binom.test(sum(p$coincide), nrow(p), p = 0.5, alternative = "greater")

# sesgo de respuesta: ¿cuánto dijeron "sienten lo mismo"?
mean(p$respuesta == "si")
```

---

## Estímulos

Ebner, N. C., Riediger, M. y Lindenberger, U. (2010). FACES: A database of
facial expressions in young, middle-aged, and older women and men: Development
and validation. *Behavior Research Methods, 42*(1), 351–362.

Subconjunto de acceso público, redimensionado a 500 px de ancho, usado con
fines docentes y citado en ambas páginas.
