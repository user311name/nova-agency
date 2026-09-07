const fs = require('fs');
const path = 'C:/Users/TFSI/Desktop/nova-agency/app/espace-client/securite/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings for searching
const contentNormalized = content.replace(/\r\n/g, '\n');

const oldSectionStart = '{/* =====================================================\n          PROTECTION';
const oldSectionEnd = '      </section>\n\n      {/* =====================================================\n          ESPACE CLIENT';

let startIdx = contentNormalized.indexOf(oldSectionStart);
let endIdx = contentNormalized.indexOf(oldSectionEnd);

if (startIdx !== -1 && endIdx !== -1) {
  // Map back to original content positions
  const oldSection = contentNormalized.substring(startIdx, endIdx + '      </section>\n'.length);
  
  const newSection = `{/* =====================================================
          PROTECTION
      ===================================================== */}
      <section className="security-protection-section">
        <div className="security-container">
          <div className="security-protection-heading">
            <div>
              <span className="security-label">
                ACTIONS DE PROTECTION
              </span>

              <h2>
                Renforcez votre sécurité
                <br />
                dès aujourd'hui.
              </h2>
            </div>

            <p>
              Passez à l'action avec des mesures concrètes pour protéger
              vos domaines, vos emails et votre infrastructure.
            </p>
          </div>

          <div className="security-action-grid">
            <article className="security-action-card">
              <div className="security-action-icon">
                🔑
              </div>
              <div>
                <h3>Authentification à deux facteurs</h3>
                <p>Activez la 2FA sur votre compte pour une protection renforcée contre les accès non autorisés.</p>
                <Link
                  href="/espace-client/parametres"
                  className="security-button security-button-primary"
                >
                  Activer la 2FA
                </Link>
              </div>
            </article>

            <article className="security-action-card">
              <div className="security-action-icon">
                🌐
              </div>
              <div>
                <h3>Sécurité DNS avancée</h3>
                <p>Configurez DNSSEC et d'autres protections pour sécuriser la résolution de vos domaines.</p>
                <Link
                  href="/espace-client/domaines"
                  className="security-button security-button-primary"
                >
                  Sécuriser mes DNS
                </Link>
              </div>
            </article>

            <article className="security-action-card">
              <div className="security-action-icon">
                📧
              </div>
              <div>
                <h3>Protection des emails</h3>
                <p>Mettez en place SPF, DKIM et DMARC pour prévenir le spoofing et le phishing sur vos domaines.</p>
                <Link
                  href="/espace-client/emails"
                  className="security-button security-button-primary"
                >
                  Protéger mes emails
                </Link>
              </div>
            </article>

            <article className="security-action-card">
              <div className="security-action-icon">
                💾
              </div>
              <div>
                <h3>Sauvegardes sécurisées</h3>
                <p>Activez des sauvegardes automatiques et chiffrées de vos données critiques.</p>
                <Link
                  href="/espace-client/services"
                  className="security-button security-button-primary"
                >
                  Configurer les sauvegardes
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>`;
  
  // Replace in normalized content
  let newContentNormalized = contentNormalized.replace(oldSection, newSection);
  
  // Restore original line endings (CRLF)
  let newContent = newContentNormalized.replace(/\n/g, '\r\n');
  
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('File updated successfully with CRLF line endings');
} else {
  console.log('Could not find the section to replace');
  console.log('Start idx:', startIdx, 'End idx:', endIdx);
  console.log('Looking for start:', oldSectionStart);
  console.log('Looking for end:', oldSectionEnd);
  
  // Debug: show what we have around where we expect it
  const debugStart = contentNormalized.indexOf('{/* =====================================================');
  if (debugStart !== -1) {
    const context = contentNormalized.substring(debugStart, debugStart + 200);
    console.log('Context around marker:', JSON.stringify(context));
  }
}