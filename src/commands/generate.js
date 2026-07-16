/**
 * @fileoverview Captures conversion parameters, executes network generation calls,
 * and physically writes compiled components to the developer's hard drive.
 * @license MIT
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import axios from 'axios';
import { parseLocalTailwindTokens } from '../utils/tailwindParser.js';
import { getToken } from '../utils/configStore.js';
import { getDeviceFingerprint } from '../utils/fingerprint.js';
import { CONFIG_CONSTANTS } from '../constants/config.js';

export async function handlePageGeneration() {
  console.log('[info] Executing pre-flight architectural environment analysis...');
  
  // 1. Verify access tokens to isolate unauthorized execution API exploitation
  const token = getToken();
  if (!token) {
    console.error('[error] Access Denied: Execute "npx site-dhandha login" before building pages.');
    process.exit(1);
  }

  // 2. Extract hardware device signature and design tokens locally
  const hardwareFingerprint = getDeviceFingerprint();
  const designTokens = parseLocalTailwindTokens();

  console.log('\n--- LANDING PAGE CONVERSION PROFILE INTERACTION ---');

  // 3. Structural Question Flow Implementation
  const schemaAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vertical',
      message: 'Select target project core industry vertical:',
      choices: [
        { name: 'SaaS / Digital Software Platform', value: 'saas' },
        { name: 'Local Brick & Mortar Retail (Bakery, Gifts, Products)', value: 'local_retail' },
        { name: 'Professional Services (Plumbing, Transport, Rentals)', value: 'services' },
        { name: 'B2B Enterprise / Corporate Consulting Hub', value: 'b2b' }
      ]
    },
    {
      type: 'list',
      name: 'conversionGoal',
      message: 'Define explicit conversion endpoint execution logic for this page module:',
      choices: (answers) => {
        if (answers.vertical === 'local_retail' || answers.vertical === 'services') {
          return [
            { name: 'Maximize Average Order Value (AOV) via Holiday Bundle Sales', value: 'bundle_sales' },
            { name: 'Drive High-Volume Direct Bookings and Immediate Customer Inbound Traffic', value: 'instant_booking' }
          ];
        }
        return [
          { name: 'Capture High-Intent Email Signups (Lead Generation Funnel Architecture)', value: 'lead_gen' },
          { name: 'Secure High-Ticket Strategy Consultations or Managed Accounts', value: 'high_ticket_consult' }
        ];
      }
    },
    {
      type: 'input',
      name: 'campaignNiche',
      message: 'Specify structural campaign focus theme context (max 200 characters):',
      validate: (input) => {
        const cleanInput = input.trim();
        if (!cleanInput) return 'Contextual identification definition is required.';
        if (cleanInput.length > CONFIG_CONSTANTS.MAX_INPUT_STRING_THRESHOLD_LIMIT) {
          return 'Input constraint exceeded to prevent payload injection attacks.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'coreOfferDetails',
      message: 'Itemize strict transactional asset parameters (e.g., 1 Premium Cake, 12 Biscuits):',
      validate: (input) => (input.trim() ? true : 'Composition item strings are required to build layout pricing matrices.')
    }
  ]);

  console.log('\n[info] Connecting to secure AI compiler gateway...');
  
  // Assemble the network payload
  const structuredPayload = {
    userIntent: schemaAnswers,
    designConstraints: designTokens.colors
  };

  try {
    // 4. Fire network request to your private backend production server
    // For local testing, change this to CONFIG_CONSTANTS.LOCAL_SERVER_API_ENDPOINTS
    const endpointTarget = CONFIG_CONSTANTS.PRODUCTION_SERVER_API_ENDPOINTS;

    const response = await axios.post(`${endpointTarget}/generate`, structuredPayload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Device-Fingerprint': hardwareFingerprint,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.status === 'success') {
      console.log('[info] Server compilation cleared. Extracting raw code vectors...');
      
      const codebaseSlices = response.data.payload.components;
      const targetBaseDir = process.cwd();

      // Define internal structural target paths matching developer standards
      const componentsDir = path.join(targetBaseDir, 'components', 'cro-landing');
      const pageRouteDir = path.join(targetBaseDir, 'app', schemaAnswers.campaignNiche.toLowerCase().replace(/[^a-z0-9]/g, '-'));

      // Ensure directory branches are cleanly built recursively
      fs.mkdirSync(componentsDir, { recursive: true });
      fs.mkdirSync(pageRouteDir, { recursive: true });

      // 5. Physically write component files down to disk storage sectors
      console.log('[info] Injecting type-safe TSX layouts into disk blocks...');
      fs.writeFileSync(path.join(componentsDir, 'HeroSection.tsx'), codebaseSlices.HeroSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'FeaturesSection.tsx'), codebaseSlices.FeaturesSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'PricingSection.tsx'), codebaseSlices.PricingSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'LeadCaptureSection.tsx'), codebaseSlices.LeadCaptureSection, 'utf-8');
      fs.writeFileSync(path.join(pageRouteDir, 'page.tsx'), codebaseSlices.MainPageEntry, 'utf-8');

      // 6. Local Tooling Enforcement: Auto-run Prettier to clean code layouts cleanly
      console.log('[info] Executing local code formatting routines...');
      try {
        execSync(`npx prettier --write "${componentsDir}/*.tsx" "${pageRouteDir}/page.tsx"`, { stdio: 'ignore' });
        console.log('[success] Local files successfully formatted.');
      } catch (prettierErr) {
        console.log('[warn] Automatic code formatting skipped. (Prettier not found globally).');
      }

      console.log(`\n[success] Landing page successfully created inside your codebase!`);
      console.log(`          👉 Preview Route: /${schemaAnswers.campaignNiche.toLowerCase().replace(/[^a-z0-9]/g, '-')}\n`);
    } else {
      console.error('[error] Server responded with an unrecognized transaction state.');
    }
  } catch (error) {
    if (error.response) {
      // Catch and print explicit anti-abuse messages passed from your middleware (e.g. 402 Credits Exhausted)
      console.error(`\n[error] Pipeline Blocked: ${error.response.data.error || 'Server error.'}\n`);
    } else {
      console.error('\n[error] Network Error: Unable to establish connection with backend gateway.\n');
    }
    process.exit(1);
  }
}
