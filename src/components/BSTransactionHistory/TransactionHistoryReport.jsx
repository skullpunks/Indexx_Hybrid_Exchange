import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PDFGenerator = ({ table1Data, table2Data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Tables Report', 20, 10);

    // Table 1
    doc.autoTable({
      head: [['Column 1', 'Column 2', 'Column 3']],
      body: table1Data.map((row) => [row.col1, row.col2, row.col3]),
      startY: 20,
    });

    // Space between tables
    const finalY = doc.lastAutoTable.finalY + 10;

    // Table 2
    doc.autoTable({
      head: [['Column A', 'Column B', 'Column C']],
      body: table2Data.map((row) => [row.colA, row.colB, row.colC]),
      startY: finalY,
    });

    // Save the PDF
    doc.save('tables-report.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default PDFGenerator;
