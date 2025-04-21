// src/app/api/places/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//An async GET function for the places file
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input") || "";
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!input || !key) return NextResponse.json({ predictions: [] });

  //Let's make the Google Places Autocomplete URL.
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
  );

  url.searchParams.set("input", input); //The user's input.
  url.searchParams.set("key", key); //The Google API key.
  url.searchParams.set("components", "country:us"); //Limit the user's addresses to the US.
  url.searchParams.set("location", "33.9519,-83.3763"); //Let's set it around Athens.
  url.searchParams.set("radius", "5000");  //Bias the radius around Athens.
  url.searchParams.set("strictbounds", "true");  //Enfore the radius strictly.
  url.searchParams.set("types", "geocode");

  //Get Google's API and then parse the JSON addresses.
  const r = await fetch(url.toString());
  const data = await r.json();
  return NextResponse.json({ predictions: data.predictions || [] });
}
