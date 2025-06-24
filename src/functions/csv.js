export function exportToCsv(filename, rows) {
  if (!rows || !rows.length) {
    return;
  }

  // Monta o cabeçalho do CSV
  const headers = [
    'ID',
    'Nome',
    'Quantidade',
    'Tipo do Item',
    'Descrição do Item',
    'Sala',
    'Armário',
  ];

  // Mapeia os dados para linhas de texto CSV, extraindo os campos dos objetos aninhados
  const csvRows = rows.map(row => [
    row.id,
    row.nome || (row.item ? row.item.nome : ''), // caso nome fique em row.nome ou row.item.nome
    row.quantidade,
    row.item?.tipo || '',
    row.item?.descricao || '',
    row.localArmazen?.sala || '',
    row.localArmazen?.armario || '',
  ]);

  // Junta tudo
  const csvContent =
    [headers, ...csvRows]
      .map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join('\t'))
      .join('\n');

  // Cria link para download
  const blob = new Blob([csvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
