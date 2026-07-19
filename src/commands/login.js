export async function handleCliLogin() {
  console.log('[INFO] Executing platform hardware diagnostics...');
  
  const hardwareFingerprint = getDeviceFingerprint();
  const currentToken = getToken();

  // 1. CRITICAL ROOT CURE: Comment out or delete this block so the login command 
  // never returns early on old, stale local tokens.
  /*
  if (currentToken) {
    console.log('[SUCCESS] Environment remains verified and active. Ready to trigger compiler pipelines.');
    return;
  }
  */

  console.log('[INFO] Contacting authorization gateway engine to secure authentication paths...');
  
  try {
    // 2. FIX: Point the CLI terminal handshake requests directly to the production Render endpoint
    const baseUri = `${CONFIG_CONSTANTS.PRODUCTION_SERVER_API_ENDPOINTS}/v1`;
    
    // Trigger real long polling handshake channel context on backend gateway
    const sessionInitiationResponse = await axios.post(`${baseUri}/auth/session`, {
      deviceFingerprint
    });

    const { sessionId, expiresAt } = sessionInitiationResponse.data;
    const loginWebDashboardUrl = `${CONFIG_CONSTANTS.PRODUCTION_SERVER_API_ENDPOINTS}/cli-auth?sessionId=${sessionId}&fp=${hardwareFingerprint}`;

    console.log('\n=====================================================');
    console.log(' ACTION REQUIRED: COMPLETE AUTHENTICATION IN BROWSER ');
    console.log('=====================================================');
    console.log(`\nOpen this link directly in your web workspace browser:\n\n  ${loginWebDashboardUrl}\n`);
    console.log('[INFO] Waiting for browser confirmation to link terminal locally...');

    // Polling loop logic tracking remote ledger authorization changes
    const pollingIntervalTimer = 5000;
    const executionCutoffTime = new Date(expiresAt).getTime();

    const loopRunner = setInterval(async () => {
      if (Date.now() > executionCutoffTime) {
        console.error('\n[ERROR] Handshake timeout threshold exceeded. Execute login sequence again.');
        clearInterval(loopRunner);
        process.exit(1);
      }

      try {
        // 3. FIX: Ensure status checks query the live Render server rather than localhost
        const structuralStatusCheck = await axios.get(`${baseUri}/auth/check?sessionId=${sessionId}`);
        const { status, token } = structuralStatusCheck.data;

        if (status === 'APPROVED' && token) {
          saveToken(token);
          console.log('\n[SUCCESS] Cryptographic signature captured. Terminal session locked successfully!');
          clearInterval(loopRunner);
          process.exit(0);
        }
      } catch (pollError) {
        // Silently swallow polling anomalies until explicit server resolution metrics emit
      }
    }, pollingIntervalTimer);

  } catch (error) {
    console.error('[ERROR] Failed initiating remote security handshake layers:', error.message);
    process.exit(1);
  }
}