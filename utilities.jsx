/* 
    Copyright (c) 2023, Andrew Harsono
    All rights reserved
*/

const root = ReactDOM.createRoot(document.querySelector('#root'));
const pw = "430d8276051405c7d2fa3f4e8a361a6d8937f4e6c61c5ebeee1664b755891334";
// import { slide as Menu } from './react-burger-menu.js';

/* 
    Obviously don't store or handle authentication on the front end, but for the purposes of this site this is sufficient. 
    Since this is a SPA and all of the functionality is handled client-side, defense and security is paper thin. 
    A savvy user can easily bypass any restrictions and authentications in this environment.
    Preferably, all authentication would go through a request to a server.

    I trust that you're a trustworthy person and not malicious in any way :)
*/

/* This is the main component that will route and update states */
class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            radial: 0,
            authFail: false
        }
    }

    updateAuthFailState = (state) => {
        this.setState({authFail: state});
    }

    // SubtleCrypto
    handleAuth = async (input) => {
        var textAsBuffer = new TextEncoder().encode(input);
        var hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
        var hashArray = Array.from(new Uint8Array(hashBuffer))
        var digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (digest === pw) {
            var radialGradientInterval = setInterval(() => {
                this.setState({radial: this.state.radial+6});
                if (this.state.radial >= 100) {
                    clearInterval(radialGradientInterval);
                }
            }, 1);

            setTimeout(() => {
                this.setState({authenticated: true})
            }, 500);
        }
        else {
            this.updateAuthFailState(true);
        }
    }

    render() {
        if (this.state.authenticated) {
            return <Home />;
        }
        else {
            return <Prompt handleAuth={this.handleAuth} 
                            radial={this.state.radial} 
                            authFail={this.state.authFail} 
                            updateAuthFailState={this.updateAuthFailState} />;
        }
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">© {new Date().getFullYear()} Andrew Harsono</div>
        )
    }
}

class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
    }

    checkInput = (e) => {
        if (e == 'btn' || e.code == 'Enter') {
            this.props.handleAuth(this.state.inputVal);
        }
    }

    handleInput = (e) => {
        this.props.updateAuthFailState(false);
        this.setState({inputVal: e.target.value});
    }

    render() {
        var showError = " hidden";
        var errorAnim = ""
        if (this.props.authFail) {
            showError = "";
            errorAnim = "shake";
        }

        return (
            <div className="wrapper">
                <div className="prompt" style={{background: "radial-gradient(circle at 50% 30%, #2b2b2b, #2b2b2b " + this.props.radial + "%, rgba(0,0,0,0) 0%)"}}>
                    <div className="row" style={{marginTop: "10%"}}>
                        <h1>Darlene & Sandeep</h1>
                    </div>
                    <div className="row input-field" >
                        <div className="row" style={{height: "3em"}}>
                            <span className={showError} style={{color: "#ff451a", fontSize: "2em", fontFamily: "Spectral"}} >
                                <svg xmlns="http://www.w3.org/2000/svg" style={{height: "0.7em", marginRight: "0.3em", fill:"#ff451a"}}  xmlSpace="preserve" viewBox="0 0 460.8 460.8"><path d="M285 230 456 59c6-6 6-16 0-22L424 5a16 16 0 0 0-22 0L230 176 59 5a16 16 0 0 0-22 0L5 37c-7 6-7 16 0 22l171 171L5 402c-6 6-6 15 0 21l32 33a16 16 0 0 0 22 0l171-171 172 171a16 16 0 0 0 21 0l33-33c6-6 6-15 0-21L285 230z"/></svg>
                                Incorrect password
                            </span>
                        </div>
                        <input className={errorAnim} onChange={(e) => this.handleInput(e)} onKeyPress={(e) => this.checkInput(e)} placeholder="password"></input>
                    </div>
                    <div className="row" style={{marginTop: "2em"}}>
                        <button onClick={() => this.checkInput('btn')}>enter</button>
                    </div>
                </div>
            </div>
        );
    }
}

