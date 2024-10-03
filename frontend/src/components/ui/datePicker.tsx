import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, date, onDateChange, ...props }, ref) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

    React.useEffect(() => {
      setSelectedDate(date);
    }, [date]);

    const handleDateSelect = (newDate: Date | undefined) => {
      setSelectedDate(newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              !selectedDate && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = "DatePicker"

export { DatePicker }