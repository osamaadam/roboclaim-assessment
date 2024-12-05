import { Insights } from "@/types/insights.type";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function InsightsTable({ insights }: { insights: Insights[] }) {
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Mimetype</TableCell>
          <TableCell>Total Count</TableCell>
          <TableCell>Failed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {insights.map((insight) => (
          <TableRow key={insight.mimetype}>
            <TableCell>{insight.mimetype}</TableCell>
            <TableCell>{insight.count}</TableCell>
            <TableCell>{insight.failed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
