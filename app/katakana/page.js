import Test from "@/components/Test";
import KATAKANA_GRID from "@/utils/katakana";

const KatakanaPage = () => {
    return (
        <div className="flex flex-col items-center h-full w-full overflow-y-auto p-8 bg-background">
            <Test characterGrid={KATAKANA_GRID} />
        </div>
    );
}

export default KatakanaPage;