export function formatDate(dateString) {
    if(!dateString) return '-'
    let date = new Date(dateString);
    const timestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export function formatTime(start_time, end_time) {
  // Dividir las cadenas en horas, minutos y segundos
  const [startHour, startMin] = start_time.split(':');
  const [endHour, endMin] = end_time.split(':');

  // Convertir las horas a un formato de 12 horas
  const formattedStartHour = (startHour % 12) || 12;
  const formattedEndHour = (endHour % 12) || 12;

  // Determinar si es a.m. o p.m.
  const startPeriod = startHour >= 12 ? 'p.m.' : 'a.m.';
  const endPeriod = endHour >= 12 ? 'p.m.' : 'a.m.';

  // Construir las cadenas de tiempo formateadas
  const formattedStartTime = `${formattedStartHour}:${startMin} ${startPeriod}`;
  const formattedEndTime = `${formattedEndHour}:${endMin} ${endPeriod}`;

  // Retornar el rango de tiempo formateado
  return `${formattedStartTime} - ${formattedEndTime}`;
}