class SwirlLeft extends React.Component {
    render() {
        return <svg className="swirl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 94" width="140" height="24"><path fillRule="evenodd" d="M144 15c-15 3-23 15-20 30v6l-20 10c-37 17-75 13-85-9C5 23 63 6 78 35l2 4 2-1 2-1v-2C70 2 8 12 12 46c3 34 44 48 92 32l17-7 10-5 4 4c17 16 50 19 85 7l7-2 3 1c20 7 45-6 46-25v-4l3-2c36-21 74-25 95-11 24 16-4 49-30 36l-4-2-2 1c-2 3-2 3 2 5 18 11 47-2 49-22 2-24-34-42-73-36-14 2-24 5-38 12l-9 4-2-1c-18-17-52-21-83-11-7 2-7 3-8 2-9-6-22-9-32-7m21 7 5 2 1 1-10 5-25 14c-7 4-7 4-7-2 1-16 19-26 36-20m76 5 17 5c6 3 6 3-1 7-14 8-27 16-33 18l-6 3-13-13a79 79 0 0 1-13-14c9-5 35-9 49-6m-42 22 14 14c-5 4-35 10-48 8-12-1-28-7-26-9l46-27 14 14m71 5c-3 11-14 18-28 18-9 0-9 0-2-4a909 909 0 0 0 31-17l-1 3"/></svg>
    }
}

class SwirlRight extends React.Component {
    render() {
        return <svg className="swirl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 94" width="140" height="24"><path fillRule="evenodd" d="M241 15c-4 0-13 4-17 7-1 1-1 0-8-2-31-10-65-6-83 11l-2 1-9-4c-14-7-24-10-38-12-39-6-75 12-73 36 2 20 31 33 49 22 4-2 4-2 2-5l-2-1-4 2c-20 10-46-9-38-27 9-19 47-23 80-9l23 11 3 2v4c1 19 26 32 46 25l3-1 7 2c35 12 68 9 85-7l4-4 10 5c43 22 91 17 105-10 9-19 3-36-16-43-21-8-44-1-52 17v2l2 1 2 1 2-4c13-24 61-18 61 9 0 25-37 35-76 22l-31-15v-6c4-20-12-34-35-30m11 6c11 3 18 11 19 21 0 6 0 6-7 2l-26-14-9-5 2-1 9-4 12 1m-64 6 19 5 2 1-14 14-13 13-6-3c-6-2-19-10-33-18-7-4-7-4-1-7 11-6 30-8 46-5m33 12c10 5 37 20 40 23 2 2-14 8-26 9-13 2-43-4-48-8l28-28 6 4m-73 22 14 8c5 3 4 3-4 3-15 0-27-8-29-20v-2l4 2 15 9"/></svg>
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        }

        this.menuRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", (e) => this.closeMenu(e));
    }

    closeMenu(e) {
        if (this.menuRef && !this.menuRef.current.contains(e.target)) {
            this.setState({showMenu: false});
        }
    }

    openMenu() {
        this.setState({showMenu: !this.state.showMenu});
    }

    menuHandler(page) {
        this.setState({showMenu: false});
        this.props.pageTurnHandler(page);
    }

    render() {;

        var navClass = "-full";
        let mobile = false;
        if (window.innerWidth < 1000) {
            mobile = true;
            navClass = "-collapsed";
            if (this.state.showMenu) {
                navClass += ' active';
            }
        }

        return (
            <div className="header">
                <audio id="audioplayer" ref="audio_player" src="media/LizOnTopOfTheWorld.mp3" style={{float: "left"}} controls autoPlay />
                <div style={{display: mobile ? 'initial' : 'none', float: "right", marginRight: "2em", marginTop: "0.7em", padding: "3px 6px"}}
                    onClick={() => this.openMenu()}>
                    <svg
                        height={36}
                        width={36}
                        viewBox="0 0 32 32"
                        style={{
                            enableBackground: "new 0 0 32 32",
                        }}
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path fill="#FFCDB2" d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z" />
                    </svg>
                </div>
                <div className={"menu" + navClass} ref={this.menuRef}>
                    <div key="pageturn-travel" className="nav-page menu-item" onClick={() => this.menuHandler('travel')}>When & Where</div>
                    <div key="pageturn-details" className="nav-page menu-item" onClick={() => this.menuHandler('details')}>Details</div>
                    <div key="pageturn-gift" className="nav-page menu-item" onClick={() => this.menuHandler('gift')}>Gift</div>
                    <div key="pageturn-accom" className="nav-page menu-item" onClick={() => this.menuHandler('accomodation')}>Accomodations</div>
                    <div key="pageturn-rsvp" className="nav-page menu-item solid" onClick={() => this.menuHandler('rsvp')}>RSVP</div>
                </div>
                <div className="header-title">D & S</div>
                <div className="burger-icon"></div>
            </div>
        )
    };
}

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var audio = document.getElementById('audioplayer');
        audio.volume = 0.3;
    }

    pageTurn(page) {
        // this.setState({view: page})
        if (page == 'rsvp') {
            window.open('https://darlenesandeepwedding.anrsvp.com/#home', '_blank');
        }
        else {
            document.getElementById(page).scrollIntoView({behavior: 'smooth'});
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="home-transition"></div>
                <Header pageTurnHandler={this.pageTurn}/>
                <Body />
                <Footer />
            </div>
        );
    }
}

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <Landing />
                <Travel />
                <Details />
                <ImgSection img="media/darlenesandeeplandscape2.jpg" />
                <Gift />
                <ImgSection img="media/darlenesandeep-hands.jpg" />
                <Accomodation />
            </div>
        )
        
    }
}

