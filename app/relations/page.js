import { RELATIONS } from "@/utils/relations"
import OptionSelect from "@/components/OptionSelect"

const RelationsPage = () => {
    return <div className="flex flex-col items-center h-full w-full overflow-y-auto p-8 bg-background">
        <OptionSelect data={RELATIONS} />
    </div>
}

export default RelationsPage