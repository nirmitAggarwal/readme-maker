function generateReadme() {
  const title = document.getElementById("project-title").value;
  const description = document.getElementById("description").value;
  const installation = document.getElementById("installation").value;
  const usage = document.getElementById("usage").value;
  const contributing = document.getElementById("contributing").value;
  const license = document.getElementById("license").value;

  let readmeContent = `# ${title}\n\n## Description\n${description}\n\n`;

  if (installation) {
    readmeContent += `## Installation\n${installation}\n\n`;
  }

  if (usage) {
    readmeContent += `## Usage\n${usage}\n\n`;
  }

  if (contributing) {
    readmeContent += `## Contributing\n${contributing}\n\n`;
  }

  if (license) {
    readmeContent += `## License\n${license}\n\n`;
  }

  document.getElementById("output").textContent = readmeContent;
  document.getElementById("download-btn").style.display = "block";
}

function downloadReadme() {
  const content = document.getElementById("output").textContent;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "README.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
