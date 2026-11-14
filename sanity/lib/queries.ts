import { groq } from "next-sanity";

// Last 4 for home page hero
export const FEATURED_QUERY = groq`
  *[_type == "vehicle" && (status == "available" || status == "pending")] | order(_createdAt desc) [0...4] {
    _id, _createdAt, "slug": slug.current, make, model, year, price, miles, body, badge, kbbValue, fuel, brandNew,
    "img": mainImage.asset->url,
  }
`;

// Hero collage — every car with a photo (available, pending AND sold: the wall is the whole lot's history)
export const HERO_TILES_QUERY = groq`
  *[_type == "vehicle" && defined(mainImage.asset) && (status == "available" || status == "pending" || status == "sold")] | order(_createdAt desc) [0...40] {
    _id, year, make, model,
    "img": mainImage.asset->url,
    "img2": gallery[0].asset->url,
  }
`;

// Full inventory list (available + sold, not deleted/draft)
export const VEHICLES_QUERY = groq`
  *[_type == "vehicle" && (status == "available" || status == "pending" || status == "sold")] | order(_createdAt desc) {
    _id, _createdAt, "slug": slug.current, make, model, year, price, miles, body, badge, status, kbbValue, fuel, brandNew,
    "img": mainImage.asset->url,
  }
`;

// Single vehicle detail — matches the readable slug or the legacy document id
export const VEHICLE_QUERY = groq`
  *[_type == "vehicle" && (slug.current == $key || _id == $key)][0] {
    _id, "slug": slug.current, make, model, year, price, miles, body, badge, status, kbbValue, brandNew,
    fuel, drivetrain, transmission, engine,
    exteriorColor, interiorColor, titleStatus, vin,
    ownersCount, keysCount, carfaxAvailable, serviceRecords, warrantyRemaining,
    description, features, customFeatures,
    "img": mainImage.asset->url,
    "gallery": gallery[].asset->url,
  }
`;

// More cars (for detail page bottom)
export const MORE_VEHICLES_QUERY = groq`
  *[_type == "vehicle" && status == "available" && !(_id == $key) && !(slug.current == $key)] | order(_createdAt desc) [0...4] {
    _id, "slug": slug.current, make, model, year, price, miles, body, badge, fuel, brandNew,
    "img": mainImage.asset->url,
  }
`;
