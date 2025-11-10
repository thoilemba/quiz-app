import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Team {
  id: number;
  name: string;
  members: string[];
  score: number;
}

interface QuizResult {
  quizName: string;
  schoolName: string;
  schoolLogo?: string;
  address: string;
  numberOfTeams: number;
  numberOfMembers: number;
  numberOfRounds: number;
  quizMaster: string;
  teams: Team[];
}

export function generateQuizResultPdf(data: QuizResult, sortedTeams: any) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  let y = 20;

  // --- Header: Logo + Quiz Info ---
  if (data.schoolLogo) {
    try {
      doc.addImage(data.schoolLogo, "PNG", 20, y, 35, 35);
    } catch (err) {
      console.warn("Invalid logo format:", err);
    }
  }

  const textX = 65;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.quizName, textX, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`School: ${data.schoolName}`, textX, y + 20);
  doc.text(`Address: ${data.address}`, textX, y + 27);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, textX, y + 34);
  doc.text(`Quiz Master: ${data.quizMaster}`, textX, y + 41);

  y += 55;

  // --- Summary Section ---
  doc.setFontSize(12);
  doc.text(`Number of Teams: ${data.numberOfTeams}`, 20, y);
  doc.text(`Members per Team: ${data.numberOfMembers}`, 20, y + 7);
  doc.text(`Number of Rounds: ${data.numberOfRounds}`, 20, y + 14);

  y += 25;

  // --- Sort Teams by Score (Descending) ---
//   const sortedTeams = [...data.teams].sort((a, b) => b.score - a.score);

  // --- Table Data ---
  const tableData = sortedTeams.map((team: any, index: any) => [
    index + 1, // Rank
    team.name,
    team.members.join(", "),
    team.score.toString(),
  ]);

autoTable(doc, {
  startY: y,
  head: [["Rank", "Team Name", "Members", "Score"]],
  body: tableData,
  styles: {
    fontSize: 11,
    cellPadding: 4,
    halign: "left",
    valign: "middle",
    fillColor: [255, 255, 255], // force white for all cells
    textColor: [0, 0, 0],
  },
  headStyles: {
    fillColor: [41, 128, 185],
    textColor: 255,
    fontStyle: "bold",
  },
  bodyStyles: {
    fillColor: [255, 255, 255], // explicitly ensure white background
  },
  margin: { left: 20, right: 20 },
  didParseCell: function (data) {
    // Highlight top scorer (Rank 1)
    if (data.row.index === 0 && data.section === "body") {
      data.cell.styles.fillColor = [255, 223, 128]; // light gold
    }
  },
});

  // --- Footer (IST) ---
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const dateTimeIST = formatter.format(now);

  doc.setFontSize(9);
  doc.text(
    `Generated on ${dateTimeIST}`,
    20,
    doc.internal.pageSize.getHeight() - 10
  );

  // --- Save PDF ---
  doc.save(`${data.quizName.replace(/\s+/g, "_")}_Result.pdf`);
}
