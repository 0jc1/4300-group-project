// src/app/api/location/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// An async GET function for reverse geocoding based on lat/lng
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const key = process.env.GOOGLE_MAPS_API_KEY;

  // Ensure latitude, longitude, and Google Maps API key are all provided
  if (!lat || !lng || !key) {
    console.log("Missing lat/lng/key:", { lat, lng, key });
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Construct the Google Geocoding API request URL
  const geoRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
  );

  // Parse the JSON response from the Google API
  const geoData = await geoRes.json();
  console.log("Geocode response:", geoData);

  // If the API returns a successful response with results, return the first address
  if (geoData.status === "OK" && geoData.results?.length) {
    return NextResponse.json({ address: geoData.results[0].formatted_address });
  }

  // Otherwise, return an error with the message from Google or a fallback
  return NextResponse.json(
    { error: geoData.error_message || "The Geocoding has failed." },
    { status: 502 }
  );
}
