export interface Track {
  src: string;
  name: string;
  artist?: string;
}

export const BUILTIN_TRACKS: Track[] = [
  { src: "/music/song1.mp3", name: "invertedvariable-anhedonia.mp3" },
  { src: "/music/song2.mp3", name: "myownsummer_shoveit-deftones-lofi-earthting-x-aliencakemusic.wav" },
  { src: "/music/song3.mp3", name: "untitled-track-03.mp3" },
  { src: "/music/song4.mp3", name: "untitled-track-04.mp3" },
];
