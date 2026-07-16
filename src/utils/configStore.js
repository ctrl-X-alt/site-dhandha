/**
 * @fileoverview Manages synchronous filesystem reads and writes to store the JWT.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const SYSTEM_CONFIG_DIRECTORY = path.join(os.homedir(), '.config', 'site-dhandha');
const SYSTEM_AUTH_FILE_PATH = path.join(SYSTEM_CONFIG_DIRECTORY, 'auth.json');

/**
 * Persists backend JWT configurations into hidden root file sectors.
 * @param {string} token - Explicit encryption authentication payload string.
 */
export function saveToken(token) {
  try {
    if (!fs.existsSync(SYSTEM_CONFIG_DIRECTORY)) {
      fs.mkdirSync(SYSTEM_CONFIG_DIRECTORY, { recursive: true });
    }
    
    const configurationStatePayload = { token, synchronizedAt: new Date().toISOString() };
    fs.writeFileSync(SYSTEM_AUTH_FILE_PATH, JSON.stringify(configurationStatePayload, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Disk writing interrupt on file generation state sync: ${error.message}`);
  }
}

/**
 * Extracts validated execution token items safely.
 * @returns {string|null} String authorization reference or null.
 */
export function getToken() {
  try {
    if (!fs.existsSync(SYSTEM_AUTH_FILE_PATH)) {
      return null;
    }
    
    const contextContent = fs.readFileSync(SYSTEM_AUTH_FILE_PATH, 'utf-8');
    const parsedDataState = JSON.parse(contextContent);
    return parsedDataState.token || null;
  } catch (error) {
    return null;
  }
}

/**
 * Wipes authentication data clean on the local disk layer.
 */
export function clearToken() {
  try {
    if (fs.existsSync(SYSTEM_AUTH_FILE_PATH)) {
      fs.unlinkSync(SYSTEM_AUTH_FILE_PATH);
    }
  } catch (error) {
    // Fail silently if configuration is already clean
  }
}
