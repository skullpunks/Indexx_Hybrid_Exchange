// import phoneIcon from "../../assets/arts/phoneIcon.svg";
import locationIcon from "../../assets/arts/locationIcon.svg";
import emailIcon from "../../assets/arts/emailIcon.png";

const ContactUs = () => {
    return (
        <div className="help_content_page">
            <div className="nav_main_header border-b d-md-block d-none">
                <h1> Contact Us </h1>
            </div>

            <div className="nav_Section padding-t-2x">
                {/* <div className="d-flex phone_details">
                    <p><img src={phoneIcon} alt="Phone icon" /> 949-228-9079 </p>
                </div> */}
                <div className="d-flex location_details padding-t-2x">
                    <div className="padding-t-1x">
                        <img src={locationIcon} alt="Phone icon" width="15" height="22" />
                    </div>
                    <div className="address_datails padding-l-1x">
                        <div>   indexx Limited, CUB Financial Centre,</div>
                        <div> GF6, Lyford Cay, Nassau, Bahamas.</div>
                        <div className="apart_datails">
                            <div>550 Newport Center Drive</div>
                            <div> Newport Beach, </div>
                            <div>CA 92660 United State</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex phone_details">
                    <img src={emailIcon} style={{ marginTop: 6 }} alt="Email icon" width="20" height="20" />
                    <p className="contat_us" >
                        <a href="mailto:contact@indexx.ai">contact@indexx.ai</a><br />
                        <a href="mailto:acounts@indexx.ai "> acounts@indexx.ai </a><br />
                        <a href="mailto:support@indexx.ai">support@indexx.ai</a><br />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs