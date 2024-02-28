import { BaseProvider } from '.';

abstract class BaseParser extends BaseProvider {
  /**
   * Search for anime/manga using the given query
   *
   * returns a promise resolving to a data object
   */
  abstract search(query: string, ...args: any[]): Promise<unknown>;
}

export default BaseParser;
