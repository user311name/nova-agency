const fs = require('fs');
const filePath = 'C:/Users/TFSI/Desktop/nova-agency/app/espace-client/securite/page.css';
let content = fs.readFileSync(filePath, 'utf8');

const insertionPoint = '/* =========================\n    PROTECTION CARDS\n========================= */';

const newStyles = `/* =========================
    STATUS & ACTION GRID
========================= */

.security-status-grid,
.security-action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 65px;
}

.security-status-card,
.security-action-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 270px;
  padding: 24px;
  border: 1px solid var(--security-border);
  border-radius: 18px;
  background:
    radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.08), transparent 32%),
    var(--security-card);
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background 200ms ease;
}

.security-status-card:hover,
.security-action-card:hover {
  transform: translateY(-4px);
  border-color: rgba(185, 154, 255, 0.25);
  background:
    radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.13), transparent 36%),
    var(--security-card-strong);
}

.security-status-icon,
.security-action-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.12);
  font-size: 22px;
}

.security-status-card h3,
.security-action-card h3 {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.02em;
}

.security-status-card p,
.security-action-card p {
  margin: 0;
  flex: 1;
  color: #8f8f99;
  font-size: 13px;
  line-height: 1.7;
}

.security-status-card .security-button {
  justify-content: flex-start;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
  font-size: 12px;
  min-height: auto;
  height: auto;
}

.security-status-card .security-button:hover {
  transform: none;
  box-shadow: none;
}

`;

content = content.replace(insertionPoint, newStyles + insertionPoint);
fs.writeFileSync(filePath, content, 'utf8');
console.log('CSS updated');
