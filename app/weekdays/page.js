import OptionSelect from "@/components/OptionSelect"
import { WEEKDAYS } from "@/utils/dates"

const WeekdaysPage = () => {
    return <div className="flex flex-col items-center h-full w-full overflow-y-auto p-8 bg-background">
        <OptionSelect data={WEEKDAYS} />
    </div>
}

export default WeekdaysPage