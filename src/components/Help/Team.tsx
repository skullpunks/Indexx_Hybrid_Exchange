
import profileIcon from "../../assets/arts/profileIcon.svg";

const Team = () => {
    // let memebrs = ["BZ", ""];
    return (
        <div className="help_content_page">
            <div className="nav_main_header border-b d-md-block d-none">
                <h1> Indexx Swap Team </h1>
            </div>

            <div className="nav_Section">
                <ul className='team_members_ul'>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Austin Reed</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Brian Zheng</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Frank Hettmann</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Jing Li</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Kamal Farooqi</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Lili</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Nick Fraser</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Omkar Sai</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Roselouren Roberts</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Sai Kumar </li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>  Tony Pelayo</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}> Willie Apelacio</li>
                </ul>
            </div>
        </div>
    )
}

export default Team