const loadAllIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayAllIssues(json.data));
};

const displayAllIssues = (issues) => {
  const cardContainer = document.getElementById("cards");
  cardContainer.innerHTML = "";

  issues.forEach((issue) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-white", "p-4", "space-y-3");
    if (issue.status === "open") {
      cardDiv.classList.add("border-t-4", "border-t-[#00A96E]");
    } else {
      cardDiv.classList.add("border-t-4", "border-t-[#A855F7]");
    }

    //building components for card:

    statusIcon =
      issue.status === "open"
        ? `<img src="./images/Open-Status.png" alt="" />`
        : `<img src="./images/Closed-Status.png" alt="" />`;

    let priorityBadge;

    if (issue.priority === "high") {
      priorityBadge = `<p class="bg-red-200 rounded-xl p-1 w-[100px] text-center text-red-600">High</p>`;
    } else if (issue.priority === "medium") {
      priorityBadge = `<p class="bg-yellow-100 rounded-xl p-1 w-[100px] text-center text-yellow-600">Medium</p>`;
    } else {
      priorityBadge = `<p class="bg-gray-200 rounded-xl p-1 w-[100px] text-center text-gray-600">Low</p>`;
    }

    console.log(issue.labels);

    const labelStyles = {
      bug: `
    <div class="flex items-center gap-1 bg-red-100 p-2 text-red-600 rounded-xl">
      <span><i class="fa-solid fa-bug"></i></span>
      <p class="uppercase text-[12px]">Bug</p>
    </div>`,

      "help wanted": `
    <div class="flex items-center gap-1 bg-yellow-100 p-2 text-yellow-600 rounded-xl">
      <span><i class="fa-solid fa-life-ring"></i></span>
      <p class="uppercase text-[12px]">Help Wanted</p>
    </div>`,

      enhancement: `
    <div class="flex items-center gap-1 bg-green-100 p-2 text-green-600 rounded-xl">
      <span><i class="fa-solid fa-wand-magic-sparkles"></i></span>
      <p class="uppercase text-[12px]">Enhancement</p>
    </div>`,

      documentation: `
    <div class="flex items-center gap-1 bg-blue-100 p-2 text-blue-600 rounded-xl">
      <span><i class="fa-solid fa-book"></i></span>
      <p class="uppercase text-[12px]">Documentation</p>
    </div>`,

      "good first issue": `
    <div class="flex items-center gap-1 bg-purple-100 p-2 text-purple-600 rounded-xl">
      <span><i class="fa-solid fa-seedling"></i></span>
      <p class="uppercase text-[12px]">Good First Issue</p>
    </div>`,
    };

    const labelBadges = issue.labels
      .map((label) => labelStyles[label])
      .filter(Boolean)
      .join("");

    const dateStr = issue.updatedAt;
    const date = new Date(dateStr);
    const formattedDate = `${date.getMonth() + 1}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;

    cardDiv.innerHTML = `
    <div class="flex justify-between items-center">
        <div>
            ${statusIcon}
        </div>
        <div>
            ${priorityBadge}
        </div>
    </div>
    <div class="space-y-2">
        <h2 class="text-[14px] font-semibold capitalize">${issue.title}</h2>
        <p class="text-[#64748B] text-[12px]">${issue.description}</p>
    </div>
    <div class="flex items-center gap-2">
        ${labelBadges}
    </div>
    <hr class="border-[#ddd]" />
    <div>
        <p class="text-[#64748B] text-[12px]">
            <span>#${issue.id}</span>
            <span>by ${issue.author}</span>
        </p>
        <p class="text-[#64748B] text-[12px]">${formattedDate}</p>
    </div>
    `;

    cardDiv.addEventListener("click", () => openIssueModal(issue.id));
    cardDiv.style.cursor = "pointer";

    cardContainer.append(cardDiv);
  });

  const allCardCount = document.getElementById("all-card-count");
  allCardCount.innerText = document.querySelectorAll(".card").length;
  console.log(allCardCount);
};

loadAllIssues();

const statusButtons = document.querySelectorAll(".btn-status");

statusButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button style
    statusButtons.forEach((b) => b.classList.remove("btn-primary"));
    btn.classList.add("btn-primary");

    const selectedStatus = btn.textContent.trim().toLowerCase();
    filterIssues(selectedStatus);
  });
});

const filterIssues = (status) => {
  const allCards = document.querySelectorAll(".card");

  let visibleCount = 0;

  allCards.forEach((card) => {
    if (status === "all") {
      card.style.display = "block";
      visibleCount++;
    } else {
      const isOpen = card.classList.contains("border-t-[#00A96E]");
      const cardStatus = isOpen ? "open" : "closed";

      if (cardStatus === status) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    }
  });

  document.getElementById("all-card-count").innerText = String(
    visibleCount,
  ).padStart(2, "0");
};

// Modal open handler
const openIssueModal = async (issueId) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const json = await res.json();
  const issue = json.data;

  const statusBadge =
    issue.status === "open"
      ? `<span class="bg-[#00A96E] text-white text-[12px] font-semibold px-3 py-1 rounded-full uppercase">Opened</span>`
      : `<span class="bg-[#A855F7] text-white text-[12px] font-semibold px-3 py-1 rounded-full uppercase">Closed</span>`;

  const labelStyles = {
    bug: `<div class="flex items-center gap-1 bg-red-100 px-3 py-1 text-red-600 rounded-full border border-red-300"><span><i class="fa-solid fa-bug text-[11px]"></i></span><p class="uppercase text-[11px] font-semibold">Bug</p></div>`,
    "help wanted": `<div class="flex items-center gap-1 bg-yellow-100 px-3 py-1 text-yellow-600 rounded-full border border-yellow-300"><span><i class="fa-solid fa-life-ring text-[11px]"></i></span><p class="uppercase text-[11px] font-semibold">Help Wanted</p></div>`,
    enhancement: `<div class="flex items-center gap-1 bg-green-100 px-3 py-1 text-green-600 rounded-full border border-green-300"><span><i class="fa-solid fa-wand-magic-sparkles text-[11px]"></i></span><p class="uppercase text-[11px] font-semibold">Enhancement</p></div>`,
    documentation: `<div class="flex items-center gap-1 bg-blue-100 px-3 py-1 text-blue-600 rounded-full border border-blue-300"><span><i class="fa-solid fa-book text-[11px]"></i></span><p class="uppercase text-[11px] font-semibold">Documentation</p></div>`,
    "good first issue": `<div class="flex items-center gap-1 bg-purple-100 px-3 py-1 text-purple-600 rounded-full border border-purple-300"><span><i class="fa-solid fa-seedling text-[11px]"></i></span><p class="uppercase text-[11px] font-semibold">Good First Issue</p></div>`,
  };

  const labelBadges = issue.labels
    .map((l) => labelStyles[l])
    .filter(Boolean)
    .join("");

  const dateStr = issue.updatedAt;
  const date = new Date(dateStr);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-400 text-white",
    low: "bg-gray-300 text-gray-700",
  };
  const priorityClass = priorityColors[issue.priority] || priorityColors.low;

  // Inject modal into DOM
  const existingModal = document.getElementById("issue-modal");
  if (existingModal) existingModal.remove();

  const modalWrapper = document.createElement("div");
  modalWrapper.id = "issue-modal";
  modalWrapper.classList.add(
    "fixed",
    "inset-0",
    "z-50",
    "flex",
    "items-center",
    "justify-center",
    "bg-black/40",
    "backdrop-blur-sm",
    "px-4",
  );

  modalWrapper.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-[760px] p-8 space-y-5 border-2 border-solid border-black shadow-2xl">
      
      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-900 capitalize">${issue.title}</h2>

      <!-- Status + meta -->
      <div class="flex items-center gap-3 flex-wrap">
        ${statusBadge}
        <span class="text-gray-400 text-[13px]">•</span>
        <p class="text-gray-500 text-[13px]">Opened by <span class="font-medium text-gray-700">${issue.author}</span></p>
        <span class="text-gray-400 text-[13px]">•</span>
        <p class="text-gray-500 text-[13px]">${formattedDate}</p>
      </div>

      <!-- Labels -->
      <div class="flex items-center gap-2 flex-wrap">
        ${labelBadges}
      </div>

      <!-- Description -->
      <p class="text-gray-700 text-[14px] leading-relaxed">${issue.description}</p>

      <!-- Assignee + Priority box -->
      <div class="bg-gray-50 rounded-xl p-5 flex items-start gap-16">
        <div>
          <p class="text-gray-500 text-[13px] mb-1">Assignee:</p>
          <p class="font-semibold text-gray-800">${issue.assignee ?? "Unassigned"}</p>
        </div>
        <div>
          <p class="text-gray-500 text-[13px] mb-1">Priority:</p>
          <span class="px-4 py-1 rounded-full text-[12px] font-bold uppercase ${priorityClass}">${issue.priority}</span>
        </div>
      </div>

      <!-- Close button -->
      <div class="flex justify-end">
        <button id="close-modal-btn" class="btn btn-primary px-8">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalWrapper);

  // Close on button click
  document
    .getElementById("close-modal-btn")
    .addEventListener("click", () => modalWrapper.remove());

  // Close on backdrop click
  modalWrapper.addEventListener("click", (e) => {
    if (e.target === modalWrapper) modalWrapper.remove();
  });
};

const searchInput = document.querySelector('input[type="search"]');

let searchTimeout;

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    if (query === "") {
      loadAllIssues(); // reset to all issues if search is cleared
      return;
    }

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`,
    );
    const json = await res.json();
    displayAllIssues(json.data);
  }, 300);
});