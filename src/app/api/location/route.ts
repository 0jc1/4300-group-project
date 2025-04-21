// src/app/api/location/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

//An async GET function for the location file
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const key = process.env.GOOGLE_MAPS_API_KEY

  //Make sure we have the latitude, longitude, and the API key.
  if (!lat || !lng || !key) {
    console.log("Missing lat/lng/key:", { lat, lng, key })
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  //Let's make the Google Geocoding URL.
  const geoRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
  )

  //Let's parse the JSON from Google directly.
  const geoData = await geoRes.json()
  console.log("Geocode response:", geoData)

  //If Google has a response, get the first address.
  if (geoData.status === "OK" && geoData.results?.length) {
    return NextResponse.json({ address: geoData.results[0].formatted_address })
  }

  //An error otherwise.
  return NextResponse.json(
    { error: geoData.error_message || "The Geocoding has failed." },
    { status: 502 }
  )
}