class Landing extends React.Component {
    render() {
        var imgsrc = "media/darlenesandeeplandscape-reduced.jpg";
        var imgtextClass = " desktop";
        if (window.innerWidth < 1000) {
            imgsrc = "media/darlenesandeeplandscape-cropped.jpg";
            imgtextClass = " mobile";
        }
        return (
            <div>
                <img src={imgsrc} style={{marginTop: "4em", width: window.innerWidth, height: (window.innerHeight - 64), objectFit: "cover"}}></img>
                <div className={"imgtext" + imgtextClass}>
                    <h1>
                        Darlene & Sandeep
                    </h1>
                    <h3 style={{marginTop: "-2em", fontSize: "3em"}}>
                        ARE GETTING MARRIED
                    </h3>
                </div>
            </div>
        )
    }
}

class Travel extends React.Component {
    
    render() {

        let mobile = false;
        if (window.innerWidth < 1000) {
            mobile = true;
        }

        return (
            <div>
                <div id="travel" style={{marginTop: "-8em", position: "absolute"}}></div>
                <div className="save-the-date-wrapper">
                    <div className="save-the-date-outer">
                        <div className="save-the-date-inner">
                            <h2>
                                Darlene <br /> & <br />Sandeep
                            </h2>
                            <br />
                            <h3 style={{whiteSpace: "nowrap"}}>
                                <SwirlLeft /> Save the Date <SwirlRight />
                            </h3>
                            <br />
                            <p style={{fontWeight: "600", fontSize: "2.5em"}}>
                                8.8.2023
                            </p>
                            <p>
                                Thornbury Castle <br />
                                Bristol, UK
                            </p>
                            <p style={{margin: "2em 0em 2em 0em"}}>
                                Be a part of our fairy tale
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{display: mobile ? 'block' : "flex"}}>
                    <img src="media/ThornburyCastle.gif" style={{width: mobile ? "100vw" : "50vw", objectFit: "cover"}} alt="Quick clips of Thornbury Castle, a Tudor castle first constructed in the 1500s." />
                    <iframe className="googlemaps-embed" 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.503709183141!2d-2.5323502825561524!3d51.6139815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487195789c7b6ecd%3A0x21cd6d9762f197dd!2sThornbury%20Castle%20Hotel%20%26%20Restaurant!5e0!3m2!1sen!2sus!4v1668207026806!5m2!1sen!2sus" 
                        width={ mobile ? "100vw" : "50vw"}
                        height={ mobile ? "30vh" : "auto"} 
                        style={{border: "0px", width:  mobile ? "100vw" : "50vw", height: mobile ? "30vh" : "auto"}}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        );
    }
}

class Details extends React.Component {
    render() {
        let mobile = false;
        let br = '';
        if (window.innerWidth < 1000) {
            mobile = true;
            br = <br />;
        }

        return (
            <div id="details" className="section" style={{display: mobile ? 'block' : 'flex', backgroundColor: "#FDF8F3"}}>
                <div style={{float: "left", width: mobile ? '100%' : '40%', textAlign: "center"}}>
                    <h2 style={{marginTop: "15%", textAlign: "-webkit-center"}}>
                        <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginBottom: ".5em"}}></div>
                        Wedding Details
                        <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginTop: ".5em"}}></div>
                    </h2>
                    <p>Please wear appropriate formal attire.</p>
                </div>
                <div style={{float: "right", width: mobile ? '100%' : '40%', paddingRight: mobile ? '0em' : '4em', textAlign: mobile ? 'center' : 'left'}}>
                    <h3>Schedule</h3>
                    <h4><span className="highlight -english_lavender">3:30PM</span>{br} Ceremony - Castle Lounge</h4>
                    <p>Please join us at the lounge at Thornbury Castle for our wedding ceremony.</p>
                    <h4><span className="highlight -english_lavender">4:30PM</span>{br} Canapés and Lawn Games - Lawn</h4>
                    <p>Following the Ceremony, we welcome you to partake in refreshments and lawn games such as archery and croquet.</p>
                    <h4><span className="highlight -english_lavender">6:00PM</span>{br} Dinner Reception - Baron’s Sitting Room</h4>
                    <p>We will have a formal three course dinner and wedding cake. Ending the night with golden hour photos, treats, activities, and traditional games as played in Tudor England. </p>
                </div>
            </div>
        )
    }
}
class Accomodation extends React.Component {
    
