import { VideoSettings } from "@/types";

export const PRICING = {
  // STRATEGY: "The Entry Fee"
  // We charge 5 credits per file automatically. This covers your "overhead"
  // and makes batching lucrative for you.
  BASE_COST_PER_FILE: 5,

  // STRATEGY: "Micro-Pricing"
  // We calculate per second (0.1 credits/sec), but using float precision
  // allows us to charge for exact microseconds effectively.
  COST_PER_SECOND: 0.1,

  // STRATEGY: "Segmented Pricing"
  FORMAT_MULTIPLIERS: {
    mp4: 1.0,   // Standard (Anchor)
    gif: 3.5,   // PREMIUM: Heavy compute, high viral value. 3.5x markup.
    mp3: 0.4,   // DISCOUNT: Low compute, attracts budget users.
  } as Record<string, number>,

  // STRATEGY: "The Luxury Tax"
  RESOLUTION_MULTIPLIERS: {
    original: 1.0,
    "720p": 0.9,  // "Saver" tier (psychological win for user)
    "1080p": 1.5, // Standard Pro
    "4k": 5.0,    // LUXURY: 4x pixels but 5x price. High margin.
  } as Record<string, number>,

  // STRATEGY: "Quality Premium"
  QUALITY_MULTIPLIERS: {
    low: 0.8,     // Fast/Cheap
    medium: 1.0,  // Standard
    high: 2.0,    // Users wanting "Best" are less price sensitive.
  } as Record<string, number>,

  // STRATEGY: "Branding Tax"
  // Watermarks imply business usage. Businesses pay more.
  WATERMARK_MULTIPLIERS: {
    none: 1.0,
    text: 1.2,   // +20% for simple text
    image: 1.5,  // +50% for logo overlay (High Value)
  } as Record<string, number>,

  AUDIO_DISCOUNT: 0.95, // Small discount to make user feel efficient
};

export const calculateCreditCost = (
  totalDurationSeconds: number,
  fileCount: number,
  settings: VideoSettings
): number => {
  if (fileCount === 0) return 0;

  // 1. Calculate Base Usage Cost
  let usageCost = totalDurationSeconds * PRICING.COST_PER_SECOND;

  // 2. Apply Format Multiplier
  const formatMult = PRICING.FORMAT_MULTIPLIERS[settings.format] || 1;
  usageCost *= formatMult;

  // 3. Apply Resolution & Quality (Skip for MP3)
  if (settings.format !== 'mp3') {
    const resMult = PRICING.RESOLUTION_MULTIPLIERS[settings.resolution] || 1;
    const qualMult = PRICING.QUALITY_MULTIPLIERS[settings.quality] || 1;
    usageCost *= (resMult * qualMult);
  }

  // 4. Apply Watermark Premium (The "Business" Tax)
  if (settings.format !== 'mp3') {
    const wmType = settings.watermarkType || 'none';
    const wmMult = PRICING.WATERMARK_MULTIPLIERS[wmType] || 1;
    usageCost *= wmMult;
  }

  // 5. Apply Audio Discount
  if (settings.removeAudio && settings.format !== 'mp3') {
    usageCost *= PRICING.AUDIO_DISCOUNT;
  }

  // 6. Add Fixed Overhead (Lucrative for Builder)
  // 5 credits * 10 files = 50 credits guaranteed, regardless of duration.
  const totalBaseFee = fileCount * PRICING.BASE_COST_PER_FILE;

  const total = totalBaseFee + usageCost;

  // Round up to nearest whole credit (Always capture the fraction)
  return Math.ceil(total);
};
