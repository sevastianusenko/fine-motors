import { groq } from "next-sanity";

// Last 4 for home page hero
export const FEATURED_QUERY = groq`
  *[_type == "vehicle" && status == "available"] | order(_createdAt desc) [0...4] {
    _id, make, model, year, price, miles, body, badge,
    "img": mainImage.asset->url,
  }
`;

// Full inventory list
export const VEHICLES_QUERY = groq`
  *[_type == "vehicle" && status == "available"] | order(_createdAt desc) {
    _id, make, model, year, price, miles, body, badge,
    "img": mainImage.asset->url,
  }
`;

// Single vehicle detail
export const VEHICLE_BY_ID_QUERY = groq`
  *[_type == "vehicle" && _id == $id][0] {
    _id, make, model, year, price, miles, body, badge, status,
    fuel, drivetrain, transmission, engine,
    exteriorColor, interiorColor, accidents, vin,
    description, features,
    "img": mainImage.asset->url,
    "gallery": gallery[].asset->url,
  }
`;

// More cars (for detail page bottom)
export const MORE_VEHICLES_QUERY = groq`
  *[_type == "vehicle" && status == "available" && _id != $id] | order(_createdAt desc) [0...4] {
    _id, make, model, year, price, miles, body, badge,
    "img": mainImage.asset->url,
  }
`;