    booking(dir) {
        if (dir == 'swan') {
            window.open('https://www.swanthornbury.co.uk', '_blank');
        }
        else if (dir == 'lodge') {
            window.open('https://thornburygc.co.uk/thornbury-lodge/', '_blank');
        }
        else if (dir == 'alveston') {
            window.open('https://www.premierinn.com/gb/en/hotels/england/bristol/bristol/bristol-alveston.html', '_blank');
        }
    }

    render() {
        
        let marginP = '25%';

        if (window.innerWidth < 1000) {
            marginP = '5%';
        }

        return (
            <div id="accomodation" className="section" style={{backgroundColor: "#FFCDB2", textAlign: "center"}}>
                <div style={{marginLeft: marginP, marginRight: marginP}}>
                    <h2 style={{textAlign: "-webkit-center"}}>
                        <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginBottom: ".5em"}}></div>
                        Accomodations
                        <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginTop: ".5em"}}></div>
                    </h2>
                    <p>The following are locations near the wedding venue. There are numberous other options available in Bristol City.</p>
                    <h3 className="-old_lavender"  style={{marginTop: "2em"}}>Thornbury Castle</h3>
                    <p>If you’d like a 10% discount at Thornbury Castle,<span style={{fontWeight: "600"}}> please contact our Wedding Coordinator, Paige Daniel-Locke (Direct Line: 01454 506191, Email: events@thornburycastle.co.uk) </span>
                        and mention our wedding day and the rooms you’d like to book. You cannot receive a 10% discount through online booking.</p>
                    <h3 className="-old_lavender" style={{marginTop: "2em"}}>The Swan Thornbury</h3>
                    <p>A quaint English Bed and Breakfast which is ~10 mins walk from Thornbury Castle. </p>
                    <button onClick={() => this.booking('swan')}>Book</button>
                    <h3 className="-old_lavender" style={{marginTop: "2em"}}>Thornbury Lodge</h3>
                    <p>A unique accommodation with an eventful history dating back to the mid 1500’s. Around 5 mins drive from Thornbury Castle and 30 mins by walking.</p>
                    <button onClick={() => this.booking('lodge')}>Book</button>
                    <h3 className="-old_lavender" style={{marginTop: "2em"}}>Premier Inn Bristol (Alveston) hotel </h3>
                    <p>A standard motel. Also around 5 mins drive away to Thornbury Castle.</p>
                    <button onClick={() => this.booking('alveston')}>Book</button>
                </div>
            </div>
        );
    }
}

class Gift extends React.Component {
    
    render() {

        let marginP = '25%';

        if (window.innerWidth < 1000) {
            marginP = '5%';
        }

        return (
            <div id="gift" className="section" style={{textAlign: "center", marginLeft: marginP, marginRight: marginP}}>
                <h2 style={{textAlign: "-webkit-center"}}>
                    <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginBottom: ".5em"}}></div>
                    Wedding Gifts
                    <div style={{backgroundColor: "#E5989B", width: "4em", height: "3px", marginTop: ".5em"}}></div>
                </h2>
                <p>We are grateful to have accumulated many things that we need. Please do not feel pressured to bring a present all the way to the UK!</p>
                <p>If you would like to celebrate us, we welcome you to partake in a Chinese tradition of gifting newlyweds a <a href="https://www.thoughtco.com/chinese-new-year-red-envelope-687537" target="_blank">red envelope</a> (红包 - angpao) of lucky money to bless and bring prosperity to our married life. 
                </p>
            </div>
        );
    }
}

class ImgSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src={this.props.img} style={{height: "50vh", width: "100vw", objectFit: "cover"}}></img>
            </div>
        )
    }
}
root.render(<Router />);
