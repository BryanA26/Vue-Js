export const formatDate = (fecha) => {
	const fechaOriginal = new Date(fecha);
	const utcTime = fechaOriginal.getTime();
	const localOffset = fechaOriginal.getTimezoneOffset() * 60000;
	const localTime = utcTime - localOffset;
	const adjustedTime = localTime;
	return new Date(adjustedTime).toLocaleString('es-ES', {
	  year: 'numeric',
	  month: 'long',
	  day: '2-digit',
	  hour: '2-digit',
	  minute: '2-digit',
	  hour12: true,
	});
  };


