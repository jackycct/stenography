const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.';
const srcDir = __dirname;

function copyFile(srcName, destName) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(targetDir, destName);
  
  // Ensure target directories exist
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully installed: ${destName}`);
  } catch (err) {
    console.error(`Error copying ${srcName} to ${destName}:`, err.message);
  }
}

// Detect environment and install appropriate configuration
if (process.env.ANTIGRAVITY_AGENT) {
  console.log('Detected Antigravity / Codex environment.');
  copyFile('AGENTS.md', 'AGENTS.md');
} else if (process.env.CLAUDE_CODE_SHELL || process.env.CLAUDE_CODE_OAUTH_TOKEN) {
  console.log('Detected Claude Code environment.');
  copyFile('CLAUDE.md', 'CLAUDE.md');
} else if (process.env.TERM_PROGRAM === 'vscode' || process.env.VSCODE_PID) {
  console.log('Detected VS Code / Cursor environment.');
  copyFile('AGENTS.md', 'AGENTS.md');
  copyFile('.cursorrules', '.cursorrules');
} else {
  // If run in generic environment, install all available templates
  console.log('Generic environment. Installing all helper configurations...');
  copyFile('AGENTS.md', 'AGENTS.md');
  copyFile('CLAUDE.md', 'CLAUDE.md');
  copyFile('.cursorrules', '.cursorrules');
}
