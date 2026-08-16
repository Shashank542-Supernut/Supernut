/* ==========================================================================
   THE SUPERNUT COMPANY - INTERACTIVE B2B PLATFORM SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize calculations
  calculateContainerLoad();

  // Highlight active nav links on scroll
  window.addEventListener('scroll', handleHeaderScroll);
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & HEADER BEHAVIOR
   -------------------------------------------------------------------------- */
function handleHeaderScroll() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 10px 30px rgba(11, 30, 54, 0.15)';
  } else {
    header.style.boxShadow = 'var(--shadow-sm)';
  }
}

function toggleMobileMenu() {
  const navMenu = id('nav-menu');
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = '#FFFFFF';
    navMenu.style.padding = '1.5rem';
    navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
  }
}

/* --------------------------------------------------------------------------
   2. PRODUCT SPECIFICATION TAB SWITCHING
   -------------------------------------------------------------------------- */
function switchProductTab(tabId) {
  // Update buttons
  const buttons = document.querySelectorAll('.product-tabs .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const card5 = id('grade-5');
  const card6 = id('grade-6');
  const packCard = id('packaging-specs');

  if (tabId === 'all') {
    card5.style.display = 'block';
    card6.style.display = 'block';
    packCard.style.display = 'block';
  } else if (tabId === 'grade-5') {
    card5.style.display = 'block';
    card6.style.display = 'none';
    packCard.style.display = 'none';
    card5.scrollIntoView({ behavior: 'smooth' });
  } else if (tabId === 'grade-6') {
    card5.style.display = 'none';
    card6.style.display = 'block';
    packCard.style.display = 'none';
    card6.scrollIntoView({ behavior: 'smooth' });
  } else if (tabId === 'packaging') {
    card5.style.display = 'none';
    card6.style.display = 'none';
    packCard.style.display = 'block';
    packCard.scrollIntoView({ behavior: 'smooth' });
  }
}

/* --------------------------------------------------------------------------
   3. INTERACTIVE CONTAINER LOAD & FREIGHT CALCULATOR
   -------------------------------------------------------------------------- */
function calculateContainerLoad() {
  const grade = id('calc-grade').value;
  const container = id('calc-container').value;
  const packaging = id('calc-packaging').value;

  let netWeightTons = 7.8;
  let grossWeightTons = 8.2;
  let bagCount = 780;
  let cbmVolume = 72;

  if (container === '40hc') {
    cbmVolume = 76;
    if (packaging === '10bag') {
      bagCount = 780;
      netWeightTons = 7.8;
      grossWeightTons = 8.2;
    } else if (packaging === '25bag') {
      bagCount = 312;
      netWeightTons = 7.8;
      grossWeightTons = 8.1;
    } else if (packaging === 'carton') {
      bagCount = 750;
      netWeightTons = 7.5;
      grossWeightTons = 8.3;
    }
  } else if (container === '20ft') {
    cbmVolume = 33;
    if (packaging === '10bag') {
      bagCount = 340;
      netWeightTons = 3.4;
      grossWeightTons = 3.6;
    } else if (packaging === '25bag') {
      bagCount = 136;
      netWeightTons = 3.4;
      grossWeightTons = 3.55;
    } else if (packaging === 'carton') {
      bagCount = 320;
      netWeightTons = 3.2;
      grossWeightTons = 3.5;
    }
  } else if (container === 'lcl') {
    cbmVolume = 5;
    bagCount = 50;
    netWeightTons = 0.5;
    grossWeightTons = 0.53;
  }

  // Adjust slightly for Grade 6+ (slightly larger pop size means lower bulk density)
  if (grade === 'grade6') {
    netWeightTons = (netWeightTons * 0.95).toFixed(1);
    grossWeightTons = (grossWeightTons * 0.95).toFixed(1);
  } else {
    netWeightTons = netWeightTons.toFixed(1);
    grossWeightTons = grossWeightTons.toFixed(1);
  }

  // Render values
  id('res-net-weight').innerText = `${netWeightTons} MT`;
  id('res-gross-weight').innerText = `${grossWeightTons} MT`;
  id('res-bags').innerText = `${bagCount} Packages`;
  id('res-volume').innerText = `${cbmVolume} CBM`;
}

/* --------------------------------------------------------------------------
   4. MODAL & SAMPLE REQUEST FLOW
   -------------------------------------------------------------------------- */
function openModal(modalId) {
  id(modalId).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  id(modalId).classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openSampleModal(productGrade = '') {
  const container = id('modal-form-container');
  // Copy form from main page or inject cleanly
  const formHTML = `
    <form id="modal-enquiry-form" onsubmit="handleModalFormSubmission(event)">
      <div class="form-row">
        <div class="form-group half-width">
          <label for="m_company_name">Company Name *</label>
          <input type="text" id="m_company_name" class="form-control" required placeholder="e.g. Global Foods Trading LLC">
        </div>
        <div class="form-group half-width">
          <label for="m_contact_person">Contact Person *</label>
          <input type="text" id="m_contact_person" class="form-control" required placeholder="e.g. Mr. John Smith">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group half-width">
          <label for="m_corporate_email">Corporate Email *</label>
          <input type="email" id="m_corporate_email" class="form-control" required placeholder="name@company.com">
        </div>
        <div class="form-group half-width">
          <label for="m_phone_number">Phone Number (with Country Code) *</label>
          <input type="tel" id="m_phone_number" class="form-control" required placeholder="+1 (555) 000-0000">
        </div>
      </div>
      <div class="form-group">
        <label for="m_delivery_address">Delivery Address (for Sample Dispatch) *</label>
        <textarea id="m_delivery_address" class="form-control" rows="2" required placeholder="Complete corporate delivery address including country"></textarea>
      </div>
      <div class="form-group">
        <label>Product Interest *</label>
        <select id="m_product_interest" class="form-control">
          <option value="Grade 5+ Suta Fox Nuts" ${productGrade.includes('5+') ? 'selected' : ''}>Grade 5+ Suta (17–26 mm)</option>
          <option value="Grade 6+ Suta Fox Nuts" ${productGrade.includes('6+') ? 'selected' : ''}>Grade 6+ Suta (19–26 mm)</option>
          <option value="Both Grades (5+ & 6+)" ${!productGrade ? 'selected' : ''}>Both Premium Grades (5+ & 6+)</option>
          <option value="Private Label OEM" ${productGrade.includes('Private') ? 'selected' : ''}>Private Labeling / OEM Packaging</option>
        </select>
      </div>
      <div class="form-group">
        <label for="m_open_enquiry">How can we help you? (Share specific requirements, estimated volumes, or questions) *</label>
        <textarea id="m_open_enquiry" class="form-control" rows="3" required placeholder="Share estimated container requirement, port of destination, or specific sample requests..."></textarea>
      </div>
      <button type="submit" class="btn btn-gold btn-lg btn-block">
        <i class="fa-solid fa-paper-plane"></i> Submit Sample & Trade Enquiry
      </button>
    </form>
  `;

  container.innerHTML = formHTML;
  openModal('sample-modal');
}

function handleFormSubmission(event) {
  event.preventDefault();
  const refCode = 'TSNC-2026-' + Math.floor(1000 + Math.random() * 9000);
  id('enquiry-ref').innerText = refCode;
  
  const cName = id('company_name').value;
  id('success-message').innerHTML = `Thank you, <strong>${cName}</strong>. Your B2B Fox Nuts sample request has been submitted directly to our trade desk. An export manager will confirm your dispatch details via email and WhatsApp within 12 business hours.`;

  openModal('success-modal');
}

function handleModalFormSubmission(event) {
  event.preventDefault();
  closeModal('sample-modal');
  const refCode = 'TSNC-2026-' + Math.floor(1000 + Math.random() * 9000);
  id('enquiry-ref').innerText = refCode;
  
  const cName = id('m_company_name').value;
  id('success-message').innerHTML = `Thank you, <strong>${cName}</strong>. Your sample request has been received. Our export trade desk will review your requirements and send sample tracking details.`;

  openModal('success-modal');
}

/* --------------------------------------------------------------------------
   5. B2B SPECIFICATION SHEET & QUOTE PDF GENERATOR
   -------------------------------------------------------------------------- */
function downloadSpecSheet(gradeName) {
  alert(`Generating Official B2B Specification Sheet PDF for ${gradeName}...`);
  downloadPDFDoc(`The Supernut Company - Technical Specifications (${gradeName})`);
}

function downloadSamplePDF() {
  const ref = id('enquiry-ref').innerText;
  downloadPDFDoc(`The Supernut Company - B2B Sample Dispatch Receipt & Specification Sheet (${ref})`);
}

function downloadPDFDoc(docTitle) {
  // Create a clean printable document window
  const printWin = window.open('', '_blank');
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${docTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #0B1E36; line-height: 1.6; }
        .header { border-bottom: 3px solid #D99B26; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; }
        .title { font-size: 24px; font-weight: bold; color: #0B1E36; margin: 0; }
        .subtitle { font-size: 14px; color: #D99B26; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; }
        .contact-box { background: #F8FAFC; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #0B1E36; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #CBD5E1; padding: 10px 14px; text-align: left; font-size: 13px; }
        th { background: #0B1E36; color: #FFFFFF; }
        .footer { margin-top: 50px; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 15px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">THE SUPERNUT COMPANY</div>
          <div class="subtitle">PREMIER B2B FOX NUTS (MAKHANA) EXPORT HOUSE</div>
        </div>
        <div style="text-align:right; font-size: 12px;">
          <strong>Date:</strong> ${new Date().toLocaleDateString()}<br>
          <strong>Origin:</strong> Bihar, India
        </div>
      </div>

      <div class="contact-box">
        <strong>Export Trade Desk Contact Matrix:</strong><br>
        Phone: +91 7703904541 / +91 9217675400 | Email: shashank@thesupernutcompany.com<br>
        Compliance: APEDA Reg # 219842 | FSSAI # 104210000182 | US FDA # 19842104928
      </div>

      <h2>Official B2B Export Specification Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Technical Parameter</th>
            <th>Grade 5+ Suta Specification</th>
            <th>Grade 6+ Suta Jumbo Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pop Diameter (Size)</strong></td>
            <td>17 mm to 26 mm</td>
            <td>19 mm to 26 mm (Jumbo)</td>
          </tr>
          <tr>
            <td><strong>Purity Level</strong></td>
            <td>99.5% Minimum</td>
            <td>99.8% Minimum</td>
          </tr>
          <tr>
            <td><strong>Moisture Content</strong></td>
            <td>Max 3.5%</td>
            <td>Max 3.0%</td>
          </tr>
          <tr>
            <td><strong>Color / Appearance</strong></td>
            <td>Natural Ivory White</td>
            <td>Pristine Pure White</td>
          </tr>
          <tr>
            <td><strong>Broken / Damage Count</strong></td>
            <td>&lt; 0.5%</td>
            <td>&lt; 0.2%</td>
          </tr>
          <tr>
            <td><strong>Outer Shell Contamination</strong></td>
            <td>&lt; 0.1%</td>
            <td>0% (Nil)</td>
          </tr>
          <tr>
            <td><strong>Packaging Options</strong></td>
            <td>10kg / 25kg PP Bags with PE liner</td>
            <td>10kg 5-Ply Nitrogen Cartons</td>
          </tr>
          <tr>
            <td><strong>Shelf Life</strong></td>
            <td>12 Months</td>
            <td>12 Months (Vacuum sealed)</td>
          </tr>
        </tbody>
      </table>

      <h3 style="margin-top: 30px;">Incoterms 2020 Sea Freight Standards</h3>
      <p style="font-size: 13px;">
        All consignments stuffed in Mundra Port (INMUN) or JNPT Port (INNSA). Container loading: 40ft High Cube holds approx 7.5 to 8.0 Metric Tons (volume bound). Accompanied by Phytosanitary Certificate, Certificate of Origin, and Bill of Lading.
      </p>

      <div class="footer">
        &copy; 2026 The Supernut Company. Confidential B2B Trade Document. Sourced directly from Bihar, India.
      </div>
    </body>
    </html>
  `;

  printWin.document.write(printContent);
  printWin.document.close();
  setTimeout(() => {
    printWin.print();
  }, 500);
}

/* Helper Functions */
function id(elementId) {
  return document.getElementById(elementId);
}
