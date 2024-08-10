document.addEventListener("DOMContentLoaded", () => {
  // List of sections
  const sections = [
    "Custom Section",
    "Acknowledgements",
    "API Reference",
    "Appendix",
    "Authors",
    "Badges",
    "Color Reference",
    "Contributing",
    "Demo",
    "Deployment",
    "Documentation",
    "Environment Variables",
    "FAQ",
    "Features",
    "Feedback",
    "Github Profile - About Me",
    "Github Profile - Introduction",
    "Github Profile - Links",
    "Github Profile - Other",
    "Github Profile - Skills",
    "Installation",
    "Lessons",
    "License",
    "Logo",
    "Optimizations",
    "Related",
    "Roadmap",
    "Run Locally",
    "Screenshots",
    "Support",
    "Tech",
    "Running Tests",
    "Usage/Examples",
    "Used By",
  ];

  const sidebarButtons = document.getElementById("sidebar-buttons");
  const searchInput = document.getElementById("search");
  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");

  // Create buttons for each section
  sections.forEach((section) => {
    const button = document.createElement("button");
    button.textContent = section;
    button.className =
      "w-full p-2 text-left bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600";
    button.addEventListener("click", () => {
      editor.value += `## ${section}\n\n`;
      updatePreview();
    });
    sidebarButtons.appendChild(button);
  });

  // Filter sections based on search input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const buttons = sidebarButtons.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.textContent.toLowerCase().includes(query)) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    });
  });

  // Update preview based on editor content
  function updatePreview() {
    const markdownText = editor.value;
    preview.innerHTML = marked.parse(markdownText);
  }

  editor.addEventListener("input", updatePreview);

  // Handle download button click
  document.getElementById("download-btn").addEventListener("click", () => {
    const blob = new Blob([editor.value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  });
});
