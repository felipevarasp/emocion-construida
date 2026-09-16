// ---------------------------------------------------------------------------
//  Configuración del experimento. Edita solo este archivo.
// ---------------------------------------------------------------------------
window.CONFIG = {

  // 1) URL de la aplicación web de Apps Script (termina en /exec).
  //    Mientras esté vacía, el experimento funciona igual pero no envía datos:
  //    cada estudiante descarga su archivo CSV al terminar.
  endpoint: "https://script.google.com/macros/s/AKfycbzulD_IV-ZqbtlpO9-P9I2widcMKGEjXwhrIFS-2d6yP_V25QsaIPeIDZWvqZiLcdzIeA/exec",

  // 2) URL del CSV publicado de la hoja "pares", para la página de resultados.
  //    En la planilla: Archivo > Compartir > Publicar en la web > CSV.
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDJ4Uf0ft7KsbHlPyHpRHccvYNg_9ibk0GhPREdWb9HeQzMcQ94zlyu8WdzhX5k5AZjgbAxeBcCM06/pub?gid=2071042755&single=true&output=csv",

  // 3) Etiqueta que se guarda con cada respuesta (útil si aplicas el
  //    experimento en más de una sección o en más de un año).
  curso: "PAME 2026 - Seccion 1"
};
