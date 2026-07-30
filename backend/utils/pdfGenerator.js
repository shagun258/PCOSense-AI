import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadReportPDF = async () => {
  const report = document.getElementById("pcos-report");

  if (!report) return;

  const canvas = await html2canvas(report, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  let position = 0;
  let heightLeft = pdfHeight;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    pdfWidth,
    pdfHeight
  );

  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;

    pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      pdfWidth,
      pdfHeight
    );

    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  pdf.save("PCOSense-AI_Report.pdf");
};