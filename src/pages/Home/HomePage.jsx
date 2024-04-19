import SearchBar from "../../Components/NavBar/SearchBar/SearchBar"
import "./homePage.scss"

function HomePage(){
    return(
        <div className="hero-section">
            <div className="left-hero-section">
                <div className="text-wrapper">
                <h1>Find Real Estate & Get Your Dream Place</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis veniam pariatur praesentium error natus temporibus deserunt eaque explicabo aspernatur quod obcaecati incidunt impedit voluptate sunt, tenetur dolorum fugit aut tempora!</p>
                </div>
                <SearchBar/>
                <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <span>Years of Experience</span>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <span>Awards Gained</span>
                    </div>
                    <div className="box">
                        <h1>1200+</h1>
                        <span>Property Ready</span>
                    </div>
                </div>
            </div>
            <div className="right-hero-section">
                <img src="/bg.png" alt="bg-image"></img>
            </div>
        </div>
    )
}

export default HomePage