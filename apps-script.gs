/**
 * Recibe las respuestas de los experimentos y las escribe en la planilla.
 *
 * Cada experimento manda en su envío el nombre de la hoja y sus encabezados,
 * así que agregar una actividad nueva no obliga a tocar este script:
 *   - la tarea de reconocimiento escribe en la hoja "respuestas"
 *   - la tarea de comparación de rostros escribe en la hoja "pares"
 *
 * Si cambias este archivo, recuerda que la aplicación web sirve la versión
 * implementada, no la guardada: Implementar > Gestionar implementaciones >
 * lápiz > Versión: Nueva versión > Implementar. La URL no cambia.
 */

var ENCABEZADOS_DEFECTO = ["fecha", "sesion", "curso", "ensayo", "archivo",
                           "emocion_mostrada", "respuesta", "correcto", "rt_ms",
                           "modelo", "edad_modelo", "sexo_modelo"];

function hoja_(nombre, encabezados) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var h = libro.getSheetByName(nombre);
  if (!h) {
    h = libro.insertSheet(nombre);
  }
  if (h.getLastRow() === 0) {
    h.appendRow(encabezados);
    h.setFrozenRows(1);
  }
  return h;
}

function doPost(e) {
  var bloqueo = LockService.getScriptLock();
  bloqueo.waitLock(30000);
  try {
    var cuerpo = JSON.parse(e.postData.contents);
    var filas = cuerpo.filas || [];
    var nombre = cuerpo.hoja || "respuestas";
    var encabezados = cuerpo.encabezados || ENCABEZADOS_DEFECTO;

    if (filas.length) {
      var h = hoja_(nombre, encabezados);
      h.getRange(h.getLastRow() + 1, 1, filas.length, filas[0].length).setValues(filas);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ok: true, hoja: nombre, filas: filas.length}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    bloqueo.releaseLock();
  }
}

/** Permite comprobar en el navegador que la implementación quedó activa. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ok: true, mensaje: "Endpoint activo"}))
    .setMimeType(ContentService.MimeType.JSON);
}
