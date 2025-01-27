import Test from "@/components/Test";
import HIRAGANA_GRID from "@/utils/hiragana";

const HiraganaPage = () => {
  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-auto p-8 bg-background">
      <Test characterGrid={HIRAGANA_GRID} />
    </div>
  );
}

export default HiraganaPage;