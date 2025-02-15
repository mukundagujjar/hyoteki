import OptionSelect from "@/components/OptionSelect"
import { WEEKDAYS } from "@/utils/dates"

const WeekdaysPage = () => {
    return <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
        <OptionSelect data={WEEKDAYS} />
    </div>
}

export default WeekdaysPage