import { RELATIONS } from "@/utils/relations"
import OptionSelect from "@/components/OptionSelect"

const RelationsPage = () => {
    return <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
        <OptionSelect data={RELATIONS} />
    </div>
}

export default RelationsPage