'use strict';
const release = document.getElementById('release');
const selectedFile = document.getElementById('download');
const result = document.getElementById('result');
const verify = document.getElementById('verify');
let entries = [];
fetch('download-checksums.json', {cache: 'no-store'}).then(response => {
  if (!response.ok) throw new Error('Checksum list unavailable');
  return response.json();
}).then(data => {
  if (data.format !== 'UBSDownloadChecksums/v1' || !Array.isArray(data.files)) throw new Error('Invalid list');
  entries = data.files.filter(row => typeof row.filename === 'string' && /^[a-f0-9]{64}$/.test(row.sha256) && Number.isSafeInteger(row.bytes) && row.bytes > 0);
  if (!entries.length) throw new Error('Empty list');
  release.replaceChildren(...entries.map((row, index) => {
    const option = document.createElement('option');
    option.value = String(index); option.textContent = row.filename;
    return option;
  }));
}).catch(() => {
  result.textContent = 'The official checksum list could not be loaded. Try again later.';
  verify.disabled = true;
});
verify.addEventListener('click', async () => {
  const file = selectedFile.files[0], expected = entries[Number(release.value)];
  if (!file || !expected) { result.textContent = 'Choose the official filename and your downloaded file first.'; return; }
  if (file.size !== expected.bytes) { result.textContent = 'DOES NOT MATCH: the file size differs. Download the selected version again from the official source.'; return; }
  verify.disabled = true; selectedFile.disabled = true; release.disabled = true;
  result.textContent = 'Calculating SHA-256 on this device…';
  try {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    const actual = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    result.textContent = actual === expected.sha256 ? 'MATCH: your file matches the published SHA-256 checksum.' : 'DOES NOT MATCH: do not install this copy. Download the selected version again from the official source.';
  } catch {
    result.textContent = 'Verification could not finish. Open this page over HTTPS in a supported browser and try again.';
  } finally { verify.disabled = false; selectedFile.disabled = false; release.disabled = false; }
});
