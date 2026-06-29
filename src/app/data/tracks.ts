export interface Track {
  src: string;
  name: string;
  artist?: string;
}

export const BUILTIN_TRACKS: Track[] = [
  { src: "/music/song1.mp3", name: "SONG 01" },
  { src: "/music/song2.mp3", name: "SONG 02" },
];
