export type Photo = {
  id: string
  src: string
  alt: string
  date: string
  caption: string
  createdAt: Date
}

// This array contains information about all photos in the public/images folder
export const photos: Photo[] = [
  {
    id: "couple-beach-sunset",
    src: "/images/couple-beach-sunset.png",
    alt: "Couple at beach sunset",
    date: "June 15, 2023",
    caption: "Our beach day",
    createdAt: new Date("2023-06-15"),
  },
  {
    id: "candlelight-dinner",
    src: "/images/candlelight-dinner.png",
    alt: "Candlelight dinner",
    date: "February 14, 2023",
    caption: "Valentine's Day dinner",
    createdAt: new Date("2023-02-14"),
  },
  {
    id: "couple-mountain-hike",
    src: "/images/couple-mountain-hike.png",
    alt: "Couple hiking in mountains",
    date: "August 22, 2023",
    caption: "Mountain adventure",
    createdAt: new Date("2023-08-22"),
  },
  {
    id: "couple-dancing",
    src: "/images/couple-dancing.png",
    alt: "Couple dancing",
    date: "December 31, 2022",
    caption: "New Year's Eve dance",
    createdAt: new Date("2022-12-31"),
  },
  {
    id: "couple-picnic-park",
    src: "/images/couple-picnic-park.png",
    alt: "Couple having picnic in park",
    date: "April 10, 2023",
    caption: "Spring picnic",
    createdAt: new Date("2023-04-10"),
  },
  {
    id: "couple-cooking",
    src: "/images/couple-cooking.png",
    alt: "Couple cooking together",
    date: "May 5, 2023",
    caption: "Cooking class",
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "couple-sunset-beach",
    src: "/images/couple-sunset-beach.png",
    alt: "Couple watching sunset at beach",
    date: "July 20, 2023",
    caption: "Sunset memories",
    createdAt: new Date("2023-07-20"),
  },
  {
    id: "couple-first-date-anniversary",
    src: "/images/couple-first-date-anniversary.png",
    alt: "Couple celebrating first date anniversary",
    date: "March 12, 2023",
    caption: "First date anniversary",
    createdAt: new Date("2023-03-12"),
  },
]
