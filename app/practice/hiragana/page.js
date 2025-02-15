import Test from "@/components/Test";
import { HIRAGANA_GRID } from "@/utils/kana";

const HiraganaPage = () => {
  return (
    <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
      <Test characterGrid={HIRAGANA_GRID} />
    </div>
  );
}

export default HiraganaPage;