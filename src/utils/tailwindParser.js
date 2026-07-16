/**
 * @fileoverview Parses the developer's local filesystem to detect custom Tailwind themes.
 */

import fs from 'fs';
import path from 'path';

/**
 * Evaluates local config tokens to prevent generation code style mismatches.
 * @returns {Object} Normalized layout constraints parameters block.
 */
export function parseLocalTailwindTokens() {
  const targetedRootPath = process.cwd();
  const validManifestExtensions = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs'];
  
  let synchronizedFileReference = null;
  for (const templateManifest of validManifestExtensions) {
    const trackingResolvedPath = path.join(targetedRootPath, templateManifest);
    if (fs.existsSync(trackingResolvedPath)) {
      synchronizedFileReference = trackingResolvedPath;
      break;
    }
  }

  const structuralStandardFallbacks = {
    hasCustomConfig: false,
    colors: { primary: '#b45309', secondary: '#047857', darkBackground: '#1c1917', lightText: '#fafaf9' }
  };

  if (!synchronizedFileReference) return structuralStandardFallbacks;

  try {
    const rawConfigurationText = fs.readFileSync(synchronizedFileReference, 'utf-8');
    
    // Abstract token isolation layer tracking color segments
    const boundaryColorsBlockCapture = rawConfigurationText.match(/colors\s*:\s*\{([^}]+)\}/);
    if (!boundaryColorsBlockCapture) return { ...structuralStandardFallbacks, hasCustomConfig: true };

    const targetingCapturedSectionStrings = boundaryColorsBlockCapture[1];
    const structuralExtractedTokensMap = {};
    
    const captureValidRegexGroups = /['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*['"]([^'"]+)['"]/g;
    let standardIterationMatch;
    
    while ((standardIterationMatch = captureValidRegexGroups.exec(targetingCapturedSectionStrings)) !== null) {
      const [, colorKeyName, matchingHexValueString] = standardIterationMatch;
      if (['primary', 'secondary', 'accent', 'brand', 'dark', 'light'].includes(colorKeyName)) {
        structuralExtractedTokensMap[colorKeyName] = matchingHexValueString;
      }
    }

    return {
      hasCustomConfig: true,
      colors: Object.keys(structuralExtractedTokensMap).length > 0 ? structuralExtractedTokensMap : structuralStandardFallbacks.colors
    };
  } catch (error) {
    return structuralStandardFallbacks;
  }
}
