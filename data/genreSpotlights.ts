const genrePools = {
  "Sci-Fi": [
    { title: "Arrival", rating: "94%", blurb: "A mind-bending first contact story." },
    { title: "Ex Machina", rating: "92%", blurb: "An intimate AI thriller with a twist." },
    { title: "Dune", rating: "83%", blurb: "Epic space opera with award-winning visuals." }
  ],
  Action: [
    { title: "Mad Max: Fury Road", rating: "97%", blurb: "High-octane, post-apocalyptic mayhem." },
    { title: "John Wick: Chapter 4", rating: "94%", blurb: "A ballet of bullets and style." },
    { title: "Top Gun: Maverick", rating: "96%", blurb: "A soaring return to the danger zone." }
  ],
  Thriller: [
    { title: "Gone Girl", rating: "88%", blurb: "Twisty, stylish, and utterly gripping." },
    { title: "Parasite", rating: "99%", blurb: "Sharp social satire turned nerve-wracking thriller." },
    { title: "Prisoners", rating: "81%", blurb: "Tense suburban mystery with powerhouse performances." }
  ],
  Animation: [
    { title: "Spider-Verse", rating: "96%", blurb: "Ground-breaking animation with heart." },
    { title: "Coco", rating: "97%", blurb: "A heartfelt celebration of family and memory." },
    { title: "Your Name", rating: "98%", blurb: "A gorgeous, time-twisting romance." }
  ]
};

export type GenreHighlight = {
  genre: string;
  title: string;
  rating: string;
  blurb: string;
};

export function getGenreSpotlights(): GenreHighlight[] {
  return Object.entries(genrePools).map(([genre, pool]) => {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return { genre, ...pick };
  });
}

