interface CollegeData {
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

export const exportToCSV = (data: CollegeData[], filename: string = 'uptac_college_predictions.csv') => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = [
    'Serial No.',
    'Institute',
    'Program',
    'Quota',
    'Category',
    'Round',
    'Opening Rank',
    'Closing Rank'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map((college, index) => [
      index + 1,
      `"${college.institute}"`,
      `"${college.program}"`,
      college.quota,
      college.category,
      college.round,
      college.opening_rank,
      college.closing_rank
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const printResults = () => {
  window.print();
};