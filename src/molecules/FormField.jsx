import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FormField({ id, label, leftIcon, rightSlot, ...inputProps }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center text-slate-300">
                    {leftIcon}
                </div>
                <Input id={id} className="pl-10" {...inputProps} />
                {rightSlot && (
                    <div className="absolute inset-y-0 right-3 flex items-center text-slate-300">
                        {rightSlot}
                    </div>
                )}
            </div>
        </div>
    );
}
