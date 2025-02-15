import OptionSelect from "@/components/OptionSelect"
import { RELATIVE_TIME } from "@/utils/relative_time"

const RelativeTimePage = () => {
    return <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
        <OptionSelect data={RELATIVE_TIME} />
    </div>
}

export default RelativeTimePage