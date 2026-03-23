import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const UniPass = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md !rounded-xl p-0 text-white">
        <DialogHeader className=" bg-gradient-to-r from-[#727DFB] to-[#4B4395] p-4 rounded-xl text-white">
          <h2 className="text-lg font-semibold ">Uninstall Password</h2>
        </DialogHeader>
         <div className="px-5 pb-4">
            <label className="text-sm text-gray-600">Password</label>
         <div className="relative  py-3">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="pr-10 text-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-gray-300 text-black/70"
          >
            Close
          </Button>

          <Button className="px-4 py-2 rounded-full bg-blue-600 text-white">
            Update
          </Button>
        </div>
        </div>   
        
      </DialogContent>
    </Dialog>
  );
};

export default UniPass;