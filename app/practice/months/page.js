import OptionSelect from "@/components/OptionSelect"
import { MONTHS } from "@/utils/dates"

const WeekdaysPage = () => {
    return <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
        <OptionSelect data={MONTHS} />
    </div>
}

export default WeekdaysPage