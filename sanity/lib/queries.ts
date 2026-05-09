import { groq } from "next-sanity";

export const VEHICLES_QUERY = groq`
  *[_type == "vehicle" && status == "available"] | order(_createdAt desc) {
    _id,
    make,
    model,
    year,
    price,
    miles,
    body,
    badge,
    status,
    description,
    features,
    "img": mainImage.asset->url,
  }
`;

export const VEHICLE_BY_ID_QUERY = groq`
  *[_type == "vehicle" && _id == $id][0] {
    _id,
    make,
    model,
    year,
    price,
    miles,
    body,
    badge,
    status,
    description,
    features,
    "img": mainImage.asset->url,
    "gallery": gallery[].asset->url,
  }
`;

export const MORE_VEHICLES_QUERY = groq`
  *[_type == "vehicle" && status == "available" && _id != $id] | order(_createdAt desc) [0...4] {
    _id,
    make,
    model,
    year,
    price,
    miles,
    body,
    badge,
    "img": mainImage.asset->url,
  }
`;
