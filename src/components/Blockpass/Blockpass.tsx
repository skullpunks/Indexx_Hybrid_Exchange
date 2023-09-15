
import React from 'react';
import baseAPIURL, { decodeJWT } from '../../services/api';

class Blockpass extends React.Component<{}, any>{
    constructor(props: any) {
        super(props)

        this.state = {
            walletAddress: '',
            email: '',
            name: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadBlockpassWidget()
    }

    loadBlockpassWidget = () => {
        let access_token = String(localStorage.getItem("access_token"));
        let decoded: any = decodeJWT(access_token);
        const blockpass = new (window as any).BlockpassKYCConnect(
            'indexx_2c1c1', // service client_id from the admin console
            {
                refId: decoded.email, // assign the local user_id of the connected user
            }
        )

        blockpass.startKYCConnect()

        blockpass.on('KYCConnectSuccess', () => {
            //add code that will trigger when data have been sent.
        })
    }

    async handleSubmit(event: any) {
        event.preventDefault()
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: this.state.walletAddress,
                name: this.state.name,
                email: this.state.email
            })
        };

        fetch(baseAPIURL + `/address`, requestOptions)
            .then(response => response.json())
    }

    async StartKyc(props: any) {

    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button id="blockpass-kyc-connect">
                    Verify with Blockpass
                </button>
            </div>
        )
    }
}


export default Blockpass;