import OptionSelect from "@/components/OptionSelect"
import { MONTHS } from "@/utils/dates"

const WeekdaysPage = () => {
    return <div className="flex flex-col items-center h-full w-full overflow-y-auto p-8 bg-background">
        <OptionSelect data={MONTHS} />
    </div>
}

export default WeekdaysPage