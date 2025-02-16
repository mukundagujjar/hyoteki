import Navbar from "@/components/Navbar";
import Link from "next/link";

const AboutPage = () => {    
    return (
        <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
            <Navbar />
            <div className="flex flex-col p-8 justify-center md:text-lg">
                <p>Built by <Link target="_blank" prefetch href="https://linkedin.com/in/mukundagujjar" className="bg-[#1B263B] py-1 px-2 rounded-lg">Mukunda Gujjar <sup>&#129109;</sup></Link>, this platform aims to provide a simple but effective pathway to learning the Japanese language. Most of the features on this platform are free of cost, and will help you progress through the different levels of Japanese. The additional paid features are optional and can be used to boost your learning experience.</p>
                <br />
                <p>While this platform is not a complete solution to learning the language, it is a great way to start with the basics and gain foundational understanding. Japanese consists of a wide range of grammar, vocabulary, and expressions, and this platform will help you learn them through practice tests and lessons.</p>
                <br />
                <p>We recommend you start with the <Link target="_blank" prefetch className="bg-[#1B263B] py-1 px-2 rounded-lg" href="/learn">Learn <sup>&#129109;</sup></Link> section to get a solid foundation of the language. Once you are confident in your understanding, you can move on to the <Link target="_blank" prefetch className="bg-[#1B263B] py-1 px-2 rounded-lg" href="/practice">Practice <sup>&#129109;</sup></Link> section to test your knowledge and improve your skills.</p>
                <br />
                <p>This site is a work in progress and we are constantly working to improve the experience for our users. If you have any suggestions or feedback, please let us know via the <Link prefetch className="bg-[#1B263B] py-1 px-2 rounded-lg" href="/contact">Contact page <sup>&#129109;</sup></Link>.</p> 
                <br/>
                <p>We hope this platform helps you on your journey to learning Japanese in an effective and meaningful way :)</p>
            </div>
        </div>
    );
}

export default AboutPage;