// src/data/shows.js

const shows = [
  {
    id: 1,
    title: "Guys & Dolls",
    poster: "/images/GuysDollsPosterFinal.png",
    description:
      "A classic musical about love and gambling in New York City. Follow the lives of four gamblers and the women they love.",
    directorNote:
      "Directing 'Guys & Dolls' has been a dream come true. This production brings together talented individuals who are passionate about theater.",
    cast: [
      {
        role: "Sky Masterson",
        actor: "John Doe",
        photo: "/images/cast/john-doe.jpg",
        bio: "John brings charisma and charm to the role of Sky Masterson.",
      },
      {
        role: "Nathan Detroit",
        actor: "Jane Smith",
        photo: "/images/cast/jane-smith.jpg",
        bio: "Jane's portrayal of Nathan Detroit is both humorous and heartfelt.",
      },
      // Add more cast members here
    ],
    crew: [
      {
        role: "Director",
        name: "Emily Johnson",
        photo: "/images/crew/emily-johnson.jpg",
        bio: "Emily has been directing for over a decade, bringing stories to life on stage.",
      },
      {
        role: "Music Director",
        name: "Michael Brown",
        photo: "/images/crew/michael-brown.jpg",
        bio: "Michael ensures that every musical number is performed to perfection.",
      },
      // Add more crew members here
    ],
    songs: [
      "Luck Be a Lady",
      "Sit Down, You're Rockin' the Boat",
      "A Bushel and a Peck",
      // Add more songs here
    ],
    acknowledgements: [
      "Special thanks to the Siena College Theatre Department.",
      "Gratitude to all cast and crew members for their hard work.",
      // Add more acknowledgements here
    ],
    mediaGallery: [
      "/images/media/guys-and-dolls/rehearsal1.jpg",
      "/images/media/guys-and-dolls/rehearsal2.jpg",
      "/images/media/guys-and-dolls/performance1.jpg",
      "/images/media/guys-and-dolls/performance2.jpg",
      // Add more media links here
    ],
    // Future: Add more fields like KCACTF Information, etc.
  },
  // Add more shows here
];

export default shows;