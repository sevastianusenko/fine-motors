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
    "img": mainImage.asset->url + "?w=640&q=80",
  }
`;
