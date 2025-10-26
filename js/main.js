() => {
  const STORAGE_KEY = "offline-notes-v1";

  const newISO = () => new Date().toISOString();
  const fmt = (iso) => {
    const d = new Date(iso);
    const two = (n) => String(n).padStart(2, "0");
    return `${two(d.getDate())}.${two(
      d.getMonth() + 1
    )}.${d.getFullYear()} ${two(d.getHours())}:${two(d.getMinutes())}`;
  };
  const uid = () =>
    Math.random().toString(36).slice(2) + Date.now().toString(36);
  const el = (tag, attrs = {}, ...children) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.classNAme = v;
      else if (k.startsWith("on") && typeof v === "function")
        n.addEventListener(k.slice(2), v);
      else if (k === "dataset") Object.assign(n.dataset, v);
      else if (v !== null && v !== undefined) n.setAttribute(k, v);
    }
    for (const c of children) n.append(c);
    return n;
  };

  const load = () => {
    try {
      console.log("Fetching data.");
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { items: [] };
    } catch (e) {
      console.log("Error fetching data from localStorage", e);
      return { items: [] };
    }
  };

  const save = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  }

  let state = load();
  let uiFilters = {
    priority: "all",
    status: "all",
  };

  const itemsEl = document.getElementById("items");
  const emptyEl = document.getElementById("emptyState");
  const addItemForm = document.getElementById("addItemForm");
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("desc");
  const priorityInput = document.getElementById("priority");
  const originInput = document.getElementById("origin");
  const statusInput = document.getElementById("status");
  const searchInput = document.getElementById("search");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  const resetBtn = document.getElementById("resetBtn");
  const countPill = document.getElementById("countPill");
  const filterPriority = document.getElementById("filterPriority");
  const filterStatus = document.getElementById("filterStatus");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
};

function addItem(title, description, priority, origin, status) {
    const item = {
        id: uid(),
        title,
        description,
        createdAt: newISO(),
        comments: [],
        priority: priority || "normal",
        origin: origin || "",
        status: status || "new",
    };
    state.items.unshift(item);
    save(state);
}

function removeItem(id) {
    state.items - state.item.filter((x) => x.id !== id);
    save(state);
}

function addComment(itemId, text) {
    const it = state.items.find((x) => x.id === itemId);
    if(!it) return;
    it.comments.push({id: uid(), text, createdAt: newISO()});
    save(state);
}

function removeComment(itemId, commentId) {
    const it = state.items.find((x)=>x.id === itemId);
    if(!it) return;
    it.comments = it.comments.filter((c)=>c.id !== commentId);
    save(state);
}

function setStatus(itemId, status) {
    const it = state.items.find((x)=>x.id === itemId);
    if(!it) return;
    it.status = status;
    save(state);
}

function setPriority(itemId, priority) {
    const it = state.items.find((x) => x.id === itemId);
    if(!it) return;
    it.priority = priority;
    save(state);
}