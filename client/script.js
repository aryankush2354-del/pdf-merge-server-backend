const mergeBtn = document.getElementById("mergeBtn");
const pdfFiles = document.getElementById("pdfFiles");
const status = document.getElementById("status");

mergeBtn.addEventListener("click", async () => {
  if (pdfFiles.files.length < 2) {
    alert("Select at least 2 PDFs to merge!");
    return;
  }

  const formData = new FormData();
  for (const file of pdfFiles.files) {
    formData.append("pdfs", file);
  }

  status.innerText = "Merging PDFs...";

  try {
    const response = await fetch("http://localhost:3000/merge", {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Server error");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    status.innerText = "Merged PDF downloaded ✅";
  } catch (err) {
    status.innerText = "Error: " + err.message;
  }
});
