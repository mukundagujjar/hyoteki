import PracticeCard from "@/components/PracticeCard";

const PracticeModes = [
  {
    title: "Hiragana",
    live: true,
    href: "/practice/hiragana"
  },
  {
    title: "Katakana",
    live: true,
    href: "/practice/katakana"
  },
  {
    title: "Relations",
    live: true,
    href: "/practice/relations"
  },
  {
    title: "Weekdays",
    live: true,
    href: "/practice/weekdays"
  },
  {
    title: "Months",
    live: true,
    href: "/practice/months"
  },
  {
    title: "Relative Time",
    live: true,
    href: "/practice/relative-time"
  },
  {
    title: "Kanji",
    live: false,
    href: "/practice/kanji"
  },
  {
    title: "Numbers",
    live: false,
    href: "/practice/numbers"
  },
]

const PracticePage = () => {

  return (
    // Main Root Page
    <div className="flex flex-col items-center h-dvh w-full overflow-hidden">

      {/* Navigation to practice section */}
      <div className="flex flex-col items-center gap-8 w-full h-full overflow-hidden">
        <p className=" text-3xl md:text-6xl font-black text-center mt-8">What would you like to practice?</p>
        <div className="w-full p-8 h-full overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              PracticeModes.map((mode) => (
                <PracticeCard key={mode.title} title={mode.title} live={mode.live} href={mode.href} />
              ))
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex flex-col items-center justify-center w-full text-xl font-extralight">
        <p>Built by ムクンダ</p>
      </div> */}

    </div>
  );
};

export default PracticePage;
