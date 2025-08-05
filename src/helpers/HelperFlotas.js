import * as XLSX from "xlsx";

// ✅ Transformar cada fila del Excel a un objeto de flota
function normalizarFlotas(data) {
  return data
    .filter((row) =>
      row["id_flota"] &&
      row["nombreflota"] &&
      row["responsable"] &&
      row["estado"] === 1 // ✅ Solo flotas activas
    )
    .map((row) => ({
      id_flota: row["id_flota"],
      nombreflota: row["nombreflota"],
      responsable: row["responsable"],
      estado: "activo", // texto normalizado
      cantidad: 0,
      destacada: row["nombreflota"]
        ?.toString()
        .toLowerCase()
        .includes("mastracker"),
    }));

}



export const cargarFlotas = async (urlExcel) => {
  try {
    const response = await fetch(urlExcel);
    if (!response.ok) throw new Error("No se pudo obtener el archivo Excel");

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(hoja);

    return normalizarFlotas(jsonData);
  } catch (error) {
    console.error("❌ Error al cargar flotas desde el Excel:", error);
    return [];
  }
};
