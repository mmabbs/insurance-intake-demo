// FUNCTIONAL REFERENCE: Claude-built, not developer-reviewed.
// Data loading and tables for the intake dashboard,
// dashboard-portfolio-functional-reference.html. The page supplies
// its own styles and the element ids used below. Read-only. All data is fictional.
(() => {
  const BASE = 'http://localhost:5678/webhook/';
  const TZ = 'America/Toronto';
  const REFRESH_MS = 5000;        // tables
  const COST_REFRESH_MS = 30000;  // cost reads every run in full, so it's asked less often

  const state = { audit: [], corrections: [], attention: [], cost: null, seen: null, problem: '', sort: {} };

  const $ = (id) => document.getElementById(id);
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // An empty table comes back as status 200 with an empty body, not as "[]".
  async function getRows(path) {
    const res = await fetch(BASE + path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${path} answered HTTP ${res.status}`);
    const text = await res.text();
    if (!text.trim()) return [];
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [data];
  }

  function parseJson(s) {
    if (s && typeof s === 'object') return s;
    try { return JSON.parse(s || '{}'); } catch { return {}; }
  }

  function fmtWhen(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return d.toLocaleString('en-CA', { timeZone: TZ, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
  const fmtInt = (n) => Number(n || 0).toLocaleString('en-CA');
  // Per-email costs are fractions of a cent, so they keep four decimals.
  const fmtUsd = (n, digits = 4) => '$' + Number(n || 0).toFixed(digits);
  const pct = (part, whole) => whole ? Math.round((part / whole) * 100) + '%' : '–';
  const time = (iso) => { const t = Date.parse(iso); return isNaN(t) ? 0 : t; };

  const changedBoxes = (row) => String(row.fields_changed || '').split(',').map((s) => s.trim()).filter(Boolean);
  const senderName = (row) => String(row.sender || '').replace(/\s*<[^>]*>\s*$/, '');

  // Sorting. Each column says how to compare its rows and which way it sorts on the
  // first click: dates newest first, numbers largest first, ranked values (urgency,
  // confidence) most pressing first, text A to Z. A second click reverses it.
  const RANK = {
    urgency: { High: 3, Normal: 2, Low: 1 },
    confidence: { high: 3, medium: 2, low: 1 },
  };
  const by = {
    date: (key) => ({ value: (r) => time(r[key]), first: 'desc' }),
    num: (fn) => ({ value: fn, first: 'desc' }),
    text: (fn) => ({ value: (r) => String(fn(r) ?? '').toLowerCase(), first: 'asc' }),
    rank: (fn) => ({ value: fn, first: 'desc' }),
  };

  function sortRows(tableId, rows, columns, fallback) {
    const s = state.sort[tableId] || fallback;
    const col = columns.find((c) => c.id === s.col);
    if (!col || !col.sort) return rows;
    const dir = s.dir === 'asc' ? 1 : -1;
    // Ties fall back to the table's default order, so equal rows don't jump around on refresh.
    const fb = columns.find((c) => c.id === fallback.col);
    const fbDir = fallback.dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = col.sort.value(a), y = col.sort.value(b);
      if (x < y) return -1 * dir;
      if (x > y) return 1 * dir;
      if (fb && fb !== col) {
        const p = fb.sort.value(a), q = fb.sort.value(b);
        return p < q ? -1 * fbDir : p > q ? 1 * fbDir : 0;
      }
      return 0;
    });
  }

  // Rows that weren't there on the previous load are highlighted for 10 seconds.
  const isNew = (kind, row) => !!state.seen && !state.seen.has(`${kind}:${row.id}`);

  // Renders one sortable table into the element with this id.
  function renderTable({ id, kind, rows, columns, fallback, empty, footer = '' }) {
    const el = $(id);
    if (!rows.length) { el.innerHTML = `<div class="empty">${esc(empty)}</div>`; return; }
    const s = state.sort[id] || fallback;
    const sorted = sortRows(id, rows, columns, fallback);
    const head = columns.map((c) => {
      const cls = c.num ? ' class="num"' : '';
      if (!c.sort) return `<th${cls}>${esc(c.label)}</th>`;
      const active = s.col === c.id;
      const aria = active ? (s.dir === 'asc' ? 'ascending' : 'descending') : 'none';
      const arrow = active ? (s.dir === 'asc' ? '▲' : '▼') : '';
      return `<th${cls} aria-sort="${aria}"><button type="button" class="sort${active ? ' active' : ''}" data-table="${id}" data-col="${c.id}">${esc(c.label)}<span class="arrow" aria-hidden="true">${arrow}</span></button></th>`;
    }).join('');
    const body = sorted.map((r) => `<tr class="${kind && isNew(kind, r) ? 'new' : ''}">${columns.map((c) => c.cell(r)).join('')}</tr>`).join('');
    el.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}${footer}</tbody></table>`;
  }

  // One click handler for every sortable heading on the page.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button.sort');
    if (!btn) return;
    const { table, col } = btn.dataset;
    const def = TABLES[table];
    const column = def.columns.find((c) => c.id === col);
    const current = state.sort[table] || def.fallback;
    const dir = current.col === col ? (current.dir === 'asc' ? 'desc' : 'asc') : column.sort.first;
    state.sort[table] = { col, dir };
    renderAll();
    const again = document.querySelector(`button.sort[data-table="${table}"][data-col="${col}"]`);
    if (again) again.focus();
  });

  const td = (html, cls = '') => `<td${cls ? ` class="${cls}"` : ''}>${html}</td>`;

  const TABLES = {
    attention: {
      fallback: { col: 'failed', dir: 'desc' },
      columns: [
        { id: 'failed', label: 'Failed', sort: by.date('failed_at'), cell: (r) => td(esc(fmtWhen(r.failed_at)), 'when') },
        { id: 'workflow', label: 'Workflow', sort: by.text((r) => r.workflow), cell: (r) => td(esc(r.workflow), 'strong') },
        { id: 'step', label: 'Step', sort: by.text((r) => r.failed_step), cell: (r) => td(esc(r.failed_step)) },
        { id: 'error', label: 'Error', sort: by.text((r) => r.error), cell: (r) => td(`<span class="flagged">⚠</span> ${esc(r.error)}`) },
        { id: 'run', label: 'Run', num: true, sort: by.num((r) => Number(r.execution_id) || 0),
          cell: (r) => td(r.run_link ? `<a href="${esc(r.run_link)}" target="_blank" rel="noopener">${esc(r.execution_id)}</a>` : esc(r.execution_id), 'num') },
      ],
    },
    corrections: {
      fallback: { col: 'corrected', dir: 'desc' },
      columns: [
        { id: 'corrected', label: 'Corrected', sort: by.date('corrected_at'), cell: (r) => td(esc(fmtWhen(r.corrected_at)), 'when') },
        { id: 'email', label: 'Email', sort: by.text((r) => r.email_subject), cell: (r) => td(esc(r.email_subject), 'strong') },
        { id: 'changed', label: 'What changed', sort: by.text((r) => r.fields_changed), cell: (r) => {
          const ai = parseJson(r.ai_values), broker = parseJson(r.broker_values);
          const changes = changedBoxes(r).map((b) => `
            <span class="k">${esc(b)}</span>
            <span><span class="ai clip">${esc(ai[b])}</span><span class="broker clip">${esc(broker[b])}</span></span>`).join('');
          return td(`<div class="change">${changes}</div>`);
        } },
        { id: 'by', label: 'By', sort: by.text((r) => r.corrected_by), cell: (r) => td(esc(r.corrected_by)) },
      ],
    },
    emails: {
      fallback: { col: 'approved', dir: 'desc' },
      columns: [
        { id: 'approved', label: 'Approved', sort: by.date('approved_at'), cell: (r) => td(esc(fmtWhen(r.approved_at)), 'when') },
        { id: 'from', label: 'From', sort: by.text(senderName), cell: (r) => td(esc(senderName(r))) },
        { id: 'subject', label: 'Subject', sort: by.text((r) => r.subject), cell: (r) => td(esc(r.subject), 'strong') },
        { id: 'category', label: 'Sorted as', sort: by.text((r) => r.category), cell: (r) => td(esc(r.category)) },
        { id: 'urgency', label: 'Urgency (AI)', sort: by.rank((r) => RANK.urgency[r.urgency] || 0), cell: (r) => td(esc(r.urgency)) },
        { id: 'confidence', label: 'Confidence', sort: by.rank((r) => RANK.confidence[r.confidence] || 0), cell: (r) => td(esc(r.confidence)) },
        { id: 'flag', label: 'Flag', sort: by.rank((r) => (r.review_flag ? 1 : 0)),
          cell: (r) => td(r.review_flag ? `<span class="flagged" title="${esc(r.review_flag)}">⚠ Flagged</span>` : '') },
        { id: 'outcome', label: 'Outcome', sort: by.rank((r) => changedBoxes(r).length),
          cell: (r) => { const b = changedBoxes(r); return td(b.length ? `<span class="outcome-corrected">Corrected: ${esc(b.join(', '))}</span>` : 'As drafted'); } },
        { id: 'by', label: 'Approved by', sort: by.text((r) => r.approved_by), cell: (r) => td(esc(r.approved_by)) },
      ],
    },
    runs: {
      fallback: { col: 'run', dir: 'desc' },
      columns: [
        { id: 'run', label: 'Run', sort: by.num((r) => r.execution_id), cell: (r) => td(esc(r.execution_id), 'strong') },
        { id: 'started', label: 'Started', sort: by.date('started_at'), cell: (r) => td(esc(fmtWhen(r.started_at)), 'when') },
        { id: 'emails', label: 'Emails logged', num: true, sort: by.num((r) => r.emails), cell: (r) => td(fmtInt(r.emails), 'num') },
        { id: 'calls', label: 'Claude calls', num: true, sort: by.num((r) => r.claude_calls), cell: (r) => td(fmtInt(r.claude_calls), 'num') },
        { id: 'in', label: 'Tokens in', num: true, sort: by.num((r) => r.tokens_in), cell: (r) => td(fmtInt(r.tokens_in), 'num') },
        { id: 'out', label: 'Tokens out', num: true, sort: by.num((r) => r.tokens_out), cell: (r) => td(fmtInt(r.tokens_out), 'num') },
        { id: 'cost', label: 'Cost', num: true, sort: by.num((r) => r.cost_usd), cell: (r) => td(fmtUsd(r.cost_usd), 'num') },
      ],
    },
  };

  function renderFigures() {
    const total = state.audit.length;
    const corrected = state.audit.filter((r) => changedBoxes(r).length).length;
    const untouched = total - corrected;
    const flagged = state.audit.filter((r) => r.review_flag).length;
    $('f-in').textContent = fmtInt(total);
    $('f-in-note').textContent = total ? `${fmtInt(flagged)} flagged for a closer look` : 'None yet';
    $('f-untouched').textContent = fmtInt(untouched);
    $('f-untouched-note').textContent = total ? `${pct(untouched, total)} of emails` : ' ';
    $('f-corrected').textContent = fmtInt(corrected);
    $('f-corrected-note').textContent = total ? `${pct(corrected, total)} of emails` : ' ';

    const open = state.attention.length;
    $('f-attention').textContent = fmtInt(open);
    $('t-attention').classList.toggle('alert', open > 0);
    $('f-attention-note').innerHTML = open ? '<span class="flag">⚠ Check the list below</span>' : 'Nothing failed';

    const c = state.cost;
    if (c) {
      $('f-cost').textContent = fmtUsd(c.cost_usd);
      $('f-cost-note').textContent = c.emails ? `${fmtUsd(c.cost_per_email_usd)} per email` : ' ';
    }
  }

  function renderCost() {
    const c = state.cost;
    if (!c) return;
    $('cost-measured').textContent = `Measured ${fmtWhen(c.measured_at)}`;
    const total = `<tr class="total"><td class="strong">Total</td><td></td>
      <td class="num strong">${fmtInt(c.emails)}</td><td class="num strong">${fmtInt(c.claude_calls)}</td>
      <td class="num strong">${fmtInt(c.tokens_in)}</td><td class="num strong">${fmtInt(c.tokens_out)}</td>
      <td class="num strong">${fmtUsd(c.cost_usd)}</td></tr>`;
    renderTable({ id: 'runs', kind: '', rows: c.runs || [], ...TABLES.runs, empty: 'No runs yet.', footer: total });
    const gaps = [];
    if (c.runs_unreadable) gaps.push(`${c.runs_unreadable} run(s) couldn't be read and aren't counted.`);
    if (c.unpriced_models && c.unpriced_models.length) gaps.push(`No price on file for ${c.unpriced_models.join(', ')}; those calls aren't counted.`);
    $('cost-foot').textContent =
      'Every Claude call in each run, counted from the token numbers n8n saved with that run. ' +
      `Prices from the ${c.prices_source}. Per-email cost divides the total by the emails the audit log holds; ` +
      'a run stopped before every review was submitted counts all of its Claude calls but only the emails it logged. ' +
      gaps.join(' ');
  }

  function renderAll() {
    renderFigures();
    renderTable({ id: 'attention', kind: 'na', rows: state.attention, ...TABLES.attention, empty: 'Nothing needs attention.' });
    renderTable({ id: 'corrections', kind: 'co', rows: state.corrections, ...TABLES.corrections, empty: 'No corrections yet.' });
    renderTable({ id: 'emails', kind: 'au', rows: state.audit, ...TABLES.emails, empty: 'No emails yet.' });
    renderCost();
  }

  function renderLive() {
    $('live').classList.toggle('stale', !!state.problem);
    const now = new Date().toLocaleTimeString('en-CA', { timeZone: TZ, hour: 'numeric', minute: '2-digit', second: '2-digit' });
    $('live-text').innerHTML = state.problem
      ? `Last good data kept<span class="problem">Can't reach the data: ${esc(state.problem)}</span>`
      : `Live · updated ${esc(now)}`;
  }

  const problemText = (err) => err.message === 'Failed to fetch' ? 'is n8n running, with Dashboard data published?' : err.message;

  async function loadTables() {
    try {
      const [audit, corrections, attention] = await Promise.all([
        getRows('dash-audit-log'), getRows('dash-corrections'), getRows('dash-needs-attention'),
      ]);
      Object.assign(state, { audit, corrections, attention, problem: '' });
      renderAll();
      state.seen = new Set([
        ...audit.map((r) => `au:${r.id}`), ...corrections.map((r) => `co:${r.id}`), ...attention.map((r) => `na:${r.id}`),
      ]);
    } catch (err) {
      state.problem = problemText(err);
    }
    renderLive();
  }

  async function loadCost() {
    try {
      const [cost] = await getRows('dash-cost');
      state.cost = cost || { runs: [], emails: 0, cost_usd: 0, cost_per_email_usd: 0, claude_calls: 0, tokens_in: 0, tokens_out: 0, measured_at: new Date().toISOString(), prices_source: 'Claude API reference' };
      renderFigures(); renderCost();
    } catch (err) {
      state.problem = problemText(err);
      renderLive();
    }
  }

  loadTables(); loadCost();
  setInterval(loadTables, REFRESH_MS);
  setInterval(loadCost, COST_REFRESH_MS);
})();
