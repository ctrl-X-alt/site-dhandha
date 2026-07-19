/**
 * @fileoverview Stores static configurations and global API parameters for the engine.
 */

export const CONFIG_CONSTANTS = {
  API_VERSION_TARGET: 'v1',
  LOCAL_SERVER_API_ENDPOINTS: 'http://localhost:5000/v1',
  PRODUCTION_SERVER_API_ENDPOINTS: 'https://site-dhandha-back.onrender.com/v1', // Unified: Added version namespace
  PRODUCTION_WEB_ROOT: 'https://site-dhandha-back.onrender.com',               // Frontend routing directory 
  MAX_INPUT_STRING_THRESHOLD_LIMIT: 200
};

/**
 * Validates command line arguments arrays.
 * @param {Array<string>} userArgumentsArray - Process arguments slice indices array.
 * @returns {Array<string>} Cleansed process variables blocks.
 */
export const parseArguments = (userArgumentsArray) => {
  return userArgumentsArray.slice(2);
};