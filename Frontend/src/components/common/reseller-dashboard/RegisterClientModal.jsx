import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResellerStore } from "@/page/protected/admin/reseller-dashboard/resellerStore";

export default function RegisterClientModal() {
    const open = useResellerStore((s) => s.registerModalOpen);
    const setModal = useResellerStore((s) => s.setModal);
    const registerAction = useResellerStore((s) => s.registerClient);
    const licenses = useResellerStore((s) => s.licenses);
    const fetchLicenses = useResellerStore((s) => s.fetchLicenses);

    const [form, setForm] = useState({ firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "", licenses: "", expiryDate: "", note: "" });
    const [showPwd, setShowPwd] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setForm({ firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "", licenses: "", expiryDate: "", note: "" });
            setError("");
            fetchLicenses();
        }
    }, [open]);

    if (!open) return null;

    const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.username || !form.email || !form.password || !form.licenses) {
            setError("Please fill all required fields");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setSaving(true);
        await registerAction({
            first_name: form.firstName,
            last_name: form.lastName,
            username: form.username,
            email: form.email,
            password: form.password,
            expiry_date: form.expiryDate || undefined,
            timezone: "Asia/Kolkata",
            total_allowed_user_count: Number(form.licenses),
            notes: form.note || undefined,
        });
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-2xl">
                    <h3 className="text-white font-semibold">Add Client</h3>
                    <button onClick={() => setModal("registerModalOpen", false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                            <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="First Name" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                            <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Last Name" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Username *</label>
                            <Input value={form.username} onChange={(e) => set("username", e.target.value)} placeholder="Username" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Email" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                            <div className="relative">
                                <Input type={showPwd ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Password" className="h-9 text-sm pr-9" />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                            <Input type="password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="Confirm Password" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Licenses * <span className="text-slate-400 font-normal">(max {licenses.leftOverLicenses})</span></label>
                            <Input type="number" min={0} max={licenses.leftOverLicenses} value={form.licenses} onChange={(e) => set("licenses", e.target.value)} placeholder="Number of licenses" className="h-9 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
                            <Input type="date" value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)} min={new Date().toISOString().split("T")[0]} max={licenses.expiryDate || undefined} className="h-9 text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Note</label>
                        <textarea value={form.note} onChange={(e) => set("note", e.target.value)} rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                    <Button variant="outline" onClick={() => setModal("registerModalOpen", false)}>Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit} disabled={saving}>{saving ? "Adding..." : "Add Client"}</Button>
                </div>
            </div>
        </div>
    );
}
