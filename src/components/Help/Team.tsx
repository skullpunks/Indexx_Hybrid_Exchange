
import profileIcon from "../../assets/arts/profileIcon.svg";

const Team = () => {
    // let memebrs = ["BZ", ""];
    return (
        <div className="help_content_page">
            <div className="nav_main_header border-b">
                <h1> Indexx Swap Team </h1>
            </div>

            <div className="nav_Section">
                <ul className='team_members_ul'>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>BZ</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Sai Kumar</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Omkar Sai</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Willie A</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Lili</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Austin</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>BZ</li>
                    <li style={{ backgroundImage: `url(${profileIcon})` }}>Roselouren</li>
                </ul>
            </div>
        </div>
    )
}

export default Team