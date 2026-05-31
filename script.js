const products = {
  code: {
    status: "AVAILABLE NOW",
    symbol: "</>",
    kind: "AI Coding for Enterprise",
    name: "Meta Code",
    description:
      "面向企业研发团队的 AI 编程助手。连接企业知识、统一模型和身份权限，让 AI 参与真实的软件交付流程。",
    features: ["企业知识库接入", "统一 Token 池与权限", "研发场景提效"],
    href: "https://metacode.origintask.cn/",
    linkLabel: "访问产品站"
  },
  tools: {
    status: "AVAILABLE NOW",
    symbol: "✦",
    kind: "Deterministic AI Toolkit",
    name: "Meta Tools",
    description:
      "面向企业业务团队的确定性 AI 工具集。通过参数化模板把复杂任务变成稳定、可复制、可审核的业务产出。",
    features: ["轻量业务工具", "参数化模板", "稳定结果输出"],
    href: "https://picospark.cn/",
    linkLabel: "访问 PicoSpark"
  },
  gate: {
    status: "AVAILABLE NOW",
    symbol: "◎",
    kind: "Unified AI Gateway",
    name: "Meta Gate",
    description:
      "企业 AI 的统一控制入口。集中管理模型、Token、权限和调用记录，为 AI 应用提供可靠、安全的运行基础。",
    features: ["多模型统一管理", "Token 与成本控制", "审计与治理"],
    href: "http://napi.origintask.cn/",
    linkLabel: "访问 Meta Gate"
  },
  work: {
    status: "IN DEVELOPMENT",
    symbol: "◇",
    kind: "Intelligent Workspace",
    name: "Meta Work",
    description:
      "面向企业员工的智能工作台。将对话、知识、任务与业务系统连接在一起，让 AI 成为日常工作的协作伙伴。",
    features: ["企业级智能对话", "知识与系统连接", "Agent 工作流"],
    href: "https://work.metask.ai/",
    linkLabel: "即将上线"
  }
};

const detail = document.querySelector("#product-detail");
const tabs = document.querySelectorAll(".product-tab");

function renderProduct(key) {
  if (!detail) {
    return;
  }
  const product = products[key];
  detail.innerHTML = `
    <div class="product-detail-top">
      <p class="product-status">${product.status}</p>
      <span class="product-symbol">${product.symbol}</span>
    </div>
    <div>
      <p class="product-kind">${product.kind}</p>
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
    </div>
    <ul class="product-features">
      ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
    <a class="product-link" href="${product.href}" target="_blank" rel="noreferrer">
      ${product.linkLabel}
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
      </svg>
    </a>
  `;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderProduct(tab.dataset.product);
  });
});

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const dropdownItems = document.querySelectorAll(".nav-item-dropdown");
const desktopNav = window.matchMedia("(min-width: 961px)");

function closeDropdowns(except) {
  dropdownItems.forEach((item) => {
    if (item !== except) {
      item.classList.remove("open");
      item.querySelector(".nav-dropdown-toggle").setAttribute("aria-expanded", "false");
    }
  });
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  if (!open) {
    closeDropdowns();
  }
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    closeDropdowns();
  });
});

dropdownItems.forEach((item) => {
  const dropdownToggle = item.querySelector(".nav-dropdown-toggle");
  let closeTimer;

  item.addEventListener("mouseenter", () => {
    if (!desktopNav.matches) {
      return;
    }
    window.clearTimeout(closeTimer);
    closeDropdowns(item);
    item.classList.add("open");
    dropdownToggle.setAttribute("aria-expanded", "true");
  });

  item.addEventListener("mouseleave", () => {
    if (!desktopNav.matches) {
      return;
    }
    closeTimer = window.setTimeout(() => {
      item.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }, 260);
  });

  dropdownToggle.addEventListener("click", () => {
    const open = !item.classList.contains("open");
    closeDropdowns(item);
    item.classList.toggle("open", open);
    dropdownToggle.setAttribute("aria-expanded", String(open));
  });
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    closeDropdowns();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
