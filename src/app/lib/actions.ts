"use server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface WaitlistEntry {
  firstName: string;
  lastName: string;
  email: string;
  ageRange: string;
  whySens: string;
  timestamp: string;
}

export async function submitWaitlist(formData: FormData) {
  const firstName = (formData.get("firstName") as string || "").toUpperCase();
  const lastName = (formData.get("lastName") as string || "").toUpperCase();
  const email = (formData.get("email") as string || "").toUpperCase();
  const ageRange = formData.get("ageRange") as string;
  const whySens = (formData.get("whySens") as string || "").toUpperCase();

  const entry: WaitlistEntry = {
    firstName,
    lastName,
    email,
    ageRange,
    whySens,
    timestamp: new Date().toISOString(),
  };

  try {
    // Store each entry with email as key (prevents duplicates)
    await redis.hset(`waitlist:${email}`, entry);
    
    // Also add to a list for easy retrieval of all entries
    await redis.lpush("waitlist:all", JSON.stringify(entry));
    
    return { success: true };
  } catch (error) {
    console.error("Error saving to waitlist:", error);
    return { success: false, error: "Failed to join waitlist" };
  }
}
