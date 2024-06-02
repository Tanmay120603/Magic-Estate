import "./contact.scss"

function Contact(){

    function handleSubmit(e){
        e.preventDefault()
    }
    
    return (
    <div className="contact-container">
    <div className="left-section-contact">    
    <form className="feedback-form" onSubmit={handleSubmit}>      
        <input name="name" type="text" className="feedback-input" placeholder="Name" />   
        <input name="email" type="text" className="feedback-input" placeholder="Email" />
        <textarea name="text" className="feedback-input" placeholder="Comment"></textarea>
        <input type="submit" value="SUBMIT"/>
    </form>
    </div>
    <div className="right-section-contact">
        <h1>Contact Us</h1>
    </div>
    </div>
    )
}

export default Contact