"use server";

import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

interface WaitlistEntry {
  firstName: string;
  lastName: string;
  email: string;
  ageRange: string;
  whySens: string;
  timestamp: string;
}

async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveWaitlist(entries: WaitlistEntry[]) {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
}

export async function submitWaitlist(formData: FormData) {
  const firstName = (formData.get("firstName") as string || "").toUpperCase();
  const lastName = (formData.get("lastName") as string || "").toUpperCase();
  const email = (formData.get("email") as string || "").toUpperCase();
  const ageRange = formData.get("ageRange") as string;
  const whySens = (formData.get("whySens") as string || "").toUpperCase();

  try {
    const waitlist = await getWaitlist();
    
    waitlist.push({
      firstName,
      lastName,
      email,
      ageRange,
      whySens,
      timestamp: new Date().toISOString(),
    });

    await saveWaitlist(waitlist);
    
    return { success: true };
  } catch (error) {
    console.error("Error saving to waitlist:", error);
    return { success: false, error: "Failed to join waitlist" };
  }
}
