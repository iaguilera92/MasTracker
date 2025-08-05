import * as XLSX from "xlsx";

function normalizarVehiculos(data) {
  return data
    .filter((row) =>
      row["id_vehiculo"] &&
      row["id_flota"] &&
      row["patente"] &&
      row["estado"] === 1
    )
    .map((row) => ({
      id_vehiculo: row["id_vehiculo"],
      id_flota: row["id_flota"],
      patente: row["patente"],
      velocidad: row["velocidad"],
      rpm: row["rpm"],
      combustible: row["combustible"],
      temperatura: row["temperatura"],
      odometro: row["odometro"],
      coordenadas: row["coordenadas"],
      conductor: row["conductor"],
      observaciones: row["observaciones"] || "",
      marca_vehiculo: row["marca_vehiculo"],
      modelo_vehiculo: row["modelo_vehiculo"],
      aseguradora: row["aseguradora"],
      fecha_ingreso: convertirFecha(row["fecha_ingreso"]),
      estado: "activo",
    }))


}
function convertirFecha(fecha) {
  // Si es número (fecha serial de Excel)
  if (typeof fecha === "number") {
    const date = new Date(Math.round((fecha - 25569) * 86400 * 1000));
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  // Si es string válido
  if (typeof fecha === "string") {
    const date = new Date(fecha);
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    }
  }

  return ""; // Si es inválido
}

export const cargarVehiculos = async (urlExcel) => {
  try {
    const response = await fetch(urlExcel);
    if (!response.ok) throw new Error("No se pudo obtener el archivo Excel");

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(hoja);

    return normalizarVehiculos(jsonData);
  } catch (error) {
    console.error("❌ Error al cargar vehículos desde el Excel:", error);
    return [];
  }
};
