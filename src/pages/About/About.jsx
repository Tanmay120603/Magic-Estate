import "./about.scss"

function About(){
    return(
        <div className="about-container">
            <div className="right-container">
                <div className="wrapper">
                <h2>About Us</h2>
                <p>Welcome to MagicEstate Realty, your ultimate destination for all things real estate. Whether you're looking to buy your dream home, sell a property, or invest in the booming real estate market, HomeNest Realty is here to guide you every step of the way. Our platform is designed to simplify the real estate experience by providing comprehensive tools and resources to help you make informed decisions with confidence.</p>
                <h2>Our Mission</h2>
                <p>At  MagicEstate Realty, our mission is to revolutionize the real estate industry by leveraging technology, data, and expertise to offer an unparalleled customer experience. We strive to empower buyers, sellers, and investors with the knowledge and support they need to achieve their real estate goals efficiently and effectively.</p>
                <h2>Who We Are</h2>
                <p>HomeNest Realty was founded by a team of seasoned real estate professionals and tech enthusiasts who recognized the need for a more integrated and user-friendly real estate platform. Our team combines decades of experience in the real estate market with cutting-edge technology to deliver a seamless and transparent experience for our users.</p>
                </div>
            </div>
            <div className="left-container">
                <img src="/about-us.png" alt="about-us" />
            </div>
        </div>
    )
}

export default About