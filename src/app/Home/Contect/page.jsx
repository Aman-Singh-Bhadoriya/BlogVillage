import ContactForm from "../components/ContectForm";
import ContectInfo from "../components/ContectInfo";

export default function Page() {
    return (
        <div className="lg:px-20 px-6 py-20 flex flex-col justify-center bg-gray-50 dark:bg-neutral-800">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Contect US
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Discover content organized by topics that interest you the most
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
                <ContactForm />
                <ContectInfo />
            </div>
        </div>
    )
}