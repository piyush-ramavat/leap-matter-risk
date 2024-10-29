import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { PromptResponse } from "../lib/types";
import { useCallback, useRef } from "react";
import { Box, Button } from "@mui/material";
import { ColDef } from "ag-grid-community";

type Props = {
  response: PromptResponse;
};

export function ResultList({ response }: Props) {
  const viewData = response.results.map((result) => {
    return { result: `**${result.title}**:  ${result.description}` };
  });

  const columns: ColDef[] = [];
  if (response.results.length > 0) {
    columns.push({
      field: "result",
      editable: true,
      cellStyle: { whiteSpace: "normal", lineHeight: "1.5" },
      autoHeight: true,
      flex: 1,
    });
  }

  const gridRef = useRef(null);

  const downloadCsv = useCallback(() => {
    (gridRef.current! as any).api.exportDataAsCsv();
  }, []);

  const deleteSelected = useCallback(() => {
    const sel = (gridRef.current! as any).api.getSelectedRows();
    (gridRef.current! as any).api.applyTransaction({ remove: sel });
  }, []);

  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Button onClick={downloadCsv} variant="contained" color="primary">
        Download CSV
      </Button>
      <Button
        sx={{ ml: 1 }}
        onClick={deleteSelected}
        variant="contained"
        color="primary"
      >
        Delete Selected
      </Button>

      <Box sx={{ mt: 2, width: "100%" }}>
        <div
          className="w-full bg-black/60 mt-2 p-2 rounded-lg ag-theme-quartz"
          style={{ width: "100%", height: "800px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={viewData}
            columnDefs={columns as any}
            autoSizeStrategy={{ type: "fitGridWidth" }}
            suppressExcelExport={true}
            singleClickEdit={true}
            headerHeight={0}
            rowSelection={{ mode: "multiRow" }}
          />
        </div>
      </Box>
    </Box>
  );
}
