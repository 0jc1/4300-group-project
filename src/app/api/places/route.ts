import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GET - Handles location autocomplete using Google Places API
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input") || "";
  const key = process.env.GOOGLE_MAPS_API_KEY;

  // Return an empty predictions array if input or API key is missing
  if (!input || !key) return NextResponse.json({ predictions: [] });

  // Construct Google Places Autocomplete API URL
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
  );

  url.searchParams.set("input", input); // User's input string
  url.searchParams.set("key", key); // Google Maps API key
  url.searchParams.set("components", "country:us"); // Restrict results to the US
  url.searchParams.set("location", "33.9519,-83.3763"); // Bias location to Athens, GA
  url.searchParams.set("radius", "5000"); // Search radius in meters
  url.searchParams.set("strictbounds", "true"); // Enforce strict bounds within the radius
  url.searchParams.set("types", "geocode"); // Focus results on geocoding-type predictions

  // Send request to Google and parse the JSON response
  const r = await fetch(url.toString());
  const data = await r.json();

  // Return only the predictions array
  return NextResponse.json({ predictions: data.predictions || [] });
}
