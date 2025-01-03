export type FileEntity = {
  id: number;
  originalName: string;
  mimetype: string;
  size: number;
  content: string;
  createdAt: string;
};

export type FileEntityWithCount = {
  files: FileEntity[];
  count: number;
};
