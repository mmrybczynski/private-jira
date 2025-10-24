(() => {
    const STORAGE_KEY = "offline-notes-v1";

    const newISO = () => new Date().toISOString();
    const fmt = (iso) => {
        const d = new Date(iso);
        const two = (n) => String(n).padStart(2,"0");
        return `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()} ${two(d.getHours())}:${two(d.getMinutes())}`;
    };
    const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
    const el = (tag, attrs = {}, ...children) => {
        const n = document.createElement(tag);
        for(const [k,v] of Object.entries(attrs)) {
            if(k === "class") n.classNAme = v;
            else if(k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
            else if(k==="dataset") Object.assign(n.dataset, v);
            else if(v !== null && v !== undefined) n.setAttribute(k,v);
        }
        for(const c of children) n.append(c);
        return n;
    }
})