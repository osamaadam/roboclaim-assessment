import { FileEntity } from "@/types/file_entity.type";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function FileDisplay({
  files,
  showContent,
}: {
  files: FileEntity[];
  showContent?: boolean;
}) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Mime Type</TableCell>
            <TableCell>Size (bytes)</TableCell>
            <TableCell>Uploaded At</TableCell>
            {showContent && <TableCell>Content</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>{file.originalName}</TableCell>
              <TableCell>{file.mimetype}</TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
              {showContent && <TableCell>{file.content}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
