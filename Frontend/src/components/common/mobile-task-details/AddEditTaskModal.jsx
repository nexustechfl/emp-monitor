import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/common/elements/CustomSelect";
import { useTaskStore } from "@/page/protected/admin/mobile-task-details/taskStore";

export default function AddEditTaskModal() {
    const open = useTaskStore((s) => s.taskModalOpen);
    const task = useTaskStore((s) => s.editingTask);
    const projects = useTaskStore((s) => s.projects);
    const folders = useTaskStore((s) => s.folders);
    const employees = useTaskStore((s) => s.employees);
    const fetchFolders = useTaskStore((s) => s.fetchFolders);
    const createAction = useTaskStore((s) => s.createTask);
    const updateAction = useTaskStore((s) => s.updateTask);
    const setModal = (v) => useTaskStore.setState({ taskModalOpen: v });

    const isEdit = !!task;

    const [form, setForm] = useState({ title: "", project: "", folder: "", employee: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open && task) {
            setForm({ title: task.title || "", project: task.project_id || "", folder: task.folder_id || "", employee: "" });
            if (task.project_id) fetchFolders(task.project_id);
        } else if (open) {
            setForm({ title: "", project: "", folder: "", employee: "" });
        }
    }, [open, task]);

    const handleProjectChange = useCallback((v) => {
        setForm((p) => ({ ...p, project: v, folder: "" }));
        fetchFolders(v);
    }, [fetchFolders]);

    const handleSubmit = useCallback(async () => {
        if (!form.title || !form.project || !form.folder) return;
        setSaving(true);
        if (isEdit) {
            await updateAction({ taskId: task._id, title: form.title, projectId: form.project, folderId: form.folder });
        } else {
            await createAction({ title: form.title, projectId: form.project, folderId: form.folder, employeeId: form.employee || undefined });
        }
        setSaving(false);
    }, [form, isEdit, task, createAction, updateAction]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-2xl">
                    <h3 className="text-white font-semibold">{isEdit ? "Edit Task" : "Add Task"}</h3>
                    <button onClick={() => setModal(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title *</label>
                        <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Task title" className="h-9 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Project *</label>
                        <CustomSelect placeholder="Select Project" items={projects} selected={form.project} onChange={handleProjectChange} width="full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Folder *</label>
                        <CustomSelect placeholder="Select Folder" items={folders} selected={form.folder} onChange={(v) => setForm((p) => ({ ...p, folder: v }))} width="full" />
                    </div>
                    {!isEdit && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
                            <CustomSelect placeholder="Select Employee" items={[{ value: "", label: "None" }, ...employees]} selected={form.employee} onChange={(v) => setForm((p) => ({ ...p, employee: v }))} width="full" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                    <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit} disabled={saving}>
                        {saving ? "Saving..." : isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
