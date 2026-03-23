import React from "react";
import EmpLiveRecordingLogo from "@/assets/live-monitoring/live_recording.svg";

function LiveHeader({ isConnected }) {
    return (
        <div className="flex relative flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="border-l-2 border-blue-500 pl-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-[22px] font-semibold text-slate-900">
                        Live Recording
                    </h1>
                    <span
                        className={`w-2 h-2 rounded-full mt-1 ${isConnected ? "bg-green-500" : "bg-slate-300"}`}
                        title={isConnected ? "Live" : "Disconnected"}
                    />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Real-time monitoring of connected agents
                </p>
            </div>

            <div className="absolute right-0 -top-4 hidden lg:flex items-end gap-1 mr-2">
                <img alt="realtime" className="w-40" src={EmpLiveRecordingLogo} />
            </div>
        </div>
    );
}

export default React.memo(LiveHeader);
