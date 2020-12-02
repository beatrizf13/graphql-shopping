export const formatDate = (date: Date): string =>
  `${Intl.DateTimeFormat('pt-BR', {}).format(date)} às ${Intl.DateTimeFormat(
    'pt-BR',
    {
      timeZone: 'America/Fortaleza',
      hour: 'numeric',
      minute: 'numeric',
    },
  ).format(date)}`;
