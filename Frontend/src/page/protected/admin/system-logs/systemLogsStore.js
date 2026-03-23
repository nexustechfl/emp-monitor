import { createDlpStore } from "@/hooks/useDlpStore";
import { fetchLogs, fetchExport, exportCsv, exportPdf } from "./service";

export const useSystemLogsStore = createDlpStore({
    name: "System Logs",
    fetchLogs,
    fetchExport,
    exportCsv,
    exportPdf,
});
