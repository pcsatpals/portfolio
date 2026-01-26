import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Check } from "lucide-react";

type SelectProps = {
    value: string[],
    onChange: (v: string[]) => void;
    placeholder: string;
    options: string[]
}
const SelectComponent = ({ value, onChange, placeholder, options }: SelectProps) => {

    const handleChange = (v: string) => {
        if (v) {
            const isIncluded = value?.includes(v);
            if (isIncluded) {
                const filteredValue = value?.filter(i => i != v)
                onChange(filteredValue)
            } else {
                onChange([...(value || []), v])
            }
        }
    }

    return (
        <Select value={value?.length > 0 ? "__dummy__" : undefined} onValueChange={handleChange} >
            <SelectTrigger className="w-full" >
                <SelectValue placeholder={placeholder}>
                    {value?.join(", ")}
                </SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
                {options.map((item, ix) => <SelectItem key={ix} value={item} className="flex min-w-full justify-between pr-4">
                    {item} {value?.includes(item) && <Check />}
                </SelectItem>)}
            </SelectContent>
        </Select>
    )
}

export default SelectComponent
