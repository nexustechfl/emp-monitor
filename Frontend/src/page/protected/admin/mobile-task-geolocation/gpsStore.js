import { create } from "zustand";
import { getGpsEmployees, getGeoLog, getTaskTime } from "../mobile-task-details/service";

export const useGpsStore = create((set, get) => ({
    employees: [],
    geoLog: [],
    taskTime: null,
    selectedEmployee: "",
    selectedDate: new Date().toISOString().split("T")[0],
    statusFilter: "all",
    loading: false,
    mapLoading: false,
    error: null,

    setSelectedEmployee: (v) => set({ selectedEmployee: v }),
    setSelectedDate: (v) => set({ selectedDate: v }),

    setStatusFilter: (v) => {
        set({ statusFilter: v });
        get().fetchEmployees();
    },

    fetchEmployees: async () => {
        set({ loading: true });
        const filter = get().statusFilter;
        const data = await getGpsEmployees(filter === "all" ? "" : filter);
        set({
            employees: data.map((e) => ({
                value: String(e.id), label: `${e.first_name || ""} ${e.last_name || ""}`.trim(),
            })),
            loading: false,
        });
    },

    fetchGpsData: async () => {
        const { selectedEmployee, selectedDate } = get();
        if (!selectedEmployee) { set({ error: "Select an employee" }); return; }
        set({ mapLoading: true, error: null });
        const [geoLog, taskTime] = await Promise.all([
            getGeoLog({ employeeId: selectedEmployee, start_date: selectedDate, end_date: selectedDate }),
            getTaskTime({ employeeId: selectedEmployee, start_date: selectedDate, end_date: selectedDate }),
        ]);
        set({ geoLog, taskTime, mapLoading: false });
    },
}));
