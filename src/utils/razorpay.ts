export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // 1. Check if Razorpay is already attached to window
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }

    // 2. Check if the script tag already exists in the DOM (prevent duplicates)
    const src = "https://checkout.razorpay.com/v1/checkout.js";
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      // If script exists but Razorpay isn't ready, attach listeners to it
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    // 3. Load the script afresh
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error("Razorpay SDK failed to load. Check your network connection.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
