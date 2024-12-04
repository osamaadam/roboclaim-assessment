export interface IFileProcessor {
  process(file: Express.Multer.File): Promise<string>;
}
