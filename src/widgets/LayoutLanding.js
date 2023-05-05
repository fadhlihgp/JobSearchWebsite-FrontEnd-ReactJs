import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutLanding = (props) => {
    return (
        <>
            <Navigation />
            <div className='container mx-auto px-10'>
                {props.children}
            </div>
            <Footer />
        </>
    )
}
export default LayoutLanding;
