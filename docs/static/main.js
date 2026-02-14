document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ot-demo').forEach(demo => {
    const pre = demo.querySelector('pre');
    if (!pre) return;

    const code = pre.querySelector('code');
    const rawHTML = code.textContent;

    // Create tabbed interface.
    demo.innerHTML = `
      <ot-tabs>
        <div role="tablist">
          <button role="tab">⧉ Preview</button>
          <button role="tab">{} Code</button>
        </div>
        <div role="tabpanel">
          <div class="demo-box"><div class="demo-content">${rawHTML}</div></div>
        </div>
        <div role="tabpanel"></div>
      </ot-tabs>
    `;

    // Move the original Zola syntax-highlighted <pre> into the Code tab.
    demo.querySelector(':scope > ot-tabs > [role="tabpanel"]:last-child').appendChild(pre);
  });

  // Add copy buttons to all code blocks
  document.querySelectorAll('pre > code').forEach(code => {
    const pre = code.parentElement;

    // Create button
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');

    // Add click event
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        btn.textContent = 'Error';
      });
    });

    pre.appendChild(btn);
  });
});


function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
