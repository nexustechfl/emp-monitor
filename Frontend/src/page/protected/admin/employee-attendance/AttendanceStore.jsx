import { create } from "zustand";

import {
  getAttendance,
  getAttendanceLocations,
  getAttendanceDepartments,
  getShifts,
  exportAttendanceExcel,
} from "./service";

export const useAttendanceStore = create((set, get) => ({
  attendance: [],
  locations: [],
  departments: [],
  shifts: [],

  pageCount: 0,
  empCount: 0,

  loading: false,

  filters: {
    date: 202601,
    locationId: "all",
    departmentId: "all",
    shiftId: "all",
    search: "",
    sortColumn: "name",
    sortOrder: "D",
    skip: 0,
    limit: 10,
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        ...(key === "locationId" && {
          departmentId: "all",
          shiftId: "all",
        }),
        skip: key !== "skip" ? 0 : value,
      },
    })),

  loadAttendance: async () => {
    try {
      set({ loading: true });

      const [locationRes, attendanceRes, shiftRes] = await Promise.all([
        getAttendanceLocations(),
        getAttendance(get().filters),
        getShifts(),
      ]);

      set({
        locations: locationRes?.stats || [],
        attendance: attendanceRes?.stats || [],
        shifts: shiftRes?.stats || [],
        pageCount: attendanceRes?.pageCount || 0,
        empCount: attendanceRes?.empCount || 0,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchDepartments: async () => {
    try {
      const { filters } = get();

      const res = await getAttendanceDepartments({
        locationId: filters.locationId,
      });

      set({ departments: res.stats || [] });
    } catch (error) {
      set({ departments: [] });
    }
  },

  fetchShifts: async () => {
    try {
      const res = await getShifts();

      set({
        shifts: res?.stats || [],
      });
    } catch (error) {
      set({ shifts: [] });
    }
  },

  fetchAttendance: async () => {
    try {
      set({ loading: true });

      const { filters } = get();

      const params = { ...filters };

      if (params.date) {
        params.date = Number(params.date);
      } else {
        delete params.date;
      }

      if (!params.search) delete params.search;

      if (params.locationId === "all") delete params.locationId;
      else params.locationId = Number(params.locationId);

      if (params.departmentId === "all") delete params.departmentId;
      else params.departmentId = Number(params.departmentId);

      if (params.shiftId === "all") delete params.shiftId;
      else params.shiftId = Number(params.shiftId);

      const res = await getAttendance(params);

      set({
        attendance: res?.stats || [],
        pageCount: res?.pageCount || 0,
        empCount: res?.empCount || 0,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  exportAttendance: async () => {
    try {
      const { filters } = get();

      const params = {
        ...filters,
        date: Number(filters.date),
      };

      delete params.limit;
      delete params.skip;

      if (!params.search) delete params.search;

      if (params.locationId === "all") delete params.locationId;
      else params.locationId = Number(params.locationId);

      if (params.departmentId === "all") delete params.departmentId;
      else params.departmentId = Number(params.departmentId);

      if (params.shiftId === "all") delete params.shiftId;
      else params.shiftId = Number(params.shiftId);

      const res = await exportAttendanceExcel(params);

      return res;
    } catch (error) {
      return { success: false };
    }
  },
}));
