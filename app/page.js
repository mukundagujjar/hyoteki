import PracticeCard from "@/components/PracticeCard";

const PracticeModes = [
  {
    title: "Hiragana",
    live: true,
    href: "/hiragana"
  },
  {
    title: "Katakana",
    live: true,
    href: "/katakana"
  },
  {
    title: "Relations",
    live: true,
    href: "/relations"
  },
  {
    title: "Weekdays",
    live: true,
    href: "/weekdays"
  },
  {
    title: "Months",
    live: true,
    href: "/months"
  },
  {
    title: "Relative Time",
    live: true,
    href: "/relative-time"
  },
  {
    title: "Kanji",
    live: false,
    href: "/kanji"
  },
  {
    title: "Numbers",
    live: false,
    href: "/numbers"
  },
]

const RootPage = () => {

  return (
    // Main Root Page
    <div className="flex flex-col p-8 items-center h-dvh w-full overflow-y-auto">

      {/* Navigation to practice section */}
      <div className="flex flex-col items-center gap-10 w-full md:w-[80%]">
        <p className=" text-4xl md:text-6xl font-black text-center">What would you like to practice?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-40">
          {
            PracticeModes.map((mode) => (
              <PracticeCard key={mode.title} title={mode.title} live={mode.live} href={mode.href} />
            ))
          }
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex flex-col items-center justify-center w-full text-xl font-extralight">
        <p>Built by ムクンダ</p>
      </div> */}

    </div>
  );
};

export default RootPage;
