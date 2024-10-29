import '../Css/HomeStyle.css';
import yarnbasket from './yarnbasket.png';

function Home(){
return (
    <div className="home-container">
        <img className="home-img" src={yarnbasket} alt='yarn basket'/>
        <div className="home-text">Tekst</div>
    </div>
)
}

export default Home;