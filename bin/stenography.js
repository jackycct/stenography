#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const VERSION = '0.1.0';
const DEFAULT_SECTIONS = [
  'issue_summary',
  'repo_map',
  'relevant_files',
  'symbols',
  'affected_tests',
  'risk_notes',
  'execution_guidance'
];
const SKIP_DIRS = new Set(['.git', 'node_modules', '.stenography', '.codebrain']);
const TEXT_EXTS = new Set([
  '.md', '.txt', '.js', '.json', '.yml', '.yaml', '.ts', '.tsx', '.jsx',
  '.py', '.rs', '.go', '.java', '.cs', '.rb', '.php', '.sh', '.ps1', '.toml'
]);

function usage() {
  console.log(`stenography ${VERSION}

Usage:
  stenography pack --repo . --task issue.md --budget 30000 --output .stenography/packs/issue.pack.md [--codebrain-analysis analysis.json]
  stenography summarize-repo --repo . --output .stenography/repo-summary.md
  stenography validate-pack .stenography/packs/issue.pack.json
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function relPath(repo, filePath) {
  return path.relative(repo, filePath).replace(/\\/g, '/');
}

function estimateTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

function listRepoFiles(repo) {
  const root = path.resolve(repo);
  const out = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') && !['.apm', '.cursorrules'].includes(entry.name)) {
        if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (TEXT_EXTS.has(ext) || entry.name === 'LICENSE' || entry.name === '.cursorrules') {
          out.push(relPath(root, full));
        }
      }
    }
  }
  walk(root);
  return out.sort();
}

function summarizeRepo(repo) {
  const files = listRepoFiles(repo);
  const docFiles = files.filter((file) => file.toLowerCase().endsWith('.md'));
  const configFiles = files.filter((file) => /(^|\/)(package\.json|apm\.yml|apm\.lock\.yaml|AGENTS\.md|CLAUDE\.md|\.cursorrules)$/.test(file));
  return [
    '# Repo Summary',
    '',
    `repo: ${path.basename(path.resolve(repo))}`,
    `files_total: ${files.length}`,
    '',
    '## Docs',
    ...docFiles.map((file) => `- ${file}`),
    '',
    '## Config',
    ...configFiles.map((file) => `- ${file}`),
    '',
    '## File Map',
    ...files.map((file) => `- ${file}`),
    ''
  ].join('\n');
}

function normalizeAnalysis(input) {
  if (!input) return {};
  return {
    relevant_files: input.relevant_files || input.files || [],
    symbols: input.symbols || [],
    affected_tests: input.affected_tests || input.tests || [],
    risk_notes: input.risk_notes || input.risks || []
  };
}

function renderList(items, fallback) {
  if (!items || items.length === 0) return `- ${fallback}`;
  return items.map((item) => `- ${typeof item === 'string' ? item : JSON.stringify(item)}`).join('\n');
}

function buildPack(options) {
  const repo = path.resolve(options.repo || '.');
  const taskPath = path.resolve(options.task);
  const outputMd = path.resolve(options.output);
  const outputJson = outputMd.replace(/\.md$/i, '.json');
  const budgetTokens = Number(options.budget || 30000);
  const taskText = readText(taskPath);
  const analysis = normalizeAnalysis(options['codebrain-analysis'] ? readJson(path.resolve(options['codebrain-analysis'])) : null);
  const repoSummary = summarizeRepo(repo);
  const taskId = path.basename(taskPath).replace(/\.[^.]+$/, '');
  const sections = DEFAULT_SECTIONS.slice();
  const md = [
    `# Stenography Context Pack: ${taskId}`,
    '',
    '## Issue Summary',
    taskText.trim(),
    '',
    '## Repo Map',
    repoSummary.trim(),
    '',
    '## Relevant Files',
    renderList(analysis.relevant_files, 'No Codebrain relevant_files supplied.'),
    '',
    '## Symbols',
    renderList(analysis.symbols, 'No Codebrain symbols supplied.'),
    '',
    '## Affected Tests',
    renderList(analysis.affected_tests, 'No Codebrain affected_tests supplied.'),
    '',
    '## Risk Notes',
    renderList(analysis.risk_notes, 'No Codebrain risk_notes supplied.'),
    '',
    '## Execution Guidance',
    '- Treat Codebrain fields as opaque inputs; do not depend on Codebrain internals.',
    '- Keep Avionics orchestration outside this repo.',
    '- Keep agent-lens measurement outside this repo.',
    ''
  ].join('\n');
  const estimatedTokens = estimateTokens(md);
  const contract = {
    task_id: taskId,
    source_inputs: {
      issue: relPath(repo, taskPath),
      repo_wiki: '.codebrain/repo-wiki/index.md',
      codebrain_relevant_files: options['codebrain-analysis'] || null
    },
    budget_tokens: budgetTokens,
    estimated_tokens: estimatedTokens,
    included_sections: sections,
    outputs: {
      markdown: relPath(repo, outputMd),
      json: relPath(repo, outputJson)
    }
  };
  ensureDir(outputMd);
  fs.writeFileSync(outputMd, md, 'utf8');
  fs.writeFileSync(outputJson, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');
  return contract;
}

function validatePack(filePath) {
  const pack = readJson(path.resolve(filePath));
  const required = ['task_id', 'source_inputs', 'budget_tokens', 'estimated_tokens', 'included_sections', 'outputs'];
  const missing = required.filter((field) => !(field in pack));
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(', ')}`);
  if (!Array.isArray(pack.included_sections) || pack.included_sections.length === 0) {
    throw new Error('included_sections must be a non-empty array');
  }
  if (!pack.outputs || !pack.outputs.markdown || !pack.outputs.json) {
    throw new Error('outputs.markdown and outputs.json are required');
  }
  if (!Number.isFinite(pack.budget_tokens) || !Number.isFinite(pack.estimated_tokens)) {
    throw new Error('budget_tokens and estimated_tokens must be numbers');
  }
  return pack;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  if (!command || args.help || args.h) {
    usage();
    return;
  }
  if (command === 'summarize-repo') {
    if (!args.output) throw new Error('--output is required');
    const out = path.resolve(args.output);
    ensureDir(out);
    fs.writeFileSync(out, summarizeRepo(args.repo || '.'), 'utf8');
    console.log(`wrote ${args.output}`);
    return;
  }
  if (command === 'pack') {
    if (!args.task || !args.output) throw new Error('--task and --output are required');
    const pack = buildPack(args);
    console.log(JSON.stringify(pack, null, 2));
    return;
  }
  if (command === 'validate-pack') {
    const file = args._[1];
    if (!file) throw new Error('validate-pack requires a JSON file');
    validatePack(file);
    console.log(`valid ${file}`);
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (err) {
  console.error(`stenography: ${err.message}`);
  process.exit(1);
}
