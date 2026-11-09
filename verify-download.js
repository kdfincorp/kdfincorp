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
  result.textContent = 'The official checksum list is currently unavailable. Please reload this page or try again later.';
  verify.disabled = true;
});
verify.addEventListener('click', async () => {
  const file = selectedFile.files[0], expected = entries[Number(release.value)];
  if (!file || !expected) { result.textContent = 'Select an official download and choose the corresponding file from your device.'; return; }
  if (file.size !== expected.bytes) { result.textContent = 'DOES NOT MATCH: the file size differs from the published copy. Download the selected version again from the official website.'; return; }
  verify.disabled = true; selectedFile.disabled = true; release.disabled = true;
  result.textContent = 'Verifying the file on your device…';
  try {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    const actual = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    result.textContent = actual === expected.sha256 ? 'MATCH: this file matches the published SHA-256 checksum.' : 'DOES NOT MATCH: this file differs from the published copy. Do not install it. Download the selected version again from the official website.';
  } catch {
    result.textContent = 'Verification could not be completed. Open the official HTTPS page in a supported browser and try again.';
  } finally { verify.disabled = false; selectedFile.disabled = false; release.disabled = false; }
});
