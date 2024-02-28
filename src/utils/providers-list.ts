import { ANIME, MANGA } from '../providers';

/**
 * List of providers
 *
 * add new providers here (order does not matter)
 */
export const PROVIDERS_LIST = {
  ANIME: [
    new ANIME.AnimeUnity(),
    new ANIME.Anify(),
    new ANIME.Gogoanime(),
    new ANIME.Zoro(),
  ],
  MANGA: [
    new MANGA.MangaDex(),
    new MANGA.MangaHere(),
    new MANGA.MangaKakalot(),
    new MANGA.Mangapark(),
    new MANGA.MangaPill(),
    new MANGA.MangaReader(),
    new MANGA.Mangasee123(),
    new MANGA.ComicK(),
    new MANGA.FlameScans(),
    new MANGA.MangaHost(),
    new MANGA.BRMangas(),
  ],
};
