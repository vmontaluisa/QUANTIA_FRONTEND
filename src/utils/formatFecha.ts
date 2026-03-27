export function formatFecha(fechaIso: string): string {
  try {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return fechaIso;
  }
}
