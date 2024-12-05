import { FileEntity } from "@/types/file_entity.type";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function FileDisplay({
  files,
  showContent,
  showPagination,
  page,
  pageSize,
  count,
  setPage,
  setPageSize,
  fetchFiles,
}: {
  files: FileEntity[];
  showContent?: boolean;
  showPagination?: boolean;
  page?: number;
  pageSize?: number;
  count?: number;
  setPage?: (page: number) => void;
  setPageSize?: (pageSize: number) => void;
  fetchFiles?: () => void;
}) {
  useEffect(() => {
    fetchFiles?.();
  }, [fetchFiles, page, pageSize]);

  return (
    <TableContainer component={Paper}>
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
              <TableCell>
                <Link href={`/files/${file.id}`}>{file.originalName}</Link>
              </TableCell>
              <TableCell>{file.mimetype}</TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
              {showContent && <TableCell>{file.content}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
        {showPagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={showContent ? 5 : 4}
                count={count ?? 0}
                rowsPerPage={pageSize ?? 10}
                page={page ?? 0}
                onPageChange={(_e, p) => {
                  setPage?.(p);
                }}
                onRowsPerPageChange={(e) =>
                  setPageSize?.(parseInt(e.target.value))
                }
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
