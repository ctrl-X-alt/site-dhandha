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
  console.log('[INFO] Executing pre-flight architectural environment analysis...');
  
  // 1. Verify access tokens to isolate unauthorized execution API exploitation
  const token = getToken();
  if (!token) {
    console.error('[ERROR] Access Denied: Execute "npx site-dhandha login" before building pages.');
    process.exit(1);
  }

  // 2. Extract hardware device signature and design tokens locally
  const hardwareFingerprint = getDeviceFingerprint();
  const designTokens = parseLocalTailwindTokens();

  console.log('\n--- LANDING PAGE CONVERSION PROFILE INTERACTION ---');

  // 3. Structural Conditional Question Flow Implementation (Real-world Classifications)
  const schemaAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vertical',
      message: 'Select target project core industry vertical:',
      choices: [
        { name: 'SaaS, Digital Products & B2B Enterprise Platforms', value: 'tech_b2b' },
        { name: 'E-commerce & Local Retail Brands (Bakery, D2C Products, Gifts)', value: 'ecommerce_retail' },
        { name: 'Service-Based Businesses & Agencies (Consulting, Freelancing, Rentals)', value: 'services_agency' }
      ]
    },
    // BRANCH A: Asked ONLY for Tech, SaaS, and B2B Platforms
    {
      type: 'list',
      name: 'conversionGoal',
      message: 'Define explicit conversion endpoint execution logic for this page module:',
      choices: [
        { name: 'Drive Free Trial Signups / Product Account Creation', value: 'free_trial' },
        { name: 'Capture High-Intent Demo Requests / Book a Sales Call', value: 'book_demo' },
        { name: 'Lead Magnet Download (Capture emails via value hooks like Playbooks/Ebooks)', value: 'lead_magnet' }
      ],
      when: (answers) => answers.vertical === 'tech_b2b'
    },
    // BRANCH B: Asked ONLY for E-commerce & Retail
    {
      type: 'list',
      name: 'conversionGoal',
      message: 'Define explicit conversion endpoint execution logic for this page module:',
      choices: [
        { name: 'Direct Product Purchase (Maximize conversion rate on a key item)', value: 'direct_purchase' },
        { name: 'Maximize Average Order Value (AOV) via Irresistible Bundle Offers', value: 'bundle_sales' }
      ],
      when: (answers) => answers.vertical === 'ecommerce_retail'
    },
    // BRANCH C: Asked ONLY for Services & Agencies
    {
      type: 'list',
      name: 'conversionGoal',
      message: 'Define explicit conversion endpoint execution logic for this page module:',
      choices: [
        { name: 'High-Ticket Strategy Consultations or Free Discovery Audits', value: 'high_ticket_consult' },
        { name: 'Instant Quote Requests / Inbound Customer Inquiries', value: 'instant_quote' }
      ],
      when: (answers) => answers.vertical === 'services_agency'
    },
    {
      type: 'input',
      name: 'campaignNiche',
      message: 'Specify structural campaign focus theme context (e.g., Node.js Devs, Vegan Cakes):',
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
      message: 'Itemize strict transactional asset parameters (e.g., $49/mo Basic, 1 Premium Cake):',
      validate: (input) => (input.trim() ? true : 'Composition item strings are required to build layout pricing matrices.')
    }
  ]);

  console.log('\n[INFO] Connecting to secure AI compiler gateway...');
  
  // Assemble the network payload safely
  const structuredPayload = {
    userIntent: schemaAnswers,
    designConstraints: designTokens?.colors || {}
  };

  try {
    // 4. Fire network request to your private backend production server
    const endpointTarget = CONFIG_CONSTANTS.PRODUCTION_SERVER_API_ENDPOINTS;

    const response = await axios.post(`${endpointTarget}/generate`, structuredPayload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Device-Fingerprint': hardwareFingerprint,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.status === 'success') {
      console.log('[INFO] Server compilation cleared. Extracting raw code vectors...');
      
      const codebaseSlices = response.data.payload.components;
      const targetBaseDir = process.cwd();

      // Define internal structural target paths matching developer standards
      const componentsDir = path.join(targetBaseDir, 'components', 'cro-landing');
      const safeFolderName = schemaAnswers.campaignNiche.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const pageRouteDir = path.join(targetBaseDir, 'app', safeFolderName);

      // Ensure directory branches are cleanly built recursively
      fs.mkdirSync(componentsDir, { recursive: true });
      fs.mkdirSync(pageRouteDir, { recursive: true });

      // 5. Physically write component files down to disk storage sectors
      console.log('[INFO] Injecting type-safe TSX layouts into disk blocks...');
      fs.writeFileSync(path.join(componentsDir, 'HeroSection.tsx'), codebaseSlices.HeroSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'FeaturesSection.tsx'), codebaseSlices.FeaturesSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'PricingSection.tsx'), codebaseSlices.PricingSection, 'utf-8');
      fs.writeFileSync(path.join(componentsDir, 'LeadCaptureSection.tsx'), codebaseSlices.LeadCaptureSection, 'utf-8');
      fs.writeFileSync(path.join(pageRouteDir, 'page.tsx'), codebaseSlices.MainPageEntry, 'utf-8');

      // 6. Local Tooling Enforcement: Auto-run Prettier to clean code layouts cleanly
      console.log('[INFO] Executing local code formatting routines...');
      try {
        execSync(`npx prettier --write "${componentsDir}/*.tsx" "${pageRouteDir}/page.tsx"`, { stdio: 'ignore' });
        console.log('[SUCCESS] Local files successfully formatted.');
      } catch (prettierErr) {
        console.log('[WARN] Automatic code formatting skipped. (Prettier not found globally).');
      }

      console.log(`\n[SUCCESS] Landing page successfully created inside your codebase!`);
      console.log(`          Preview Route: /${safeFolderName}\n`);
    } else {
      console.error('[ERROR] Server responded with an unrecognized transaction state.');
    }
  } catch (error) {
    if (error.response) {
      console.error(`\n[ERROR] Pipeline Blocked: ${error.response.data.error || 'Server error.'}\n`);
    } else {
      console.error('\n[ERROR] Network Error: Unable to establish connection with backend gateway.\n');
    }
    process.exit(1);
  }
}