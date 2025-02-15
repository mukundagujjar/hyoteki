import Test from "@/components/Test";
import { KATAKANA_GRID } from "@/utils/kana";

const KatakanaPage = () => {
    return (
        <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
            <Test characterGrid={KATAKANA_GRID} />
        </div>
    );
}

export default KatakanaPage;