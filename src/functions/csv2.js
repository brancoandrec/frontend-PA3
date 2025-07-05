export function exportToCsv(filename, rows) {
  if (!rows || !rows.length) return;

  const headers = [
    'ID da compra',
    'Data da invoice',
    'Data do recebimento',
    'Preço',
    'Nome do fornecedor',
    'ID do projeto',
    'Nome do projeto',
  ];

  const formatDate = d => {
    if (!d) return '';
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const csvRows = rows.map(row => [
    row.id || '',
    formatDate(row.dataInvoice),
    formatDate(row.dataRecebimento),
    row.preco ?? '',
    row.fornecedor?.nome || '',
    row.projeto?.id || '',
    row.projeto?.nome || '',
  ]);

  const csvContent = [headers, ...csvRows]
    .map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join('\t'))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
