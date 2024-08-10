let sectionCounter = 0;

function addSection() {
  sectionCounter++;
  const sectionId = `section-${sectionCounter}`;
  const sectionHtml = `
        <div id="${sectionId}" class="section bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <label for="${sectionId}-title" class="block text-sm font-semibold">Section Title:</label>
            <input type="text" id="${sectionId}-title" name="${sectionId}-title" required
                class="w-full p-2 border border-gray-300 rounded-lg mb-2">
            <label for="${sectionId}-content" class="block text-sm font-semibold">Content:</label>
            <textarea id="${sectionId}-content" name="${sectionId}-content" required
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"></textarea>
            <button type="button" onclick="removeSection('${sectionId}')"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Remove Section
            </button>
        </div>
    `;
  document
    .getElementById("sections-container")
    .insertAdjacentHTML("beforeend", sectionHtml);
  updateReadme();
}

function removeSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) section.remove();
  updateReadme();
}

function addSectionToForm(sectionTitle) {
  sectionCounter++;
  const sectionId = `section-${sectionCounter}`;
  const sectionHtml = `
        <div id="${sectionId}" class="section bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <label for="${sectionId}-title" class="block text-sm font-semibold">Section Title:</label>
            <input type="text" id="${sectionId}-title" name="${sectionId}-title" value="${sectionTitle}" required
                class="w-full p-2 border border-gray-300 rounded-lg mb-2">
            <label for="${sectionId}-content" class="block text-sm font-semibold">Content:</label>
            <textarea id="${sectionId}-content" name="${sectionId}-content" required
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"></textarea>
            <button type="button" onclick="removeSection('${sectionId}')"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Remove Section
            </button>
        </div>
    `;
  document
    .getElementById("sections-container")
    .insertAdjacentHTML("beforeend", sectionHtml);
  updateReadme();
}

function filterSections() {
  const query = document.getElementById("section-search").value.toLowerCase();
  const buttons = document.querySelectorAll("#sections button");
  buttons.forEach((button) => {
    if (button.textContent.toLowerCase().includes(query)) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
}

function downloadReadme() {
  const readmeContent = generateReadme();
  const blob = new Blob([readmeContent], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "README.md";
  link.click();
}

function updateReadme() {
  const readmeContent = generateReadme();
  document.getElementById("output").textContent = readmeContent;

  // Convert markdown to HTML for preview
  const converter = new showdown.Converter();
  const html = converter.makeHtml(readmeContent);
  document.getElementById("preview").innerHTML = html;

  // Show download button if README is not empty
  document.getElementById("download-btn").style.display = readmeContent
    ? "block"
    : "none";
}

function generateReadme() {
  const projectTitle = document.getElementById("project-title").value.trim();
  const description = document.getElementById("description").value.trim();
  let readmeContent = `# ${projectTitle}\n\n## Description\n${description}\n`;

  const sections = document.querySelectorAll("#sections-container .section");
  sections.forEach((section) => {
    const title = section.querySelector("input").value.trim();
    const content = section.querySelector("textarea").value.trim();
    if (title && content) {
      readmeContent += `\n## ${title}\n${content}\n`;
    }
  });

  return readmeContent;
}

document.getElementById("readme-form").addEventListener("input", updateReadme);

function showTab(tabName) {
  document.querySelectorAll(".tabcontent").forEach((tab) => {
    tab.style.display = "none";
  });
  document.getElementById(tabName).style.display = "block";
}
