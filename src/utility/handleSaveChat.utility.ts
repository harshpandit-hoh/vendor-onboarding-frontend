import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const saveChat = (chatWindowRef: React.RefObject<HTMLDivElement | null>) => {
  const chatElement = chatWindowRef.current;
  if (!chatElement) return;
  chatElement.classList.add("preparing-for-save");

  html2canvas(chatElement, {
    scale: 2,
    useCORS: true,
    onclone: () => {},
  }).then((canvas) => {
    chatElement.classList.remove("preparing-for-save");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / pdfWidth;
    const imgHeight = canvasHeight / ratio;

    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const date = new Date().toISOString().slice(0, 10);
    pdf.save(`chat-log-${date}.pdf`);
  });
};

export { saveChat };
